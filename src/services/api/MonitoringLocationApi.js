import axios from 'axios'

export default {
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