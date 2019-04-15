var socket = io();
window.addEventListener("devicemotion", accelerometerUpdate, true);
window.addEventListener("deviceorientation", handleOrientation, true);

var switcher = false;

if (window.DeviceMotionEvent == undefined) {
	console.log("devicemotion was  not defined");
};

if (window.DeviceOrientationEvent) {
  console.log("GyroScope was defined");
};
var acc = { x:0, y:0, z:0};
var gyro = {gamma:0, alpha:0, beta:0};
var acc;
var gyro;


function handleOrientation(event) {
  var alpha    = event.alpha;
  var gamma    = event.gamma;
  var beta     = event.beta;

  document.querySelector("#xx").value = alpha;
  document.querySelector("#yy").value = gamma;
  document.querySelector("#zz").value = beta;
	return gyro = {x:alpha, y:gamma, z:beta};
}

function accelerometerUpdate(event) {
   var aX = event.accelerationIncludingGravity.x;
   var aY = event.accelerationIncludingGravity.y;
   var aZ = event.accelerationIncludingGravity.z;

	 document.querySelector("#x").value = aX;
	 document.querySelector("#y").value = aY;
	 document.querySelector("#z").value = aZ;
   return acc = {x:aX, y:aY, z:aZ};
};

// var hello = () => {
//   setTimeout(() => {
//     read1 = mark;
//     console.log('0.3', read1);
//   }, 333);
//   setTimeout(() => {
//     read2 = mark;
//     console.log('0.6', read2);
//   }, 666);
//   setTimeout(() => {
//     read3 = mark;
//     console.log('1', read3);
//   }, 1000);
//   setTimeout(() => {
//
//   }, 1010);
// };

var doIt;
var quality = false;

function doSomething(){
	var mark = { x:acc.x, y:acc.y, z:acc.z, gamma:gyro.gamma, alpha:gyro.alpha, beta:gyro.beta, timestamp:new Date().getTime(), quality:quality};
	socket.emit('GettingData', mark);
}



function sendData(){
	 doIt = setInterval(doSomething, 200);
};

function breakSending(){
	clearInterval(doIt);
};

function toggleQuality(){
	quality = !quality
	if(quality == true){
		document.querySelector('#quality').textContent = 'False';
	} else {
		document.querySelector('#quality').textContent = 'True';
	};
};

//
//
// const hi = function(){
// 	setTimeout(() => {
// 	},1000);
// }
//
// var doWhile = () => {
// 	setInterval(() => {
// 		console.log('hello');
// 	},500);
// }
//
// var stop = () => {
// 	clearInterval(start)
// };
//
// var start = setInterval(() => {
// 			console.log('hello');
// 		},500);
//
