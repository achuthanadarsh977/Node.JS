




const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))

const courseSchema = new mongoose.Schema({
    name:{type:String , required:true},
    author:String,
    tags:[String],
    date:{type:Date , default:Date.now},
    isPublished:Boolean,
    price:{type:Number}
})