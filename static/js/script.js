//
// Created by Ramen, in the long time ago.
//

console.log("initialized the script!");
// Variables
var TimeToFade = 100.0;
var TimeDelay = TimeToFade+25;
var xmlhttp;
var pageresponse = "Something went wrong!";
var idmaincontent = ['mainbody'];
var saveDocument;
var formed = false;
var curl = new Array;
// AJAX functions
function loadData(url,format,data,cfunc){
	if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
	else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange=cfunc;
	if (format === "GET") { xmlhttp.open(format,url+data,true);  xmlhttp.send(); }
	else if (format === "POST") { 
	xmlhttp.open(format,url,true); 
	//Send the proper header information along with the request
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", data.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(data); }
}
function loadPage(url,data){
	init(idmaincontent, TimeToFade, 0);
	curl[0] = "/"+url;
	curl[1] = url.capitalize()+" - Bitkraken";
	if (data === 'static') { url = '/txt/'+url+'.txt'; data = ''; }
	console.log("Data:"+data+"; Trying to get from URL: "+url);
	loadData(url,"GET",data,function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
  			if (curl[0] === "/main") { curl[0] = "/"; curl[1] = "Bitkraken"; if (formed === false){ loadJS("form.js"); formed = true; }}
  			pageresponse = xmlhttp.responseText;
  			if (window.location.pathname != curl[0]) window.history.pushState({"txt":pageresponse,"pageTitle":curl[1]},"", curl[0]);
  			saveDocument = document.getElementById("mainbody").innerHTML;
  			document.title = curl[1];
  			setTimeout(addtoPage, TimeDelay)
    		}
  	});
}
function loadJS(url) {
  url = "/static/min/"+url;
  var oHead = document.getElementsByTagName('HEAD').item(0);
  var oScript= document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src=url;
  oHead.appendChild( oScript);
  console.log("Loaded JS file: "+url);
}
function backPage() {
init(idmaincontent, TimeToFade, 1);
pageresponse = saveDocument;
setTimeout(addtoPage, TimeDelay)
}
function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}
function waitFade(itemtofade) {
init(itemtofade, TimeToFade, 1);
}
function addtoPage(){
	document.getElementById("mainbody").innerHTML = pageresponse;
    	init(idmaincontent, TimeToFade, 1);
}
//
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

window.onpopstate = function(e){
    if(e.state){
      fade('mainbody');
    	pageresponse = e.state.txt;
    	document.title = e.state.pageTitle;
    	setTimeout(addtoPage, TimeDelay)
    }
};

//Fade functions
//declare our class so we can use the "new" keyword to create multiple instances
var animateFade = function(elmOrElmId, duration, state) {
        this.setOptions(elmOrElmId, duration, state);
};

//prototype its helper functions
animateFade.prototype = {
       
        setOptions: function(elmOrElmId, duration, state) {
               
                //set options
                this.fadeDuration = duration;
                this.element = (typeof elmOrElmId == 'string') ? document.getElementById(elmOrElmId) : elmOrElmId;
                this.fadeState = (state && state == 1) ? 1 : -1;//default -1 fade out, 1 fade in
                this.fadeTimeLeft = duration;//preset to passed duration, then overwrite
                this.lastTick = this.newTick();
               
                //start animation
                this.animate();
        },
       
        newTick: function() {
                return new Date().getTime();
        },
       
        returnElapsedTicks: function() {
                return this.currentTick - this.lastTick;
        },
       
        animate: function() {
               
                this.currentTick = this.newTick();
               
                var self = this;
                var elapsedTicks = this.returnElapsedTicks();
               
                //helper function, called in the timeout below, to recurse while maintaining correct reference of "this"
                var helper = function() {
                        self.animate();
                };
               
                if (this.fadeTimeLeft <= elapsedTicks) {
                        this.element.style.opacity = (this.fadeState == -1) ? 0 : 1;
                        this.element.style.filter = 'alpha(opacity = ' + (this.fadeState == -1) ? 0 : 100 + ')';
                        return;
                }
               
                this.fadeTimeLeft -= elapsedTicks;
               
                var newOptVal = this.fadeTimeLeft / this.fadeDuration;
               
                newOptVal = (this.fadeState == -1) ? newOptVal : (1 - newOptVal);
               
                this.element.style.opacity = newOptVal;
                this.element.style.filter = 'alpha(opacity = ' + (newOptVal * 100) + ')';
               
                this.lastTick = this.currentTick;
                this.currentTick = this.newTick();
               
                setTimeout(helper, 33);
        }
};

//initialize function
var init = function(elmsOrElmIdArr, duration, state) {
        for (var i = 0, l = elmsOrElmIdArr.length; i < l; i++) {
                //use "new" keyword to create separate instances
                new animateFade(elmsOrElmIdArr[i], duration, state);
        }
};