const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');
const id = '5c601ab982bb14274c090c4c';


// Todo.find({_id: id}).then((todos) => {
//   console.log(todos);
// }, (err) => {
//   console.log(err);
// });

// Todo.findOne({_id: id}).then((todo) => {
//   console.log(todo);
// }, (err) => {
//   console.log(err);
// });

// Todo.findById(id).then((todos) => {
//   if (!todos) {return console.log('ID not found!');}
//   console.log(todos);
// }, (err) => {
//   console.log(err);
// });

User.findById(id).then((todo) => {
  if (!todo) {return console.log('User not found!')};
  console.log(todo);
}).catch((err) => {
  console.log(err);
});
