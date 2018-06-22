var mongoose = require('mongoose')

module.exports = mongoose.model('Todos', new mongoose.Schema({
    name: String,
    author: Array,
    content: String,
    status: Number,
    completeDate: Date
}))