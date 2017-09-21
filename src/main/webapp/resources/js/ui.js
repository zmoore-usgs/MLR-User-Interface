function generalSuccess (response) {
	$("#target :input").prop("disabled", false);
	//$('#loading-spinner').removeClass('spinner');
	//$('#response-text').text(JSON.stringify(response));
}

function generalError (response) {
	alert("Failed." + response.toString());
}

function postDdot(postPath, success, error) {
	//Build Upload URL
	var url = MLR_GATEWAY_HOST + ":" + MLR_GATEWAY_PORT;
	url += postPath.startsWith("/") ? postPath : "/" + postPath;
	
	//Grab File to Upload
	var documentData = new FormData($("#ddotForm")[0]);
	documentData.append('file', $('input[type=file]')[0].files[0]);
	
	//Adjust UI
	$("#target :input").prop("disabled", true);
	$('#ddotResponse').show();
	$('#loading-spinner').addClass('spinner');
	$('#response-text').text("");
	
	//Perform Upload
	$.ajax({
		url: url,
		type: 'POST',
		data: documentData,
		enctype: "multipart/form-data'",
		contentType: false,
		cache: false,
		processData: false,
		success: success,
		error: error
	});
}

function validateDdot() {
	postDdot(MLR_GATEWAY_VALIDATE_PATH, generalSuccess, generalSuccess)
}

function uploadDdot() {
	postDdot(MLR_GATEWAY_UPLOAD_PATH, generalSuccess, generalSuccess)
}