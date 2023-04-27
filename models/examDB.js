const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
    batch: {
        type: String,
    },
    subname: {
        type: String,
    },
    date: {
        type: String,
    },
    fromtime: {
        type: String,
    },
    totime: {
        type: String,
    }
})

module.exports = mongoose.model("Exam", ExamSchema)