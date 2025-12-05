/ routes/students.js

const express = require('express')
const { Student, validateStudent } = require('./student');

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
    const students = await Student.find().sort("-dateJoined");
    res.send(students);
});

// POST (create) a student
router.post("/", async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    student = await student.save();
    res.send(student);
});



