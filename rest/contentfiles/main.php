<br/>
			<form name="prereg" action="" method="post">
						<label for="name">Username:</label>
							<input type="text" name="name" id="name" 
								onChange="validateName()" onkeypress="validateCheckpoint()" 
								placeholder="USERNAME HERE"
							/>
							<span ID="n" class="msg"></span>
						<label for="password">Password:</label>
							<input type="password" name="password" id="pass" 
								onChange="validateEmail()" onkeypress="validateCheckpoint()" 
								placeholder="WRITE IN PASSWORD" 
							/>
							<span ID="m" class="msg"></span>
						<input type="submit" value="Send" id="sendbtn" class="sndactive" onClick="sendForm(); return false;">
			</form>
<script type="text/javascript">
	var sndbtn = document.getElementById("sendbtn");
	sndbtn.className = "sndgrey";
</script>