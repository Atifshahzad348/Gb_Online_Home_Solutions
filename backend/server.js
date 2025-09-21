

// test code
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); // Add this import

const authRoute = require("./Routes/auth-routes");
const contactRoute = require("./Routes/contact-router");
const callRequestRoute = require("./Routes/callRequestForm-router");
const adminRoute = require("./Routes/admin-router");
const orderRoute = require("./Routes/order-router");
const uploadRoute = require("./Routes/upload-router");
const userRoute = require("./Routes/user-router"); // ADD THIS LINE
const serviceRoute = require("./Routes/service-router"); // service router
const productRoute = require("./Routes/product-router");
const orderRoutes = require('./Routes/order-routes');


const connectDb = require("./utils/db");



// Import status monitoring
const { checkOnlineStatus } = require("./Middleware/status-middleware");

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/call", callRequestRoute);
app.use("/api/order", orderRoute);
app.use("/api/uploads", uploadRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute); // ADD THIS LINE
app.use("/api/services", serviceRoute); // add this line
app.use("/api/products", productRoute);
app.use('/api/order', orderRoutes);

// Start status monitoring
setInterval(checkOnlineStatus, 5 * 60 * 1000);

const PORT = 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
        console.log("User status monitoring is active");
        console.log("Upload directory: ", path.join(__dirname, 'uploads'));
    });
});