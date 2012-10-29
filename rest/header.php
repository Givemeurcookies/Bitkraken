<!DOCTYPE html> 
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<title><?php echo $website_title; ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="http://static.bitkraken.net/img/favicon.ico">
	<META NAME="Description" CONTENT="Vi står for og arrangere LAN for Norske IT-Geeks, all hail our monkey overlords"/>
<?php 
	foreach ($header_modules as $v1 => $v2) {
	if ($v1 == 'cs') {
   	   		 foreach ($v2 as $v3) {
       			 echo "\n\t".'<link rel="stylesheet" type="text/css" href="'.$v3.'"/>';
   		}
   	} if ($v1 == 'js') {
   		 foreach ($v2 as $v3) {
       			 echo "\n\t".'<script type="text/javascript" src="'.$v3.'"></script>';
   		}
   	}
	}
	echo "\n";
?>
</head>