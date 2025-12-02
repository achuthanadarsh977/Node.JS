


const mongoose = require('mongoose')

const express = require('express')

const app = express()
const User = require('./Users')


mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log('✅ Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...',err))






async function runTransaction(){
    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        await User.updateOne(
            {_id:'6926ebb7adba28371ed6cb7e'},
            {$inc: {price:+100}},
            {session}
        );

            await session.commitTransaction()
            session.endSession()
            console.log('Transaction successful')
    }

    catch(err){

        await session.abortTransaction()
        session.endSession()
        console.log('Transaction failed:'+err)

    }
}

runTransaction()