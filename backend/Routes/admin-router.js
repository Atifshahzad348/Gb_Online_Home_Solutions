const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controller")
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-milddleware")

router.route('/users').get(authMiddleware, adminMiddleware, adminControllers.getALlUsers );
router.route("users/:id").get(authMiddleware, adminMiddleware, adminControllers.getUserbyID);
router.route("user/update/:id").patch(authMiddleware, adminMiddleware, adminControllers.updateUserByID);
//deleting user route
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);
router.route("/contact").get(authMiddleware, adminMiddleware,  adminControllers.getAllContacts);
//deleting Message route
router.route("/contact/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteMessageById);
router.route("/callRequest").get(authMiddleware, adminMiddleware,  adminControllers.getAllCallRequest);
//deleting call requesr route
router.route("/callRequest/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteCallRequesById);
router.route("/clientorders").get(authMiddleware, adminMiddleware,  adminControllers.getAllClientOrders);
router.route("/clientorders/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteOrderById);
// ADD THESE NEW ROUTES FOR ORDER MANAGEMENT
router.route("/orders/:orderId").patch(authMiddleware, adminMiddleware, adminControllers.updateOrderStatusAndPrice);
router.route("/orders/:orderId").get(authMiddleware, adminMiddleware, adminControllers.getOrderById);

// professionals
router.route('/professionals').get(authMiddleware, adminMiddleware, adminControllers.getALlProfessionals );
router.route("users/:id").get(authMiddleware, adminMiddleware, adminControllers.getUserbyID);
router.route("user/update/:id").patch(authMiddleware, adminMiddleware, adminControllers.updateUserByID);
// delete professional by id
router.route("/professionals/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteProfessionalsById);
module.exports =  router;