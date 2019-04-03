function validate(){
	 
	 var name,age;
	 
	 var errorMessages=document.getElementsByClassName('errors');
	 
    name=document.getElementById('name').value.trim();
	gender=document.getElementsByName('gender');
	
	var name_regex=/^[a-zA-Z ]{2,40}$/;
	
	// clears every innerHTML error message
	for(var i=0;i<errorMessages.length;i++)
	{
		errorMessages[i].innerHTML="";
	}
	var hasError=true;
	
	 if(name=="")
	 {
		 errorMessages[0].innerHTML="* required";
		 hasError=false;
	 }
	 else
	 {
		 if(!name_regex.test(name))
		 {
			 errorMessages[0].innerHTML="* invalid name";
			 hasError=false;
		 }
	 }
	 
	 if(gender[0].checked==false && gender[1].checked==false)
	 {
		 errorMessages[1].innerHTML="* required";
		 hasError=false;
	 }
	 if(hasError==true){
		 localStorage.setItem("Name",name);
		 localStorage.setItem("gender",gender);
	 }else{
		 return false
	 }
	
}
document.getElementById('submit').onclick=validate;