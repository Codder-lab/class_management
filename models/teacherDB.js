const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    teachercode : {
        type: String,
    },
    fullname: {
        type: String,
    },
    subname: {
        type: String,
    },
    contact: {
        type: String,
    }
})

module.exports = mongoose.model("Teacher", TeacherSchema)