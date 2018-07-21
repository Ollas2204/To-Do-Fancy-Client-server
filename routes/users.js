var express = require('express');
var router = express.Router();
var controllers = require('../controllers/user')
/* GET users listing. */
router.post('/login', controllers.login);
router.post('/login_fb', controllers.login_fb);
router.post('/addUser', controllers.addUser);
router.put('/updateUser', controllers.updateUser);
router.delete('deleteUser', controllers.deleteUser)
module.exports = router;
