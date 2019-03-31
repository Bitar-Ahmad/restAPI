const mongoose = require('mongoose');


const Data = mongoose.model('data', {
  alpha:{
    type:Number
  },
  beta:{
    type:Number
  },
  gamma:{
    type:Number
  },
  absolute:{
    type:Number
  },
  completedAt: {
    type: Number,
    default:null
  }
});




module.exports = {Data}
