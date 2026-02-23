const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const authenticate = require('../middleware/authMiddleware');

// Create new order
router.post('/create', authenticate, async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        // Get cart items
        const [cartItems] = await pool.query(`
            SELECT c.product_id, c.quantity, p.price, p.discount_price, p.stock, p.name
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        `, [req.userId]);

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty!'
            });
        }

        // Calculate total
        const totalAmount = cartItems.reduce((sum, item) => {
            const price = item.discount_price || item.price;
            return sum + (price * item.quantity);
        }, 0);

        // Start transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Create order
            const [orderResult] = await connection.query(
                'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
                [req.userId, totalAmount, JSON.stringify(shippingAddress)]
            );

            const orderId = orderResult.insertId;

            // Add order items and update stock
            for (const item of cartItems) {
                const price = item.discount_price || item.price;
                
                await connection.query(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.product_id, item.quantity, price]
                );

                // Update stock
                await connection.query(
                    'UPDATE products SET stock = stock - ? WHERE id = ?',
                    [item.quantity, item.product_id]
                );
            }

            // Clear cart
            await connection.query('DELETE FROM cart WHERE user_id = ?', [req.userId]);

            await connection.commit();
            connection.release();

            res.json({
                success: true,
                message: 'Order placed successfully!',
                orderId,
                totalAmount
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order!',
            error: error.message
        });
    }
});

// Get user's orders
router.get('/my-orders', authenticate, async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT o.id, o.total_amount, o.status, o.created_at,
                   COUNT(oi.id) as item_count
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `, [req.userId]);

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders!',
            error: error.message
        });
    }
});

module.exports = router;