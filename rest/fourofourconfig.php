<?php
//Config elements
$exist = false;
if (file_exists ($contentfile)) { $content = true; } else { $content = false; }
if (file_exists ($configfile)) { $config = true; } else { $config = false; }
//template
$template = 'btkr.php';
//Header content
$website_title = '404 - Not found';
$header_modules = array(
"cs" => array(
'http://static.bitkraken.net/static/css/main.css')
);
//Body
	//Header
	$header = true;
	$header = '';
		//Title
		$title = '(。ワ°)';
		$slogan = '404 - Nothing to see here';
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