var presentlyAsked;
var rightArea=document.getElementById('questionArea');
var questionArea=document.getElementById('question');
var answerAreas=document.getElementsByClassName('ans');
var submitbtn=document.getElementById('submit_answer');
var answerValue=document.getElementsByName('answer');
var money =document.getElementsByClassName('money');
var bankbtn=document.getElementById('bank');
var bankDisplay=document.getElementById('bankDisplay');
var totalDisplay=document.getElementById('totalDisplay');
var moneyTreeValuesRound= new Array(1000,10000,75000,125000,500000);


if(localStorage.getItem("bankAmount")==null){
	var moneyBank=parseInt(localStorage.getItem("bank"));
	var amountWon=0;
	var moneyPosition =document.getElementsByClassName('money').length-1;
	var time=120
	var moneyTreeIndex=0;
	}

else {
	var moneyBank=parseInt(localStorage.getItem("bankAmount"));
	var amountWon=parseInt(localStorage.getItem("amountWon"));
	var moneyPosition=	parseInt(localStorage.getItem("moneyPosition"));
	var moneyTreeIndex=parseInt(localStorage.getItem("moneyTreeIndex"));;
	var time=parseInt(localStorage.getItem("time"));
	bankDisplay.innerHTML="BANK: "+moneyBank;
	totalDisplay.innerHTML="Total: "+amountWon;
	money[5].style.backgroundColor="#3f89ff";
	money[parseInt(localStorage.getItem("moneyPosition"))].style.backgroundColor="#633234";
}

bankDisplay.innerHTML="BANK: "+moneyBank;

var tempMessage;
function Question(question,ans1,ans2,ans3,correctAns){
	this.question=question;
	this.ans1=ans1;
	this.ans2=ans2;
	this.ans3=ans3;
	this.correctAns=correctAns;
}

var questionsArray=new Array();
questionsArray[0]= new Question("what does 3*3 equal?","6","9","27","9");
questionsArray[1]= new Question("which thing does not belong?","Sheep","Goat","Chicken","Chicken");
questionsArray[2]= new Question("what is the japanese equivalent to Mikey Mouse?","Pikachu","Naruto","Luffy","Pikachu");
questionsArray[3]= new Question("What is 24/4?","8","6","9","6");
questionsArray[4]= new Question("What does the letters NP stand for in terms of fossi-fuel in Trinidad?","National Petrolium","No Problem","No Power","National Ptrolium");
questionsArray[5]= new Question("Which GPU is faster?","GTX650","GTX750","GTX980","GTX980");
questionsArray[6]= new Question("What is the most common limiter on today GUP?","Temperature","Voltage","PCIE Ports","Voltage");
questionsArray[7]= new Question("What is the ideal type of communcation?","comunication of Ideas","Prefabricate communication","Communication of emotion"," Communication of emotion");
questionsArray[8]= new Question("What is 15+9?","159","6","24","24");
questionsArray[9]= new Question("Which of these can normally be seen?","Air","Hail","sound","sound");
questionsArray[10]= new Question("What si the state of planet Earth?","Spinning","Stationary","Drifting","Spinning");
questionsArray[11]= new Question("What is a tomato?","Fruit","Seed","Vegetable","Fruit");
questionsArray[12]= new Question("What is the best for of contraseptive?","Abstinence","Condom","Pill","Abstinence");
questionsArray[13]= new Question("What is the most internationally accepted Language?","Hindi","Spanish","English","English");
questionsArray[14]= new Question("Which is the most popular sport?","Cricket","Football","Baseball","Football");
questionsArray[15]= new Question("How many players does a cricket team have?","11","5","9","11");

