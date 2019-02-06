const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url + '/TodoApps');



client.connect((err , client) => {
  if (err) { return console.log('Unable to connect MongoDB server!')};
  console.log("Connected successfully to server");
  const db = client.db('TodoApps');


  // db.collection('Todos').findOneAndUpdate({_id:ObjectID('5c5ad81aa7ae3ca8e2fb29be')}, {$set: {completed:true}}, {returnOriginal:false}).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });

  db.collection('Users').findOneAndUpdate({_id:ObjectID('5c5ad59fd2053b0c35814df6')}, {$inc: {age:+1}}, {returnOriginal:false}).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });


  client.close();
});
