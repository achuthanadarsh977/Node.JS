const express = require("express");
const app = express();

const port = process.env.PORT || 3000;


const courses = [
    {id:1 ,  name:"course1"},
    {id:2 , name:"course2"},
    {id:3 , name:"course3"}
]

const employees = [
    {id:12 , name:"Älan"},
    {id:13 , name:"Sam"},
    {id:14 , name:"John"}
]

// Home route
app.get("/", (req, res) => {
    console.log("Hello everyone");
    res.send("Welcome to my first Express server!");  // FIXED
});

// API route
app.get("/api/courses", (req, res) => {
    res.send(courses);
});


app.get("/api/posts/:years/:month" , (req,res) => {
    res.send(req.params)
})

app.get("/api/employees" , (req,res) => {
    res.send(employees)
})

app.get("/api/employees", (req, res) => {
    const { id, name } = req.query;

    if (id) {
        return res.send(courses.find(c => c.id === parseInt(id)));
    }

    if (name) {
        return res.send(courses.find(c => c.name === name));
    }

    res.send("No employee found");
});

app.post('/api/length' , (req,res) => {
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})


// Start server
app.listen(port, () => {
    console.log(`Express running at http://localhost:${port}`);
});