//this function will display a question and the associate answers to the user
function displayQuestion(){
//random index
presentlyAsked = questionsArray[randomGenerator()];

//displaying random question
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
var rand;
function randomGenerator(){
	rand=Math.floor(Math.random()*questionsArray.length);
	
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


// this function will determine which raido button is checked to tester the answer
function testAnswer(){
	var message="";
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
	
	//checks if the user answer is the same as the correct answer
	if(correctAnswer==userAnswer){
		//if user completely wins round 1
		if(moneyTreeValuesRound[moneyTreeIndex]==500000){
			amountWon=moneyTreeValuesRound[moneyTreeIndex];
			storage ();
			localStorage.removeItem("time");
			localStorage.removeItem("question");
			localStorage.removeItem("moneyPosition");
			localStorage.removeItem("moneyTreeIndex");
			localStorage.removeItem("bankAmount");
			localStorage.removeItem("amountWon");
			document.location="round3.html";
		}
		
		else{
		displayQuestion();
		moneyTree();
		amountWon=moneyTreeValuesRound[moneyTreeIndex];
		moneyTreeIndex++;
		message="correct";
		}
	}
	else{
		displayQuestion();
		clearingMoneyTree();
		moneyTreeIndex=0;
		amountWon=0;
		message="Incorrect";
		
	}
	tempMessage=setInterval(function() {messageDisplay(message); },300);
	totalDisplay.innerHTML="TOTAL: "+amountWon;
	
	
}
function clearingMoneyTree(){
	moneyPosition =document.getElementsByClassName('money').length-1;
	
	for(index=0; index<money.length;index++)
	{
	
	money[index].style.backgroundColor="#3f89ff";
	}
	money[moneyPosition].style.backgroundColor="#633234";
}

function moneyTree(){
	var money =document.getElementsByClassName('money');
	money[moneyPosition].style.backgroundColor="#3f89ff";	
	moneyPosition--;	
	money[moneyPosition].style.backgroundColor="#633234";
}


submitbtn.onclick=testAnswer;

var tempMessage;
function bank(){
	var message="";
	if((moneyBank+amountWon)>=1000000){
		moneyBank=1000000;
		storage ();
		localStorage.removeItem("time");
		localStorage.removeItem("question");
		localStorage.removeItem("moneyPosition");
		localStorage.removeItem("moneyTreeIndex");
		localStorage.removeItem("bankAmount");
		localStorage.removeItem("amountWon");
		document.location="round3.html";
	}
	else if(amountWon==0){
		message="you didnt win any money";
	}
	else{
		message="money banked";
		displayQuestion();
		clearingMoneyTree();
		moneyBank+=amountWon;
		moneyTreeIndex=0;
		amountWon=0;
		message="Sucessful bank: "+moneyBank;
	}
	tempMessage=setInterval(function() {messageDisplay(message); },1000);
	bankDisplay.innerHTML="BANK: "+moneyBank;
	totalDisplay.innerHTML="Total: "+amountWon;
	
}
bankbtn.onclick=bank;


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

function reduceTime(){
	
	var display= document.getElementById("time");
	
	localStorage.setItem("time",time);
	localStorage.setItem("question",rand);
	//on the html
	localStorage.setItem("moneyPosition",moneyPosition);
	//on the array
	localStorage.setItem("moneyTreeIndex",moneyTreeIndex);
	localStorage.setItem("bankAmount",moneyBank);
	localStorage.setItem("amountWon",amountWon);
	
	
	if(time==0){
		if(moneyBank==0){
			document.location="lose.html";
			return;
		}
		storage ();
		localStorage.removeItem("time");
		localStorage.removeItem("question");
		localStorage.removeItem("moneyPosition");
		localStorage.removeItem("moneyTreeIndex");
		localStorage.removeItem("bankAmount");
		localStorage.removeItem("amountWon");
		
		document.location="round3.html";
		clearInterval(roundTimer);
	}
	
	display.innerHTML="";
	display.innerHTML= time-- +"";
}
var roundTimer=setInterval(reduceTime,1000);

function storage (){
	var carry=amountWon+moneyBank;
	
			if(carry>=1000000){
				carry=1000000;
				localStorage.setItem("bank",carry);
			}
			else{
				localStorage.setItem("bank",carry);
			}
}
