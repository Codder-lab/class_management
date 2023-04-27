const mongoose = require("mongoose");
const User = require('../models/adminDB')

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/class_management")
.then(() => {
    console.log("mongodb connected");
})

.catch((error) => {
    console.log("Failed to connect", error);
})