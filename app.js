const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

// Set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todoListDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define task schema and model here
const taskSchema = new mongoose.Schema({
    name: String
});
const Task = mongoose.model('Task', taskSchema);

// Define routes
const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes);

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});