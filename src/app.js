const express = require('express');
require('./db/connection');
const Student = require('./models/students');

const app = express();
app.use(express.json());

app.get('/students', async(req,res) => {
    try {
        const studentList = await Student.find();
        res.status(200).send(studentList);
    }
    catch(err) {
        res.status(400).send(`Failed to fetch student data as ${err}`);
    }
})

app.get('/student', async(req,res) => {
    try {
        const name = req.query.name;
        const email = req.query.email;
        const studentList = await Student.find({name: name, email: email});
        res.status(200).send(studentList);
    }
    catch(err) {
        res.status(400).send(`Failed to fetch student data as ${err}`);
    }
})

app.get('/student/:name', async(req,res) => {
    try {
        const name = req.params.name;
        const studentList = await Student.find({name: name});
        res.status(200).send(studentList);
    }
    catch(err) {
        res.status(400).send(`Failed to fetch student data as ${err}`);
    }
})

app.post('/students', async(req,res) => {
    const stud = new Student(req.body);
    try {
        await stud.save();
        res.status(201).send("Student registration successful!");
    }
    catch(e) {
        res.status(400).send(`Failed to register Student as ${e}`);        
    }

    // stud.save().then(() => {
    //     res.status(201).send("Student registration successful!");
    // }).catch((e) => {
    //     res.status(400).send(`Failed to register Student as ${e}`);
    // })
})

app.patch('/student/:id', async(req,res) => {
    try{
        const sid = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate({_id: sid}, req.body, {new: true});
        res.status(200).send(`Student detail updated to \n ${updatedStudent}`);
    }
    catch(err) {
        res.status(400).send(`Failed to update Student details as ${err}`);
    }
})

app.delete('/student/:id', async(req,res) => {
    try {
        const sid = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete({_id: sid});
        res.status(200).send(`Deleted student record successfully \n ${deletedStudent}`);
    }
    catch(err) {
        res.status(500).send(`Failed to delete Student details as ${err}`);
    }
})

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
})