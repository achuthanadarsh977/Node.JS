// student.js
const Joi = require('joi');
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    phone: {
        type: String,
        minlength: 10,
        maxlength: 15,
        required: true
    },

    dateJoined: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Student = mongoose.model("Student", studentSchema);

async function createStudent(){
    const stud = new Student({
        name:'Sam Alexander',
        email:'samalexander@gmail.com',
        phone:'7550277362',
        dateJoined:'2023-10-01'
    })

    const result = await stud.save()

    console.log(result)
}

createStudent()

// Joi Validation
function validateStudent(student) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        phone: Joi.string().min(10).max(15).required(),
    });

    return schema.validate(student);
}

exports.validateStudent = validateStudent
exports.Student = Student
