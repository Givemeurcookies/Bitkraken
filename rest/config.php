<?php
//Config elements
$exist = false;
$customout = false;
if (file_exists ($contentfile)) { $content = true; } else { $content = false; }
if (file_exists ($configfile)) { $config = true; } else { $config = false; }
//template
$template = 'btkr.php';
//Header content
$headheader = true;
$website_title = ucfirst($name).' - Bitkraken';
$header_modules = array(
"cs" => array(
'http://localhost/static/css/main.css')
//"js" => array(
//'http://static.bitkraken.net/min/f=js/script.js')
);
$footer_modules = array(
"js" => array(
'http://localhost/static/js/script.js'
)
);
//Body
	//Header
	$header = true;
	$header = '';
		//Title
		$title = 'Minecraft Weekly';
		$slogan = 'Fight for honor and allies!';
		//Menu
		$menu = true;
		$searchfield = true;
	//Body Content
		//Sidebar
		$sidebar = true;
			//Sidebar Modules
			$smodules[0] = null;
	//Footer
	$footer = true;
?>