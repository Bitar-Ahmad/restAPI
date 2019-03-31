var gn = new GyroNorm();

var args = {
	frequency:50,
	gravityNormalized:true,
	orientationBase:GyroNorm.GAME,
  decimalCount:2,
	logger:null,
	screenAdjusted:false
};

gn.init(args).then(function(){
  gn.start(function(data){

    // data.do.alpha
    // data.do.beta
    // data.do.gamma
    // data.do.absolute
    //
    // data.dm.x
    // data.dm.y
    // data.dm.z
    //
    // data.dm.gx
    // data.dm.gy
    // data.dm.gz
    //
    // data.dm.alpha
    // data.dm.beta
    // data.dm.gamma
  });
}).catch(function(e){
	console.log(err);
});
