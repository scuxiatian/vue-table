var express = require('express')
var app = express()
var mongoose = require('mongoose')
var url = 'mongodb://localhost:27017/test'

bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    next()
})

app.use('/todos', require('./router'))

mongoose.connect(url, (err) => {
    if (err) {
        console.log('Error: ' + err)
    } else {
        console.log('db connect success')
    }
})

app.listen(3000, () => {
    console.log('server start')
})