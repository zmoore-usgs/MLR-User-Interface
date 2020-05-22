import axios from 'axios'

export default {
	getByDatesAndOptionalDistrictCode(startDate, endDate, districtCode) {

		//Build URL
		var axiosParams = new URLSearchParams();
		axiosParams.append('startDate', startDate);
		axiosParams.append('endDate', endDate);
		if (null !== districtCode) {
			axiosParams.append('districtCode', districtCode);
		}

		return axios.get("monitoringLocations/loggedTransactions", {
			params: axiosParams
		})
	}
}