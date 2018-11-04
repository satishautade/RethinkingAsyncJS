
var a = 0;

((){

for(var i = 0; i< 10; i++){
	if(i<5){
		console.log("Printing i => " + i);
	}
	else{
		a++
		return;
	}
	}
})();
console.log("Print a => " + a)