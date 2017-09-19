<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">
	<head>
		<script src="static/jquery/jquery.min.js"></script>
		<script type="text/javascript">			
			function generalSuccess (response) {
				alert("Success:" + response.toString());
			}
			
			function generalError (response) {
				alert("Failed." + response.toString());
			}
			
			function postDdot(postPath, success, error) {
				var documentData = new FormData();
				documentData.append('file', $('input#ddotFile.uploadDdotFile')[0].files[0]);
				var url = "${mlrGatewayHost}" + ":" + "${mlrGatewayPort}";
				url += postPath.startsWith("/") ? postPath : "/" + postPath;
				$.ajax({
					url: url,
					type: 'POST',
					data: documentData,
					contentType: false,
					cache: false,
					processData: false,
					success: success,
					error: error
				});
			}
			
			function validateDdot() {
				postDdot("${mlrGatewayValidatePath}", generalSuccess, generalError)
			}
			
			function uploadDdot() {
				postDdot("${mlrGatewayUploadPath}", generalSuccess, generalError)
			}
		</script>
	</head>
	<body>
		<title>Monitoring Location Registry</title>
		<div>
			<h1>Monitoring Location Registry</h1>
			<div>
				<h2>Ddot File Upload</h2>
				<label for="ddotFile">Select Ddot File to Upload</label>
				<input id="ddotFile" type="file" class="uploadDdotFile">
				<br><br>
				<input type="button" value="Validate Selected File" class="btn btn-xs btn-primary uploadDdotFile" onclick="validateDdot()">&nbsp;
				<input type="button" value="Update Records Using Selected File" class="btn btn-xs btn-primary uploadDdotFile" onclick="uploadDdot()">
			</div>
			<br/>
			<br/>
			<div style="visibility: hidden;">
				<h2>Monitoring Location Export</h2>
				<label for="exportSiteNumber">Site Number</label>
				<input id="exportSiteNumber" type="text" class="exportSiteText">
				<br/>
				<label for="exportSiteAgencyCode">Agency Code</label>
				<input id="exportSiteAgencyCode" type="text" class="exportSiteText">
				<br/>
				<input type="button" value="Export" class="btn btn-xs btn-primary uploadDdotFile">
			</div>
		</div>
	</body>
</html>