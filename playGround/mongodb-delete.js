const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url + '/TodoApps');



client.connect((err , client) => {
  if (err) { return console.log('Unable to connect MongoDB server!')};
  console.log("Connected successfully to server");
  const db = client.db('TodoApps');

  // db.collection('Todos').deleteMany({text:'Hello there'}).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });
  //
  // db.collection('Todos').deleteOne({text:'Hi there'}).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });

  db.collection('Todos').findOneAndDelete({text:'some thing here'}).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });



  client.close();
});
