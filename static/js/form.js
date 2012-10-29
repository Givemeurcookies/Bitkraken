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
	var changed = false;
	var checkchange = validation[0];
	if (x==null || x=="" || x.length < 3 || hasWhiteSpace(x) == false) { validation[0] = false; Msgtxt[0] = "Ugyldig navn!";}
	else { validation[0] = true; Msgtxt[0] = "";}
	
	if (checkchange != validation[0]) changed = true;
	if (togfadeN === false && changed === true) { init(Msgname[0], TimeToFade, 0);}
	if (togfadeN === false && changed === true) {setTimeout(function(){fadeMsg("n",0)},TimeDelay);} else if (togfadeN === true) {fadeMsg("n",0)}
	togfadeN = false;
	if (changed === true) validateCheckpoint();
}
function validateEmail(){
	var x=document.forms["prereg"]["email"].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	var changed = false;
	var checkchange = validation[1];

	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){ validation[1] = false; Msgtxt[1] = "Ugyldig e-mail!"} 
	else { validation[1] = true; Msgtxt[1] = "";}
	
	if (checkchange != validation[1]) changed = true;
	if (togfadeM === false && changed === true) { init(Msgname[1], TimeToFade, 0);}
	if (togfadeM === false && changed === true) {setTimeout(function(){fadeMsg("m",1)},TimeDelay);} else if (togfadeM === true) {fadeMsg("m",1)}
	togfadeM = false;
	validateCheckpoint();
}
function fadeMsg(id, num) {
var x = document.getElementById(id);
var valid = validation[num];
if (valid === false) x.className = "msg error"; else x.className = "msg success";
x.innerHTML = Msgtxt[num];
init(Msgname[num], 150, 1);
}
function validateCheckpoint (){
//Checking the fullname
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
  			else loadPage("http://bitkraken.net/txt/success.txt", "");
    		}
  	});
 } else { console.log("Can't send, some fields are invalid!"); }
return false;
}