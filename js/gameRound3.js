var presentlyAsked;
var questionArea=document.getElementById('question');
var answerAreas=document.getElementsByClassName('ans');
var submitbtn=document.getElementById('submit_answer');
var answerValue=document.getElementsByName('answer');
var money =document.getElementsByClassName('money');
var timeArea=document.getElementById('rem');
//localstorage from previous rounds
var moneyBank=parseInt(localStorage.getItem("bank"));
if(moneyBank==0)document.location="round3.html";
var bankDisplay=document.getElementById('bankDisplay').innerHTML="BANK: "+moneyBank;

if(localStorage.getItem("amountOfQuestionAnswered")==null){
	var amountOfQuestionAnswered=0;
	var time=60;
	}
else { 
	var amountOfQuestionAnswered=parseInt(localStorage.getItem("amountOfQuestionAnswered"));
	var time=parseInt(localStorage.getItem("time"));
	}


localStorage.setItem("round","round3");
var winTheGame=false;
var answerDiv=document.getElementById('ans');

var questionsArray=new Array();
questionsArray[0]= new Question("What has a foot but no legs?","snail","dog","bird","snail");
questionsArray[1]= new Question("Poor people have it. Rich people need it. If you eat it you die. What is it?","money","power","notting","notting");
questionsArray[2]= new Question("What comes down but never goes up?","ball","rain","smoke","rain");
questionsArray[3]= new Question(" I’m tall when I’m young and I’m short when I’m old. What am I?","candle","tree","man","candle");
questionsArray[4]= new Question("Mary’s father has 5 daughters – Nana, Nene, Nini, Nono. What is the fifth daughters name?","Un-named","Mary","Nana","Mary");
questionsArray[5]= new Question("What goes up when rain comes down?","sun","umbrella","air","umbrella");
questionsArray[6]= new Question("What travels around the world but stays in one spot?","person","stamp","plane","stamp");
questionsArray[7]= new Question("What has 4 eyes but can’t see?","mississippi","harry potter","master yi","mississippi");
questionsArray[8]= new Question("What has hands but can not clap?","dog","clock","human","clock");
questionsArray[9]= new Question("What can you catch but not throw?","cold","ball","money","cold");
questionsArray[10]= new Question("What has one eye but cannot see?","ben","needle","fish","needle");
questionsArray[11]= new Question("What is so delicate that saying its name breaks it?","silence","computer","feather","silence");
questionsArray[12]= new Question("What kind of tree can you carry in your hand?","coconut","palm","mango","palm");
questionsArray[13]= new Question("How many months have 28 days?","12","1","2","12");
questionsArray[14]= new Question("What goes up but never comes down?","age","rain","pizza","age");

function Question(question,ans1,ans2,ans3,correctAns){
	this.question=question;
	this.ans1=ans1;
	this.ans2=ans2;
	this.ans3=ans3;
	this.correctAns=correctAns;
}

function displayQuestion(){
presentlyAsked = questionsArray[randomGenerator()];
questionArea.innerHTML=presentlyAsked.question;
//display of answers
answerAreas[0].innerHTML=presentlyAsked.ans1;
answerAreas[1].innerHTML=presentlyAsked.ans2;
answerAreas[2].innerHTML=presentlyAsked.ans3;

//changing the values
answerValue[0].value=presentlyAsked.ans1;
answerValue[1].value=presentlyAsked.ans2;
answerValue[2].value=presentlyAsked.ans3;
}

var questionsPreviouslyAsked= new Array();
function randomGenerator(){
	var rand=Math.floor(Math.random()*questionsArray.length);
	
	if(questionsPreviouslyAsked.length==0){
		questionsPreviouslyAsked.push(rand);
		return rand;
	}
	
	for(i=0;i<questionsPreviouslyAsked.length;i++){
		if(questionsPreviouslyAsked[i]==rand){
			rand=Math.floor(Math.random()*questionsArray.length);
			i=0;
		}
	}
	
	questionsPreviouslyAsked.push(rand);
	return rand;
}

displayQuestion();

function testAnswer(){
	var correctAnswer=presentlyAsked.correctAns;
	var userAnswer;
	
	if(answerValue[0].checked==true){
		userAnswer= answerValue[0].value;
	}
	else if(answerValue[1].checked==true){
		userAnswer= answerValue[1].value;
	}
	else if(answerValue[2].checked==true){
		userAnswer= answerValue[2].value;
	}
	
	if(correctAnswer==userAnswer){
		tempMessage=setInterval(function() {messageDisplay("correct"); },1000);
		amountOfQuestionAnswered++;
		displayQuestion();
	}
	
	else{
		
		document.location="lose.html";
	}
	
}

submitbtn.onclick=testAnswer;

function reduceTime(){
	
	var display= document.getElementById("time");
	
	localStorage.setItem("time",time);
	localStorage.setItem("amountOfQuestionAnswered",amountOfQuestionAnswered)
	
	if(time==0){
		if(amountOfQuestionAnswered >=10){
		document.location="win.html";
		}
		else{
		document.location="lose.html";	
	}
	}
	
	display.innerHTML="";
	display.innerHTML= time-- +"";
}
var roundTimer=setInterval(reduceTime,1000);

var x=1;
function messageDisplay(msg){

var message=document.getElementById('msg');	
message.innerHTML=msg;	
if(x==5){
	clearInterval(tempMessage);
	message.innerHTML="";
	x=0;
}
x++;
}







