// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Components
import UpdatePrimaryKeyReport from '@/components/UpdatePrimaryKeyReport.vue'
import StationChangePage from '@/views/StationChangePage.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('StationChangePage.vue', () => {
    let localVue;
    let vuetify;

    const mountFactory = function (args) {
        return mount(StationChangePage, {
            localVue,
            vuetify,
            ...args
        });
    }

    const stationChangeSuccessResponse = {
        data: {
            "name": "Site Agency Code and/or Site Number Update Workflow",
            "reportDateTime": "2020-05-14T14:51:15.110Z",
            "userName": "mlradmin",
            "workflowSteps": [],
            "sites": [],
            "numberSiteSuccess": 1,
            "numberSiteFailure": 0
        }
    }

    const stationChangeSuccessParsed = {
        workflowStatus: {
            message: "1 Transactions Succeeded, 0 Transactions Failed",
            name: "Status"
        }
    }

    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('Renders the input fields and buttons', () => {
        const $config = {STATION_CHANGE_ENABLED: "true"}
        const wrapper = mountFactory({
            mocks: {
                $config
              }
        });

        expect(wrapper.html()).toContain('Agency Code</label>');
        expect(wrapper.html()).toContain('Site Number</label>');
        expect(wrapper.html()).toContain('New Agency Code</label>');
        expect(wrapper.html()).toContain('New Site Number</label>');
        expect(wrapper.html()).toContain('Reason for change</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Renders the report for successful Station Change', async () => {
        const $config = {STATION_CHANGE_ENABLED: "true"}
        const wrapper = mountFactory({
            mocks: {
                $config
              }
        });

        wrapper.setData({
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            updatePrimaryKeyReport: null
        });

        wrapper.vm.setReportData("updatePrimaryKeyReport", stationChangeSuccessResponse, stationChangeSuccessParsed);

        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(stationChangeSuccessResponse);
        expect(wrapper.vm.updatePrimaryKeyReport).toEqual(stationChangeSuccessParsed);
        expect(wrapper.contains(UpdatePrimaryKeyReport)).toBe(true);
        expect(wrapper.html()).toContain('<div><p>Status: 1 Transactions Succeeded, 0 Transactions Failed</p>');
    });

});
