

const express = require('express')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

const courses = [
    {id:1 , name:"course1"},
    {id:2 , name:"course2"},
    {id:3 , name:"course3"}
]

app.get('/' , (req,res) => {
    res.send("Hello Everyone!")
})



app.get('/courses' , (req,res) => {
    res.send(courses)
})


// Start server
app.listen(port, () => {
    console.log(`Express running at http://localhost:${port}`);
});
