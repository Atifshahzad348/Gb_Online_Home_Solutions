



// // test code

const Order = require("../models/book-order-model");

const orderForm = async (req, res) => {
    try {
        const response = req.body;
        
        // Add the user ID from the authenticated user to the order data
        const orderData = {
            ...response,
            user: req.userID // ADD THIS - get user ID from auth middleware
        };
        
        await Order.create(orderData);
        return res.status(200).json({msg: "Order booked successfully"});
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({msg: "Failed to book order"});
    }
}


// ------------------------------------
// order cancellation logic
// ___________________________________
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        
        // Find the order and verify ownership
        const order = await Order.findOne({ 
            _id: orderId, 
            user: req.userID 
        });

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                msg: "Order not found or you don't have permission to cancel this order" 
            });
        }

        // Check if order can be cancelled (e.g., not already completed or cancelled)
        if (order.status === 'completed') {
            return res.status(400).json({ 
                success: false, 
                msg: "Cannot cancel a completed order" 
            });
        }

        if (order.status === 'cancelled') {
            return res.status(400).json({ 
                success: false, 
                msg: "Order is already cancelled" 
            });
        }

        // Update order status to cancelled
        order.status = 'cancelled';
        await order.save();

        res.status(200).json({ 
            success: true, 
            msg: "Order cancelled successfully", 
            order: order 
        });

    } catch (error) {
        console.error("Order cancellation error:", error);
        res.status(500).json({ 
            success: false, 
            msg: "Server error while cancelling order" 
        });
    }
}

// delete order form user profile
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        
        // Find the order and verify ownership or admin rights
        const order = await Order.findOne({ 
            _id: orderId,
            // For user deletion: user: req.userID
            // For admin deletion: remove the user filter
        });

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                msg: "Order not found" 
            });
        }

        // Check if user has permission to delete (owner or admin)
        if (order.user.toString() !== req.userID.toString()) {
            return res.status(403).json({ 
                success: false, 
                msg: "Not authorized to delete this order" 
            });
        }

        // Prevent deletion of completed orders if needed
        if (order.status === 'completed') {
            return res.status(400).json({ 
                success: false, 
                msg: "Cannot delete completed orders" 
            });
        }

        // Delete the order
        await Order.findByIdAndDelete(orderId);

        res.status(200).json({ 
            success: true, 
            msg: "Order deleted successfully" 
        });

    } catch (error) {
        console.error("Order deletion error:", error);
        res.status(500).json({ 
            success: false, 
            msg: "Server error while deleting order" 
        });
    }
}

// Add to your exports
module.exports = { orderForm, cancelOrder, deleteOrder };





