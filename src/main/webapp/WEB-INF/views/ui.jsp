<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">
	<head>
		<!-- Load Variables -->
		<script type="text/javascript">
			var MLR_GATEWAY_HOST = "${MLR_GATEWAY_HOST}";
			var MLR_GATEWAY_PORT = "${MLR_GATEWAY_PORT}";
			var MLR_GATEWAY_UPLOAD_PATH  = "${MLR_GATEWAY_UPLOAD_PATH}";
			var MLR_GATEWAY_VALIDATE_PATH="${MLR_GATEWAY_VALIDATE_PATH}";
		</script>
		
		<!-- WebJars -->
		<script src="static/jquery/jquery.min.js"></script>
		<script src="static/bootstrap/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="static/bootstrap/css/bootstrap.min.css" />
		
		<!-- Application -->
		<script src="static/js/ui.js"></script>
		<link rel="stylesheet" href="static/css/ui.css" />
	</head>
	<body>
		<title>Monitoring Location Registry</title>
		<div class="mlr-container">
			<h1>Monitoring Location Registry</h1>
			<div>
				<h2>Ddot File Upload</h2>
				<form name=ddotForm" id="ddotForm" method="POST" enctype="multipart/form-data">
					<label for="ddotFile">Select Ddot File to Upload</label>
					<input id="file" type="file" name="file" class="uploadDdotFile"><br>
					<input type="button" value="Validate Selected File" class="btn btn-xs btn-primary uploadDdotFile" onclick="validateDdot()">&nbsp;
					<input type="button" value="Update Records Using Selected File" class="btn btn-xs btn-primary uploadDdotFile" onclick="uploadDdot()">
				</form>
				<div id="ddotResponse" style="display: none">
					<h3>Upload Response</h3>
					<div class="spinner-container">
						<span id="loading-spinner"></span>
					</div>
					<span id="response-text"></span>
				</div>
			</div>
			<br/>
		</div>
	</body>
</html>