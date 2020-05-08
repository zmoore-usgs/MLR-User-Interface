import axios from 'axios'

export default {
	postExport(agencyCode, siteNumber) {

		//Build URL
		var url = "legacy/location/" + agencyCode + "/" + siteNumber;

		return axios.post(url)
			.then(response => {
				return response
			}).catch(error => {
				return error.response
			})

	}
}