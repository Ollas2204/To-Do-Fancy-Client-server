var express = require('express');
var router = express.Router();
var controllers = require('../controllers/todo')
var middleware = require('../middleware/auth')
/* GET users listing. */
router.get('/findByUser', middleware.decrypt ,controllers.findByUser);
router.post('/createTodo', middleware.decrypt, controllers.createTodo);
router.put('/updateTodo/:id', middleware.decrypt, controllers.updateTodo);
router.delete('/deleteTodo/:id', middleware.decrypt, controllers.deleteTodo);
router.put('/updateCheckList/:id', middleware.decrypt, controllers.updateCheckList);
module.exports = router;
