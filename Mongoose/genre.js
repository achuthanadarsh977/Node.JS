
const Joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const genre = require('./server')








mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to mongodb...', err));


  const genreSchema = new mongoose.Schema({
    name:String
  })

  const Genre = mongoose.model("Genre" , genreSchema)

  const Author = mongoose.model("Author" , new mongoose.Schema({
    name:String,
    bio:String,
    website:String
  }))

  const Course = mongoose.model("Course" , new mongoose.Schema({
    name:String
  }))

  async function createCourse(name , bio , website){
    const course = new Course(name , bio , website)
    const course1 = await course.save()
    console.log(course1)
  }

createCourse('Mosh' , 'Coding with mosh' , 'www.mosh.com')