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
var moneyTreeValuesRound1=new Array(1000,5000,10000,50000,75000,125000,250000,500000);

if(localStorage.getItem("bankAmount")==null){
	var moneyBank=0;
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
	money[8].style.backgroundColor="#3f89ff";
	money[parseInt(localStorage.getItem("moneyPosition"))].style.backgroundColor="#633234";
}
	

var tempMessage;
localStorage.setItem("round","round1");
function Question(question,ans1,ans2,ans3,correctAns){
	this.question=question;
	this.ans1=ans1;
	this.ans2=ans2;
	this.ans3=ans3;
	this.correctAns=correctAns;
}

var questionsArray=new Array();
questionsArray[0]= new Question("What is the color of the sky?","green","blue","pink","blue");
questionsArray[1]= new Question("How many legs does a dog have?","1","8","4","4");
questionsArray[2]= new Question("How many planets are there in the solar?","8","1","50","8");
questionsArray[3]= new Question("Who is the prime minister of Trinidad and Tobago","Rowley","Kamla","SpongeBob","Rowley");
questionsArray[4]= new Question("Who lives in a pineapple under the sea?","Patrick","SpongeBob","Sandy","SpongeBob");
questionsArray[5]= new Question("What does 2 + 4 equal?","5","8","6","6");
questionsArray[6]= new Question("What year did the animated series Hunter x Hunter 2011 air?","1999","2014","2011","2011");
questionsArray[7]= new Question("What year did Trinidad and Tobago gain independence ?","1962","1972","1963","1963");
questionsArray[8]= new Question("Who is the greates Pot?","PotPot","Sir Potington","Pot X Machina","PotPot");
questionsArray[9]= new Question("In the bible verse John 3:16 who loves the world?","Jesus","God","Spagetti Monster","God");
questionsArray[10]= new Question("In the mobile app Yugioh-Duel-Link how many tributes are needed to summon a monster of lvl 7 or higher?","2","1","0","2");
questionsArray[11]= new Question("In the energy system from the animated series Naruto what chakra nature beats lightning?","Earth","Wind","Fire","Wind");
questionsArray[12]= new Question("Who is Savitar?","Roney","Barry","Walle","Barry");
questionsArray[13]= new Question("What is the best MOBA game?","Dota2","League of Ledgends","Smite","Dota2");
questionsArray[14]= new Question("What is the freezing temperature of water?","0","-273","100","0");
questionsArray[15]= new Question("Which is the cheepest?","Super","Premium","Diesel","Diesel");

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
		if(moneyTreeValuesRound1[moneyTreeIndex]==500000){
			amountWon=moneyTreeValuesRound1[moneyTreeIndex];
			storage();
			
			localStorage.removeItem("time");
			localStorage.removeItem("question");
			localStorage.removeItem("moneyPosition");
			localStorage.removeItem("moneyTreeIndex");
			localStorage.removeItem("bankAmount");
			localStorage.removeItem("amountWon");
			document.location="round2.html";
		}
		
		else{
		displayQuestion();
		moneyTree();
		amountWon=moneyTreeValuesRound1[moneyTreeIndex];
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
	
	if(moneyBank+amountWon>=500000){
		moneyBank=500000;
		storage();
		localStorage.removeItem("time");
		localStorage.removeItem("question");
		localStorage.removeItem("moneyPosition");
		localStorage.removeItem("moneyTreeIndex");
		localStorage.removeItem("bankAmount");
		localStorage.removeItem("amountWon");
		document.location="round2.html";
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
		document.location="round2.html";
		storage();
		localStorage.removeItem("time");
		localStorage.removeItem("question");
		localStorage.removeItem("moneyPosition");
		localStorage.removeItem("moneyTreeIndex");
		localStorage.removeItem("bankAmount");
		localStorage.removeItem("amountWon");
		clearInterval(roundTimer);
	}
	
	display.innerHTML="";
	display.innerHTML= time-- +"";
}
var roundTimer=setInterval(reduceTime,1000);

function storage (){
	var carry=amountWon+moneyBank;
			if(carry>=500000){
				carry=500000;
				localStorage.setItem("bank",carry);
			}else{
				localStorage.setItem("bank",carry);
			}
}








