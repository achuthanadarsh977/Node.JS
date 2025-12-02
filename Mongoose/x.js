
// //Using References

// let author = {
//     name:'Mosh'
// }


// // //Using Embedded Documents

// let course = {
//     author:'id'
// }


// Using Hybrid
// course = {
//     author : {
//         name:'Mosh Hamdeni'
//     }
// }

// console.log(course)



// course = {
//     author : {
//         name:'Mosh Hamedeni',
//         id: 12
//     }
// }

// console.log(course)



const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))


const indyschema = new mongoose.Schema({
    name:{type:String , required:true},
    author:{type:String},
    tags:{type:String},
    price:{type:Number},
    isPublished:{type:Boolean}
})

const Indy = mongoose.model('Indy',indyschema)

const emailschema = new mongoose.Schema({
    email:{type:String , required:true , unique:true},
    password:{type:String}
})

// async function createUser(){
//     const user1 = new Indy({
//         name:'Mia Malkova',
//         author:'Mia Malkova',
//         tags:'Erotica',
//         price:20000,
//         isPublished:false
//     })

//     const result = await user1.save()
//     console.log(result)
// }

// createUser()

// async function createUser1(){
//     const user1 = new Indy({
//         name:'Cage Match',
//         author:'Johnny Cage',
//         tags:'Martial Arts',
//         price:30000,
//         isPublished:true
//     })
    
//     const result = await user1.save()
//     console.log(result)
// }

// createUser1()


// async function createUser2(){
//     const user1 = new Indy({
//         name:'Mortal Kombat',
//         author:'Ed Boon',
//         tags:'Action',
//         price:30000,
//         isPublished:true
//     })

//     const result = await user1.save()
//     console.log(result)
// }

// createUser2()


// async function getUser(){
//     const users = await Indy.find()
//     console.log(users)
// }

// getUser()




async function hashPassword() {
    const password = "hello123";

    const salt = await bcrypt.genSalt(10);   // generate salt
    const hash = await bcrypt.hash(password, salt); 

    console.log("Salt:", salt);
    console.log("Hash:", hash);
}

hashPassword();

async function checkLogin() {
    const password = "hello123"; // user input
    const storedHash = "$2b$10$8P9nQp..."; // saved in DB

    const valid = await bcrypt.compare(password, storedHash);

    if (valid) console.log("Login success!");
    else console.log("Invalid password");
}

checkLogin();


