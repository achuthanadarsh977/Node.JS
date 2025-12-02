




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


// async function updateAuthor(authorId){
//     const author = await Author.updateOne({_id:authorId},{$set:{'name':'John Smith'}});
// }

// updateAuthor('692e8f207e5ea072d699caae')


// async function findAuthor(){
//     const author  = await Author.find().select("name")
//     console.log(author)
// }

// findAuthor()


// async function findauthid(){
//     const course = await Author.findById('692e8f207e5ea072d699caae');
//     await course.save()
//     console.log(course)
// }

// findauthid()