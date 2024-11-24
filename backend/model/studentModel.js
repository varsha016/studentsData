const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    mobile: {
        type: String,
        // required: true
    },
    resume: {
        type: String,
        // required: false
    }

}, { timestamps: true })

module.exports = mongoose.model("student", studentSchema)