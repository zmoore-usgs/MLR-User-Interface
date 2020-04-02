import axios from 'axios'

export default {
	postDdot(url, ddotFile) {
		var ddotData = new FormData();
		ddotData.append("file", ddotFile);
		return axios.post(url, ddotData
		).then(response => {
			return response.data
		}).catch(error => {
			console.log(error);
		})
	}
}