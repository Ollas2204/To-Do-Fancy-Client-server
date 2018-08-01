const Todo = require('../models/todo');

module.exports = {
  findByUser : ( req, res, next) => {
    Todo.find({
      UserId : req.decoded.id,
    })
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  },
  createTodo : ( req, res) => {
    console.log(req.body, req.decoded)
    Todo.create({
      UserId : req.decoded.id,
      content : req.body.content,
      forDate : req.body.forDate,
      weather: req.body.weather,
      checklist : false
    })
    .then(todo => {
      res.status(201).json({
        msg : 'successful create new data',
        todo : todo
      })
    })
    .catch(err => {
      res.status(500).json({
        msg : 'failed create data'
      })
    })
  },
  updateTodo : ( req, res ) => {
    Todo.findByIdAndUpdate(req.params.id,{
      content : req.body.content,
      forDate: req.body.forDate,
      checklist : false
    },{ new : true })
    .then(todo => {
      res.status(201).json({
        msg : 'successful update the data',
        todo : todo
      })
    })
    .catch(err => {
      res.status(500).json({
        msg : 'failed to update the data'
      })
    })
  },
  updateCheckList : ( req, res ) => {
    let checklist = req.body.checklist == 'true' || req.body.checklist == true ? true : false;
    console.log(checklist);
    Todo.findByIdAndUpdate(req.params.id,{
      checklist : checklist
    },{ new : true })
    .then(todo => {
      res.status(201).json({
        msg : 'successful update the checklist',
        todo : todo
      })
    })
    .catch(err => {
      res.status(500).json({
        msg : 'failed to update the data'
      })
    })
  },
  deleteTodo : ( req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deleteTodo) => {
      if (err) {
        res.status(500).json({
          msg: 'failed to deleted the data'
        })
      }
      else {
        res.status(200).json({
          msg: 'successful delete the data',
          todo: deleteTodo
        })
      }
    })
  }
}
