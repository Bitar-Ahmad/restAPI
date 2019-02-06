const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';

// const obj = new ObjectID();
// console.log(obj);

const client = new MongoClient(url + '/TodoApps');
client.connect((err , client) => {
  if (err) { return console.log('Unable to connect MongoDB server!')};
  console.log("Connected successfully to server");
  const db = client.db('TodoApps');


  // db.collection('Todos').insertOne({text:'Hi there', completed:true}, (err, res) => {
  //   if (err) { return console.log('Unable to insert data!', err)};
  //   console.log(res.ops);
  // });
  //
  //
  // //
  // db.collection('Users').insertOne({Name:'Raul', age:25 , location:'Spain'}, (err, res) => {
  //   if (err) { return console.log('Unable to insert data!', err)};
  //   console.log(res.ops[0]._id.getTimestamp());
  // });

  //
  //
  // db.collection('Users').insertOne({Name:'Ahmad', age:25 , location:'Vilnius'}, (err , res) => {
  //   if (err) {return console.log('Unable to insert User!')};
  //   console.log(res.ops);
  // });



  client.close();
});
