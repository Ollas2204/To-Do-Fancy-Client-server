const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  UserId    : { type: Schema.Types.ObjectId, ref: 'user'},
  content   : String,
  checklist : Boolean,
}, {
  timestamps : true
});

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;
