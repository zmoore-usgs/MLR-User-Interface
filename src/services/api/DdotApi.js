import axios from 'axios'

export default {
	parseDdot(ddotFile) {
		return this.postDdot("util/parse", ddotFile);
	},
	uploadDdot(ddotFile) {
		return this.postDdot("workflows/ddots", ddotFile);
	},
	validateDdot(ddotFile) {
		return this.postDdot("workflows/ddots/validate", ddotFile);
	},
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