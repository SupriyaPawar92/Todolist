const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Tasks', taskSchema);