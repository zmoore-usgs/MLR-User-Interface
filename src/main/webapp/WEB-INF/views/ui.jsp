<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">
	<head>
		<!-- Load CSS -->
		<link rel="stylesheet" href="static/css/ui.css" />
		<link rel="stylesheet" href="static/css/usgs_style.css" />
		<link rel="stylesheet" href="static/bootstrap/css/bootstrap.min.css" />
	</head>
	<body>
		<title>Monitoring Location Registry</title>
		<jsp:include page="header.jsp"></jsp:include>
		<div class="mlr-container">
			<div class="mlr-content">
				<div>
					<h4 id="upload-header" class="ddot-header">Ddot File Upload</h4>
					<form name=ddotForm" id="ddotForm" method="POST" enctype="multipart/form-data">
						<label for="ddotFile">Select Ddot File to Upload</label>
						<input id="file" type="file" name="file" class="uploadDdotFile"><br>
						<input type="button" value="Validate Selected File" class="btn btn-xs btn-primary uploadDdotFile" onclick="validateDdot()">&nbsp;
						<input type="button" value="Update Records Using Selected File" class="btn btn-xs btn-primary uploadDdotFile" onclick="uploadDdot()">
					</form>
					<div id="ddot-response" style="display: none">
						<h4 id="response-header" class="ddot-header">Upload Response</h4>
						<div class="spinner-container">
							<span id="loading-spinner"></span>
						</div>
						<span id="response-text"></span>
					</div>
				</div>
				<br/>
			</div>
		</div>
		<jsp:include page="footer.jsp"></jsp:include>
		
		<!-- Load Variables -->
		<script type="text/javascript">
			var MLR_UI = {config: {}};
			MLR_UI.config.MLR_GATEWAY_HOST = "${MLR_GATEWAY_HOST}";
			MLR_UI.config.MLR_GATEWAY_PORT = "${MLR_GATEWAY_PORT}";
			MLR_UI.config.MLR_GATEWAY_UPLOAD_PATH  = "${MLR_GATEWAY_UPLOAD_PATH}";
			MLR_UI.config.MLR_GATEWAY_VALIDATE_PATH="${MLR_GATEWAY_VALIDATE_PATH}";
		</script>
		
		<!-- WebJars -->
		<script src="static/jquery/jquery.min.js"></script>
		<script src="static/bootstrap/js/bootstrap.min.js"></script>
				
		<!-- Application -->
		<script src="static/js/ui.js"></script>
	</body>
</html>