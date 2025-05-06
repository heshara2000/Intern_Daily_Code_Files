var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const todos = [{id:1,name: 'Do something',completed:false}];

//todos

router.get('/', function(req,res,next){
    res.json(todos);
});

router.get('/:id', function(req,res,next) {
    const foundtodo = todos.find(todo => todo.id === Number(req.params.id));
    if (!foundtodo) {
        //404
        return next(createError(404, 'not found'));
    }
    res.json(foundtodo);

})

router.post('/todos', function(req,res,next) {
    const { body } = req;
    const newTodo = {
        id: todos.length  + 1,
        name: body.name,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
})

module.exports = router;