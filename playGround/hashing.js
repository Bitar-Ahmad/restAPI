const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id:4
};

const token = jwt.sign(data, 'Hello there');
console.log(token);
const res = jwt.verify(token, 'Hello there');
console.log(res);




const data = {
  id:4
};

//
//
const token = {
  data, hash: SHA256(JSON.stringify(data) + 'Hello there').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


const resHash = SHA256(JSON.stringify(token.data) + 'Hello there').toString();

if (resHash !== token.hash) { return console.log('Data has been changed , DON\'T TRUST !!') };
  console.log('Data was not changed!');
