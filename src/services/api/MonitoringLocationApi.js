import axios from 'axios'

export default {
	getLoggedTransactionsCount(criteria) {

		//Build URL
		var axiosParams = new URLSearchParams();
		
		if(null !== criteria) {
			Object.keys(criteria).forEach(function(key) {
				if(criteria[key] && !criteria[key].toString().length == 0) {
					axiosParams.append(key, criteria[key]);
				}
			});
		}

		return axios.get("monitoringLocations/loggedTransactions/count", {
			params: axiosParams
		})
	},
	getLoggedTransactions(criteria, pageSize, pageNum, sortBy, sortDir) {

		//Build URL
		var axiosParams = new URLSearchParams();
		axiosParams.append('pageSize', pageSize);
		axiosParams.append('pageNum', pageNum);

		if(sortBy) {
			axiosParams.append('sortBy', sortBy);
		}
		if(sortDir) {
			axiosParams.append('sortDir', sortDir);
		}
		
		if(null !== criteria) {
			Object.keys(criteria).forEach(function(key) {
				if(criteria[key] && !criteria[key].toString().length == 0) {
					axiosParams.append(key, criteria[key]);
				}
			});
		}

		return axios.get("monitoringLocations/loggedTransactions", {
			params: axiosParams
		})
	}
}