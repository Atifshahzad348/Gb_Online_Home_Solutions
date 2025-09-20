// const Order = require('../models/order-model');

// const orderControllers = {
//   // Get all orders with populated user and product data
//   getAllOrders: async (req, res) => {
//     try {
//       const orders = await Order.find()
//         .populate('user', 'name email contact')
//         .populate('products.product', 'name images sku category price')
//         .sort({ createdAt: -1 });
      
//       res.status(200).json(orders);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       res.status(500).json({ message: error.message });
//     }
//   },

//   // Get order by ID
//   getOrderById: async (req, res) => {
//     try {
//       const order = await Order.findById(req.params.id)
//         .populate('user', 'name email contact address')
//         .populate('products.product', 'name images sku category brand price');
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
      
//       res.status(200).json(order);
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       res.status(500).json({ message: error.message });
//     }
//   },

//   // Update order status
//   updateOrderStatus: async (req, res) => {
//     try {
//       const { status } = req.body;
//       const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         { status },
//         { new: true, runValidators: true }
//       ).populate('user', 'name email');
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
      
//       res.status(200).json(order);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       res.status(500).json({ message: error.message });
//     }
//   },

//   // Delete order
//   deleteOrder: async (req, res) => {
//     try {
//       const order = await Order.findByIdAndDelete(req.params.id);
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
      
//       res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       res.status(500).json({ message: error.message });
//     }
//   }
// };

// module.exports = orderControllers;



// const Order = require('../models/order-model');
// const Product = require('../models/product-model');

// const orderControllers = {
//   // Create a new order (for checkout)
//   createOrder: async (req, res) => {
//     try {
//       const { products, totalAmount, shippingAddress, paymentMethod } = req.body;
//       const userId = req.user._id;

//       // Verify all products exist
//       for (const item of products) {
//         const product = await Product.findById(item.product);
//         if (!product) {
//           return res.status(404).json({ message: `Product ${item.product} not found` });
//         }
//         if (product.stock < item.quantity) {
//           return res.status(400).json({ 
//             message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
//           });
//         }
//       }

//       // Create order with product details
//       const order = new Order({
//         user: userId,
//         products: products,
//         totalAmount,
//         shippingAddress,
//         paymentMethod,
//         paymentStatus: 'pending'
//       });

//       await order.save();

//       // Update product stock
//       for (const item of products) {
//         await Product.findByIdAndUpdate(
//           item.product,
//           { $inc: { stock: -item.quantity } }
//         );
//       }

//       // Populate user info for response
//       await order.populate('user', 'name email contact');

//       res.status(201).json({ 
//         message: 'Order created successfully', 
//         order: order
//       });
//     } catch (error) {
//       console.error('Order creation error:', error);
//       res.status(500).json({ message: 'Server error during order creation' });
//     }
//   },

//   // Get all orders with populated user and product data
//   getAllOrders: async (req, res) => {
//     try {
//       const orders = await Order.find()
//         .populate('user', 'name email contact')
//         .sort({ createdAt: -1 });
      
//       res.status(200).json(orders);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       res.status(500).json({ message: error.message });
//     }
//   },

//   // Get order by ID
//   getOrderById: async (req, res) => {
//     try {
//       const order = await Order.findById(req.params.id)
//         .populate('user', 'name email contact address');
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
      
//       res.status(200).json(order);
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       res.status(500).json({ message: error.message });
//     }
//   },

//   // Update order status
//   updateOrderStatus: async (req, res) => {
//     try {
//       const { status } = req.body;
//       const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         { status },
//         { new: true, runValidators: true }
//       ).populate('user', 'name email');
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
      
//       res.status(200).json(order);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       res.status(500).json({ message: error.message });
//     }
//   },

//   // Delete order
//   deleteOrder: async (req, res) => {
//     try {
//       const order = await Order.findByIdAndDelete(req.params.id);
      
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
      
//       res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       res.status(500).json({ message: error.message });
//     }
//   }
// };

// module.exports = orderControllers;

const Order = require('../models/order-model');
const Product = require('../models/product-model');

const orderControllers = {
  // Get all orders with populated user data
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('user', 'name email contact')
        .sort({ createdAt: -1 });
      
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('user', 'name email contact address');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).populate('user', 'name email');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.status(200).json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Delete order
  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = orderControllers;