

const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))


const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String
})

const Student = mongoose.model('Student',studentSchema)


// async function createStudent(){
// const student = new Student({
//     name:'Johnny Somali',
//     email:'johnnysomali1@gmail.com',
//     phone:'7660377562'
// })
//   const result = await student.save()
//   console.log(result)
// }

// createStudent()

// async function getStudent(){
//     const courses = await Student.find()
//     console.log(courses)
// }

//getStudent()


// async function setStudent(){
//     const identity = await Student.find().select("name email")
//     console.log(identity)
// }

// setStudent()

// async function InsertStudent(){
//     const insertone = await Student.find().sort({name:1})
//     console.log(insertone)
// }

//InsertStudent()


async function Compare(){
      const studentphone = await Student.find().limit(5);
      console.log(studentphone)
}

Compare()
