const Students = require('../model/studentModel');
const createStudent = async (req, res) => {
    try {

        const { name, email, mobile } = req.body;
        const resume = req.file ? req.file.buffer.toString('base64') : null;

        const student = await Students.create({ name, email, mobile, resume });
        res.status(200).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating student' });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Students.find({});

        res.status(200).json(students);
    } catch (error) {
        console.log(error);
    }
}
const getSingleStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Students.findById(studentId);
        res.status(200).json(student);
    } catch (error) {
        console.log(error);
    }
}
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { name, email, mobile } = req.body;

        // Check if a file is present in the request
        const resume = req.file ? req.file.buffer.toString('base64') : req.body.existingResume || null;

        // Update student record with form data
        const updatedStudent = await Students.findByIdAndUpdate(
            studentId,
            { name, email, mobile, resume },
            { new: true }
        );

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating student' });
    }
};


const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        await Students.findByIdAndDelete(studentId);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting student' });
    }
};
module.exports = { createStudent, getStudents, updateStudent, deleteStudent, getSingleStudent };
