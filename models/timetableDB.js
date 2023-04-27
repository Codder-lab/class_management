const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
    batch: {
        type: String,
    },
    subname: {
        type: String,
    },
    teachercode: {
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

module.exports = mongoose.model("Timetable", TimetableSchema)