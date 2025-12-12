const mongoose = require('mongoose')

const express = require('express')

const Joi = require('joi')


const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/weather').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))



const weatherschema = new mongoose.Schema({
    country:{type:String , required:true},
    city:{type:String , required:true},
    coordinates:{lat:Number , long:Number},
    humidity:{type:Number ,  required:true},
    current:{
        temperature:Number,
        sunrise:String,
        sunset:String
    },
    lastupdate:{type : String , default: Date.now},

    forecast:[{
        minTemp:Number,
        maxTemp:Number
    }]
})

const Weather = new mongoose.model("Weather" , weatherschema)

async function createWeather(){
    const weather1 = new Weather({
        country:"U.S.A",
        city:"New York",
        coordinates:{lat:40.712 , long:-30.667},
        humidity:20,
        current:{
            temperature:5,
            sunrise:"2025-12-08",
            sunset:"2025-12-09"
        },

        lastupdate:"2025-10-10",

        forecast:{
            minTemp:-8,
            maxTemp:8
        }

    })

    console.log(await weather1.save())
}

createWeather()

async function findweather(){
    const find = await Weather.find()

    console.log(find)
}

findweather()


function validateWeather(find){
    const schema = Joi.object({
        country: Joi.string().min(5).max(255).required(),
        city: Joi.string().min(5).max(255).required(),
        humidity: Joi.number().required()
    })
}

exports.Weather = Weather;
exports.validateWeather = validateWeather;
