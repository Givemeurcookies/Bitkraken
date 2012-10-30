<?php
	define('INCLUDE_CHECK',true);
//Defines just the website path for now.
	require('rest/setupconfig.php');
//Get client URL
	$name = $_SERVER['REQUEST_URI'];
	//Sets the homepage name to /main, read wiki for more info.
	if ($name == $path) { $name = "/main"; }
	// Removes the '/' from the start of the name
	$name = substr($name, 1);
	//Sets up support for subfolders: example.com/subfolder/
	$name = str_replace(substr($path, 1), "", $name);
	
	$configfile = 'rest/configfiles/'.$name.'.php';
	$contentfile = 'rest/contentfiles/'.$name.'.php';
	require('rest/config.php');
	
//Checking if website has custom config or not.
	if ($config == true){
		require($configfile);
		$exist = true;
	}
	elseif ($content == true) {
	
		require('rest/config.php');
		$exist = true;
	}
//Else, file not found.
	else {
		require('rest/fourofourconfig.php');
	}
//
	if ($exist == true && $content == false)  {
		$getcontent = ('./content.php');
	} elseif ($exist == true && $content == true) { 
		$getcontent = './'.$contentfile;
	} else { 
		$getcontent = './rest/fourofourcontent.php';
	}
	
	if ($customout == true) { 
		if (file_exists ("templates/".$template)) {
			require ("templates/".$template);
		} elseif ($exist == true){
			echo 'Template file is incorrect or not defined';
		}
		exit();
	}
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' || substr($name, -5) == "?ajax") {
  	header('HTTP/1.1 200 OK');
  	$name = substr_replace($name ,"",-5);
  	$getcontent == "rest/contentfiles/ajax/".$name;
  	require ($getcontent);
  	exit();
	}
	if ($exist==true) header('HTTP/1.1 200 OK'); else header('HTTP/1.1 404 Not Found');
	if($headheader == true) { require('rest/header.php'); } 
?>
<body>
<?php 
	if (file_exists ("rest/templates/".$template)) {
		require ("rest/templates/".$template);
	} elseif ($exist == true){
		echo 'Template file is incorrect or not defined';
	}
?>
</body>
</html>