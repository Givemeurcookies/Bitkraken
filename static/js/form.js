var acceptForm = false;
var formresponse;
var validation = new Array;
var togfadeN = true;
var togfadeM = true;
var Msgtxt = new Array;
var Msgname = new Array(['n'],['m']);
console.log(Msgname[1]);
function validateName (){
	var x=document.forms["prereg"]["name"].value;
	if (x==null || x=="" || x.length < 3 || hasWhiteSpace(x) == false) return false;
	else return true;
}
//Validate email is not needed right now. 
function validateEmail(){
	var x=document.forms["prereg"]["email"].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){ validation[1] = false; Msgtxt[1] = "Incorrect Email!"} 
	else { validation[1] = true; Msgtxt[1] = "";}
	
	if (checkchange != validation[1]) changed = true;
	if (togfadeM === false && changed === true) { init(Msgname[1], TimeToFade, 0);}
	if (togfadeM === false && changed === true) {setTimeout(function(){fadeMsg("m",1)},TimeDelay);} else if (togfadeM === true) {fadeMsg("m",1)}
	togfadeM = false;
	validateCheckpoint();
}
//This function is needed
function validatePassword(){

}
function fadeMsg(id, num) {
var x = document.getElementById(id);
var valid = validation[num];
if (valid === false) x.className = "msg error"; else x.className = "msg success";
x.innerHTML = Msgtxt[num];
init(Msgname[num], 150, 1);
}
function validateCheckpoint (){
	//Need to rewrite so functions return boolean, so there is no need for variables.
	if (validation[0] === true && validation[1] === true) { 
	acceptForm = true; 
	console.log("All fields are valid!");
	sndbtn.className = "sndactive";
	} else { 
	acceptForm = false;
	sndbtn.className = "sndgrey";
	}
}
function sendForm() {
validateName();
validateEmail();
validateCheckpoint();
if (acceptForm === true) {
	console.log("Sent!");
	var data="Name="+document.forms["prereg"]["name"].value+"&Email="+document.forms["prereg"]["email"].value;
	loadData("/secure/prereg.php","POST",data,function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
  			response = xmlhttp.responseText;
  			if (response != "OK") { }
  			else loadPage("/txt/success.txt", "");
    		}
  	});
 } else { console.log("Can't send, some fields are invalid!"); }
return false;
}