<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">
	<head>
		<script src="static/jquery/jquery.min.js"></script>
		<script type="text/javascript">
			function upload() {
				var documentData = new FormData();
				documentData.append('file', $('input#ddotFile.uploadDdotFile')[0].files[0]);
				$.ajax({
					url: "${mlrGatewayHost}:${mlrGatewayPort}${mlrGatewayUploadPath}",
					type: 'POST',
					data: documentData,
					cache: false,
					contentType: "multipart/form-data",
					processData: false,
					success: function (response) {
						alert("Document uploaded successfully.");
					},
					error: function(response) {
						alert("Failed." + response);
					}
				});
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
				<br/>
				<input type="button" value="Upload Selected File" class="btn btn-xs btn-primary uploadDdotFile"  onClick="upload()">
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