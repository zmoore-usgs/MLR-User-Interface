import axios from 'axios'

export default {
	postExport(agencyCode, siteNumber) {

		//Build URL
		var url = "legacy/location/" + agencyCode + "/" + siteNumber;

		return axios.post(url)
			.then(response => {
				return response
			}).catch(error => {
				return error
			})
	},

	postChange(oldAgencyCode, oldSiteNumber, newAgencyCode, newSiteNumber, reasonText) {

		//Build URL
		var url = "/workflows/primaryKey/update?oldAgencyCode=" + oldAgencyCode 
			+ "&newAgencyCode=" + newAgencyCode 
			+ "&oldSiteNumber=" + oldSiteNumber 
			+ "&newSiteNumber=" + newSiteNumber
			+ "&reasonText=" + reasonText;

		return axios.post(url)
			.then(response => {
				return response
			}).catch(error => {
				return error.response
			})

	}
}