import axios from 'axios'

export default {
	postExport(agencyCode, siteNumber) {

		if (agencyCode !== null && agencyCode.length > 0 && siteNumber !== null && siteNumber.length > 0) {
			//Build URL
			var url = "legacy/location/" + agencyCode + "/" + siteNumber;

			return axios.post(url)
				.then(response => {
					return response.data
				}).catch(error => {
					return error
				})
		} else {
			//Snackbar notification here
		}

	}
}