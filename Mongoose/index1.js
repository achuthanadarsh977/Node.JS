

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))


const userschema = new mongoose.Schema({
    name:{type:String , required:true},
    author:{type:String},
    tags:{type:String},
    price:{type:Number},
    isPublished:{type:Boolean}
})

const User = mongoose.model('Users',userschema)

async function createUser(){
    const user1 = new User({
        name:'Mia Malkova',
        author:'Mia Malkova',
        tags:'Erotica',
        price:20000,
        isPublished:false
    })

    const result = await user1.save()
    console.log(result)
}

createUser()

async function createUser1(){
    const user1 = new User({
        name:'Cage Match',
        author:'Johnny Cage',
        tags:'Martial Arts',
        price:30000,
        isPublished:true
    })
    
    const result = await user1.save()
    console.log(result)
}

createUser1()


async function createUser2(){
    const user1 = new User({
        name:'Mortal Kombat',
        author:'Ed Boon',
        tags:'Action',
        price:30000,
        isPublished:true
    })

    const result = await user1.save()
    console.log(result)
}

createUser2()


async function getUser(){
    const users = await User.find()
    console.log(users)
}

getUser()