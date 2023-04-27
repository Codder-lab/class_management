const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    username2: {
        type: String
    },
    password2: {
        type: String
    },
    studentid: {
        type: Number
    },
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    dob: {
        type: String
    },
    std: {
        type: Number
    },
    batch: {
        type: String
    },
    contact: {
        type: String
    }
})

module.exports = mongoose.model("Student", StudentSchema)