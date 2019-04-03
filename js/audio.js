var audioBtn=document.getElementById('audio');
var audio="on";
var audioMusic = new Audio();
audioMusic.src="1.mp3";
audioMusic.play();
audioMusic.loop=true;

function icon(){
	if(audio=="on"){
			audioBtn.innerHTML="<img src='../images/audioOff.png'/>";
		audio="off"
		audioMusic.pause();
	}else{
		audioBtn.innerHTML="<img src='../images/audioOn.png'/>";
		audio="on"
		audioMusic.play();
		audioMusic.loop=true;
	}
}
audioBtn.onclick=icon;



var bleep= new Audio();
var swit= false;
	
function play(){
if (swit==false){
	bleep.src="1.mp3";
	bleep.play();
	swit=true;
	}
	else if (swit==true){
	bleep.src="";
	bleep.play();
	swit=false;}

	
}