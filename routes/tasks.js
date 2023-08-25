// 
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async function(req, res) {
    try {
        const tasks = await Task.find({});
        res.render('index', { tasks: tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async function(req, res) {
    try {
        const taskName = req.body.taskName;
        const newTask = new Task({
            name: taskName
        });
        await newTask.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete', async function(req, res) {
    try {
        const taskId = req.body.checkbox;
        await Task.findByIdAndRemove(taskId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit', async function(req, res) {
    try {
        const taskId = req.body.taskId;
        const updatedTaskName = req.body.taskName;

        await Task.findByIdAndUpdate(taskId, { name: updatedTaskName }).exec();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router