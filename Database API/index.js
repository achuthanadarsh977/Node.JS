// index.js
const Joi = require('joi');
const mongoose = require('mongoose');

const express = require('express')
const students =  require('./students');


const app = express();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.error('Could not connect to MongoDB', err));


    
// GET all students
app.get("/api/students", async (req, res) => {
  const students = await Student.find().sort("-dateJoined");
  res.send(students);
});

// POST new student
app.post("/api/students", async (req, res) => {
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

// -----------------------------------------------------------
// 5. START SERVER
// -----------------------------------------------------------
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});