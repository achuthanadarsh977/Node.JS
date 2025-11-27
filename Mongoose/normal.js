const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to mongodb...', err));


const individualSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },

    age:{
        type:Number,
        required:true,
        min:18,
        max:60
    },

    email:{
        type:String,
        required:true,
        match: /.+\@.+\..+/,
        unique: true
    },

    role:{
        type:String,
        required:true,
        enum:['users','admins','managers']
    },

    joinedAt:{
        type:Date,
        default:Date.now,
        max:new Date()
    },

    phone:{
        type:Number,
        validate:{
            validator: function(v){
                return v.toString().length === 10;
            },
            message:'Phone Number must be ten digits'
        }
    }
});

const Individual = mongoose.model("Individual", individualSchema);


// async function createIndividual(){
//     const indy = new Individual({
//         name:'John Samuel',
//         age:23,
//         email:'johnysam@gmail.com',
//         role:'admins',
//         joinedAt:"2023-10-11",
//         phone:7660377689
//     });

//     const final = await indy.save();
//     console.log(final);
// }

// createIndividual();


// async function createIndividual2(){
//     const indi = new Individual({
//         name:'Sidharth Nair',
//         age:25,
//         email:'sidharthnair@gmail.com',
//         role:'managers',
//         joinedAt:"2025-11-01",
//         phone:7660322321
//     });

//     const final = await indi.save()
//     console.log(final)
// }

// createIndividual2()


// async function getIndividual(){
//     const indi = await Individual.find()
//     console.log(indi)
// }


// getIndividual()

// async function getlimit(){
//     const lime = await Individual.find().limit(2)
//     console.log(lime)
// }

// getlimit()

// async function setIndividual(){
//     const set = await Individual.find().select("name age")
//     console.log(set)
// }

// setIndividual()

async function Compare(){
    const remy = await Individual.find({age: {$gt:20}})
    console.log(remy)
}

Compare()