const env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
};

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {Data} = require('./models/data');
const _ = require('lodash');
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
const GyroNorm = require('gyronorm');

const app = express();

app.use(bodyParser.json());



// gn.init().then(function(){
//   gn.start(function(data){
//
//
//     const data1 = new Data({
//       alpha:data.do.alpha ,
//       beta: data.do.beta,
//       gamma: data.do.gamma,
//       absolute:data.do.absolute
//     });
//
//     data1.save().then((doc) => {
//       console.log(doc);
//     }, (err) => {
//       console.log(err);
//     });
//   });
// }).catch(function(e){
// 	console.log(err);
// });
//


app.listen(port, () => {
  console.log(`Starting server on port ${port}!`);
});

module.exports = {app};


app.post('users', (req, res) => {
  const body = ._pick(req.body, ['email' , 'passowrd']);
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();

  }).then((token) => {

  });
});



app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, '123asd').toString(); //toHexString();
    user.tokens.push({access, token});
    return user.save().then(() => { //should return user.save() otherwise then next call will not be excuted;
      return token;
    })
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });

});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then((user) => {
    res.status(200).send(user);
  }, (err) => {
    res.status(400).send(err);
  });
});





app.get('/todos/:id', (req , res) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id)) {return res.status(404).send()};
  Todo.findById(id).then((todo) => {
    if (!todo) {return res.status(404).send()};
    res.send({todo});

  }).catch((err) => {
    res.status(400).send();
  });
});


app.delete('/todos/:id', (req , res ) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id)) {return res.status(404).send()};
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {return res.status(404).send()};
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req , res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {return res.status(404).send()};
  if (_.isBoolean(body.completed) && body.completed) {body.completedAt = new Date().getTime()} else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {return  res.status(404).send()};
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
});
app.get('/todos', (req , res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send(err);
  });
