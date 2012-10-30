<?php if(!defined('INCLUDE_CHECK') || $ajax == true) die('You are not allowed to execute this file directly'); ?>
<div id="mainholder">
	<div id="subholder">
		<div id="header">
			<a href="/" onClick="loadPage('main','static'); return false;"> <img style="border:0;" src="/static/img/btkrpxred2.png" alt="&lt;Bitkraken logo>"/></a>
		</div>
		<div id="mainbody"><?php require ($getcontent); ?>		
			<div id="footer" class="fade"><p style="font-weight:bold;color:#bcbcbc;">
				<?php 
			if ($name != "main") { echo '<a href="/" onClick="loadPage('."'main',"."'static'".'); return false;">Login</a>'; }
			if ($name != "about") { echo '<a href="/about" onClick="loadPage('."'about',"."'static'".'); return false;">About</a>'; }
			?>
			
			</p></div>
		</div>
	</div>
</div>
<?php
foreach ($footer_modules as $v1 => $v2) {
	if ($v1 == 'js') {
   		 foreach ($v2 as $v3) {
       			 echo "\n\t".'<script type="text/javascript" src="'.$v3.'"></script>';
   		}
   	}
	}
echo "\n"; 
?>