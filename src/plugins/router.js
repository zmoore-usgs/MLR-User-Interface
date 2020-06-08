import Vue from 'vue'
import Router from 'vue-router'
import SiteManagementPage from '@/views/SiteManagementPage.vue'
import StationChangePage from '@/views/StationChangePage.vue'
import AuditTablePage from "@/views/AuditTablePage.vue"

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/sites',
			name: 'sites',
			component: SiteManagementPage
		},
		{
			path: '/stationChange',
			name: 'stationChange',
			component: StationChangePage
		},
		{
			path: '/auditTable',
			name: 'auditTable',
			component: AuditTablePage
		}
	]
})