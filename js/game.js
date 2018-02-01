function s(e) {
 	return document.getElementById(e);
 };
var formulaString=[];
var numString=[];
var signString=[];
var numStringT=[];
var signStringT=[];
var stringTmp=""; 
var disp=s("display");
var formula=s("formula");
var answer=s("answer");
var dotExist=false;
var ans=0;
var open=false;

var button =document.querySelectorAll(".button");

for (var i = 0; i < button.length; i++) {
 	
 	button[i].addEventListener("click",function(){
 		if (!open) {
 			disp.style.backgroundColor="rgb(128, 255, 212)";
 			open=false;
 		} 
 			 
 		if (formulaString.length==0) {
 			if ((parseInt(this.innerHTML)<10&&parseInt(this.innerHTML)>-1)||this.innerHTML=='-') {
	 		 formulaString.push(this.innerHTML);
	 		}

 		}else{
 			 	switch(this.innerHTML){
	 				case 'c':
	 					 formulaString=[];
	 						numString=[];
	 						signString=[];
	 						 dotExist=false;
	 						 stringTmp=""
	 						
	 					break;
	 				case '←':
	 				if (formulaString[formulaString.length-1]=='.') {
	 					dotExist=false;
	 					}
	 				
		 				formulaString.splice(formulaString.length-1,1);

	 					break;
	 				case '±': 
	 					//console.log(numString[numString.length-1].length);

	 					if ((parseInt(formulaString[formulaString.length-1])<10&&parseInt(formulaString[formulaString.length-1])>-1)||this.innerHTML=='.') {

		 					if (parseFloat(numString[numString.length-1])<0) {
								
		 						var signPosition=numString[numString.length-1].length-1;

		 						if (formulaString[formulaString.length-1-1-signPosition]=='*'||formulaString[formulaString.length-1-1-signPosition]=='/'||formulaString[formulaString.length-1-1-signPosition]=='+') {
		 							formulaString.splice(formulaString.length-1-signPosition,1);
		 						}else{
									formulaString[formulaString.length-1-signPosition]='+';
		 						}
		 							
		 						
							}else{
								console.log(numString[numString.length-1]);
								var signPosition=numString[numString.length-1].length;
								
								if (formulaString[formulaString.length-1-signPosition]=='+') {
									formulaString[formulaString.length-1-signPosition]='-';
								}else{
									console.log("signPosition");
									console.log(formulaString.length-1-signPosition);
									formulaString.splice(formulaString.length-signPosition,0,'-');
								}
		 						
		 							

							}
		 						numString[numString.length-1]=parseFloat(numString[numString.length-1])*-1;
	 					}
 					 

	 					break;
	 				case '=': 
	 					
	 					var a=answer.innerHTML;
	 					if (a.length!=0) {
	 						formulaString=[];
		 					for (var i = 0; i < a.length; i++) {
		 						formulaString[i]=a[i];
		 					}
	 					}
	 					break;
	 				case '+':
	 				 	if (parseInt(formulaString[formulaString.length-1])<10&&parseInt(formulaString[formulaString.length-1])>-1) {
	 						 formulaString.push(this.innerHTML);
	 						
	 						  dotExist=false;
	 					}		
	 					break;
	 				case '-':
		 				if (formulaString[formulaString.length-1]!='-') {
	 						 formulaString.push(this.innerHTML);
	 						  dotExist=false;
	 					}
	 					
	 					break;
	 				case '*': 
	 					if (parseInt(formulaString[formulaString.length-1])<10&&parseInt(formulaString[formulaString.length-1])>-1) {
	 						 formulaString.push(this.innerHTML);
	 						
	 						  dotExist=false;
	 					}
	 					break;
	 				case '/': 
	 					if (parseInt(formulaString[formulaString.length-1])<10&&parseInt(formulaString[formulaString.length-1])>-1) {
	 						 formulaString.push(this.innerHTML);
	 						
	 						 dotExist=false;
	 					}
	 					break;
	 				case '.': 
	 					if ((parseInt(formulaString[formulaString.length-1])<10&&parseInt(formulaString[formulaString.length-1])>-1)&&!dotExist) {
	 						 
	 						 formulaString.push(this.innerHTML);
	 						 dotExist=true;
	 						 
	 					}
	 					break;
	 				default:
	 					
	 						formulaString.push(this.innerHTML);	
	 						
 				}

 				

			}




 				if (formulaString.length<17) {
 					formula.style.fontSize="25px";
 				}else if (formulaString.length<22) {
 					formula.style.fontSize="20px";

 				}else if (formulaString.length<28) {
 					formula.style.fontSize="15px";

 				}else{
 					formulaString.splice(formulaString.length-1,1);
 				}

 				analyzeNumAndSign();
 				formula.innerHTML=formulaString.join('');
 				//console.log(formulaString)

 	});
 }

//分析數字與符號
function analyzeNumAndSign(){

	var c;

	numString=[];
	signString=[];
	stringTmp=""

	for (var i = 0; i < formulaString.length; i++) {
		c=formulaString[i];

 		switch(c){

 				case '+':
 					//numString.push(stringTmp);
 					stringTmp="";
 					signString.push(c);
 					break;
 				case '-':
 					if (stringTmp=="") {
 						stringTmp=stringTmp+c; 
 					}else{
	 					//numString.push(stringTmp);
	 					stringTmp="";
	 					signString.push('+');
						stringTmp=stringTmp+c; 
					}
 					break;
 				case '*':
 					//numString.push(stringTmp); 
 					stringTmp="";
 					signString.push(c);

 					break;
 				case '/':
 					//numString.push(stringTmp); 
 					stringTmp="";
 					signString.push(c);
 					break;
 				default:
 					
	 				if (stringTmp=="") {
	 					stringTmp=stringTmp+c;
	 					numString.push(stringTmp);
	 					
					}else{
						
						if (stringTmp[0]!='-'||numString.length!=signString.length) {
							numString.pop();
						}

						stringTmp=stringTmp+c;
						numString.push(stringTmp);
					}
					
 				}
	
		}
		//console.log("f "+formulaString);
		console.log("n "+numString);
		console.log("s "+signString);
		
			numStringT=numString.slice(0,numString.length);
			signStringT=signString.slice(0,signString.length);
		

		analyzeAnswer();
 } 


 function analyzeAnswer(){

 	if (numStringT.length==signStringT.length) {
 		signStringT.pop();
 	}
	var count=0;

	do{
		count=0;
	 	for (var i = 0; i < signStringT.length; i++) {
	 		switch (signStringT[i]){

	 			case '*':
	 				numStringT[i]=parseFloat(numStringT[i])*parseFloat(numStringT[i+1]);
	 				numStringT.splice(i+1,1);
	 				signStringT.splice(i,1);
	 				break;
	 			case '/':
					numStringT[i]=parseFloat(numStringT[i])/parseFloat(numStringT[i+1]);
	 				signStringT.splice(i,1);
	 				numStringT.splice(i+1,1);
	 				break;
	 			default:
	 				count++;
	 		}
	 	}
	 }while(signStringT.length!=0&&count!=signStringT.length);
 ans=0;
	 for (var i = 0; i < numStringT.length; i++) {
	 	ans=ans+parseFloat(numStringT[i]);
	 }


	 if (formulaString.length==0) {
	 	answer.innerHTML="";
	 }else if (signString.length==0) {
	 	answer.innerHTML="";
	 }else{
		 answer.innerHTML=ans;
	 }

 }