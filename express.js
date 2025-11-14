


const express = require('express')
const app = express()

app.use(express.json())

// app.get()
// app.put()

// app.post()

let users = [
    {id:1 , name:'John'},
    {id:2 , name:'Sam'}
]

app.get('/',(req,res) => {
    res.json(users)
})

app.get('/',(req,res) => {
    res.send('Hello everyone')
});

app.listen(3000 , () => console.log('Listening at port 3000'))

app.get('/api/courses' , (req,res) => res.send([1,2,3]))

app.get('/' , (req,res) => console.log('Hello Everyone'))

