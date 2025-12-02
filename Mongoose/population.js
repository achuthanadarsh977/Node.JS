


const mongoose = require('mongoose')

const express = require('express')

const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log('✅ Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...',err))


const authorschema = new mongoose.Schema({
    name:String,
    bio:String,
    website:String
})


const Author =   mongoose.model('Author',authorschema)

const courseSchema = new mongoose.Schema({
    name:String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Author
    }
})

const Course = mongoose.model('Course',courseSchema)


// async function CreateAuthor(name,bio,website){
//       const author = new Author({name,bio,website})

//       const read = await author.save()
//       console.log(read)
// }

// CreateAuthor('Jackie Chan','Jackie Chan Adventures','wwW.jackiechanadventures.com')

// async function createCourse(name,author){
//     const course = new Course({name,author})

//     const result = await course.save()
//     console.log(result)
// }

// createCourse('Python' , CreateAuthor('John Udemy' , 'Udemy bio' , 'www.udemy.com'))



// async function findcourse(){
//     const find = await Course.find()
//     console.log(find)
// }

// findcourse()


// async function listcourses(){
//     const google = await Course.find().populate('owner').select('name')
//     console.log(google)
// }

// listcourses()

