import axios from 'axios'

export default {
	getByAgencyCodeAndSiteNumber(agencyCode, siteNumber) {

		//Build URL
		var axiosParams = new URLSearchParams();
		axiosParams.append('agencyCode', agencyCode);
		axiosParams.append('siteNumber', siteNumber);

		return axios.get("monitoringLocations/loggedTransactions", {
			params: axiosParams
		})
	},
	getByDatesAndOptionalDistrictCodes(startDate, endDate, districtCodes) {

		//Build URL
		var axiosParams = new URLSearchParams();
		axiosParams.append('startDate', startDate);
		axiosParams.append('endDate', endDate);
		if (null !== districtCodes) {
			axiosParams.append('districtCodes', districtCodes);
		}

		return axios.get("monitoringLocations/loggedTransactions", {
			params: axiosParams
		})
	}
}