require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const app = express();








const authRoute = require("./Routes/auth-routes");
const contactRoute = require("./Routes/contact-router");
const callRequestRoute = require("./Routes/callRequestForm-router");
const serviceRoute = require("./Routes/service-router");
const adminRoute = require("./Routes/admin-router");
const orderRoute = require("./Routes/order-router");
const uploadRoute = require("./Routes/upload-router");
const connectDb = require("./utils/db");

// lets tackle cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
 
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", authRoute)

app.use("/api/form", contactRoute)

app.use("/api/call", callRequestRoute )

app.use("/api/data", serviceRoute)

app.use("/api/order", orderRoute)

app.use("/api/uploads", uploadRoute);

// lets define admin route

app.use("/api/admin", adminRoute)


const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port: ${PORT}`);
    });
})


// test code
// routes/userRoutes.js
