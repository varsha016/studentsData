const { createStudent, getStudents, deleteStudent, getSingleStudent, updateStudent } = require('../controller/studentController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const route = require('express').Router();
route.post('/students', upload.single('resume'), createStudent);
route.get('/getstudents', getStudents);
route.get('/getstudent/:id', getSingleStudent);
route.put('/updatestudent/:id', upload.single('resume'), updateStudent);
route.delete('/deletestudent/:id', deleteStudent);

module.exports = route;
