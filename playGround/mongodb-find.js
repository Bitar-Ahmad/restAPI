const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url + '/TodoApps');



client.connect((err , client) => {
  if (err) { return console.log('Unable to connect MongoDB server!')};
  console.log("Connected successfully to server");
  const db = client.db('TodoApps');


  // db.collection('Todos').find({_id:ObjectID('5c5a041050bf0b8460ea9a38')}).toArray().then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });


  // db.collection('Todos').find().count().then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });

  db.collection('Users').find({Name:'Ahmad'}).toArray().then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  })



  client.close();
});
