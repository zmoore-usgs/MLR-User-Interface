import axios from 'axios'

export default {
	getByAgencyCodeAndSiteNumber(agencyCode, siteNumber) {

		//Build URL
		var axiosParams = new URLSearchParams();
		axiosParams.append('agencyCode', agencyCode);
		axiosParams.append('siteNumber', siteNumber);

		return this.getMonitoringLocation(axiosParams);
	},
	getByDatesAndOptionalDistrictCodes(startDate, endDate, districtCodes) {

		//Build URL
		var axiosParams = new URLSearchParams();
		axiosParams.append('startDate', startDate);
		axiosParams.append('endDate', endDate);
		if (null !== districtCodes) {
			axiosParams.append('districtCodes', districtCodes);
		}

		return axios.get("monitoringLocations", {
			params: axiosParams
		})
		// .then(response => {
		// 	return response
		// }).catch(error => {
		// 	return error
		// })

		// return this.getMonitoringLocation(axiosParams);
	},
	getMonitoringLocation(axiosParams) {
		return axios.get("monitoringLocations", {
			params: axiosParams
		})
			.then(response => {
				return response
			}).catch(error => {
				return error
			})
	}
}