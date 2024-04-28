const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load tasks from file
function loadTasks() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'tasks.json'), 'utf8');
        return JSON.parse(data).tasks;
    } catch (err) {
        console.error('Error reading tasks from file:', err);
        return [];
    }
}

// Save tasks to file
function saveTasks(tasks) {
    try {
        const data = JSON.stringify({ tasks }, null, 2);
        fs.writeFileSync(path.join(__dirname, 'tasks.json'), data);
    } catch (err) {
        console.error('Error saving tasks to file:', err);
    }
}

let tasks = loadTasks();
let nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Task Manager API');
});

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.status(200).json(task);
});

app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== 'boolean') {
        return res.status(400).send('Invalid input');
    }
    const newTask = { id: nextId++, title, description, completed };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    const { title, description, completed } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof completed !== 'undefined' && typeof completed !== 'boolean') {
        return res.status(400).send('Invalid data type for completed status');
    }
    if (typeof completed === 'boolean') task.completed = completed;
    saveTasks(tasks);
    res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Task not found');
    }
    tasks.splice(index, 1);
    saveTasks(tasks);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Task Manager API running on http://localhost:${port}`);
});

module.exports = app;
