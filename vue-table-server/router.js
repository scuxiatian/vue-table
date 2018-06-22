var router = require('express').Router()
var Todo = require('./todos')
var officegen = require('officegen')
var fs = require('fs')
var formidable = require('formidable')
var node_xlsx = require('node-xlsx')

const status = ['未开始', '进行中', '搁置', '完成']

// 将字符串转化为日期
function convertDate(s) {
    console.log(s)
    let data = s.split('/')
    let year = parseInt(data[0])
    let month = parseInt(data[1])-1
    let day = parseInt(data[2])
    return new Date(year, month, day)
}

router.route('/upload').post((req, res) => {
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.parse(req, (err, fields, files) => {
        let workbook = node_xlsx.parse(files.file.path)
        // workbook[0] 即 sheet1 中的数据， 再用slice去掉表头
        let data = workbook[0].data.slice(1)
        for(let item of data){
            let tmp = {}
            tmp.name = item[0]
            tmp.author = item[1].split(',')
            tmp.status = 0
            tmp.completeDate = convertDate(item[2])
            let todo = Todo.create(tmp)
        }
        res.send('导入完成')
    })
})

router.route('/download').post((req, res) => {
    var todos = req.body
    var data = []
    var heads = ['学习书籍', '作者', '学习计划状态', '学习完成时间']
    
    data.push(heads)
    todos.forEach((todo) => {
        var tmp = []
        tmp[0] = todo.name
        tmp[1] = todo.author.join(',')
        tmp[2] = status[todo.status]
        tmp[3] = new Date(todo.completeDate).toLocaleDateString()
        data.push(tmp)
    })

    var xlsx = officegen('xlsx')
    var sheet = xlsx.makeNewSheet()
    sheet.data = data

    xlsx.generate(res)
})

router.route('/:id').put((req, res) => {
    Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, todo) => {
        if (err) console.log(err)
        res.json(todo)
    })
}).delete((req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) console.log(err)
        res.json(todo)
    })
})

router.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) console.log(err)
        res.json(todos)
    })
}).post((req, res) => {
    var todo = req.body
    todo.status = 0
    Todo.create(todo, (err, todo) => {
        if (err) console.log(err)
        res.json(todo)
    })
})

module.exports = router