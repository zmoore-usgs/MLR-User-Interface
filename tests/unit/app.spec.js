// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Components
import ExportReport from '@/components/ExportReport.vue'
import ValidateReport from '@/components/ValidateReport.vue'
import App from '@/App.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('App.vue', () => {
    let localVue;
    let vuetify;
    
    const mountFactory = function(args) {
        return mount(App, {
            localVue,
            vuetify,
            ...args
        });
    }
    const copySuccessResponse = {
            name: "Complete Export Workflow",
            inputFileName: null,
            reportDateTime: "2020-05-07T18:52:17.889Z",
            userName: "mlradmin",
            workflowSteps: [
                {
                    name: "Complete Export Workflow",
                    httpStatus: 200,
                    success: true,
                    details: "Transaction File created Successfully."
                },
                {
                    name: "Notification",
                    httpStatus: 200,
                    success: true,
                    details: "Notification sent successfully."
                }
            ],
            sites: [
                {
                    agencyCode: "USGS",
                    siteNumber: "04085498",
                    success: true,
                    steps: [
                        {
                            name: "Location Get by AgencyCode and SiteNumber",
                            httpStatus: 200,
                            success: true,
                            details: "Location Get Successful"
                        },
                        {
                            name: "Export Add Transaction File",
                            httpStatus: 200,
                            success: true,
                            details: "Transaction File created Successfully."
                        }
                    ]
                }
            ]
    };

    const exportSuccessReport = {
            exportWorkflowErrors: {
                name: "Export Workflow Errors",
                errors: []
            }
    }

    const copyErrorResponse = {
            name: "Complete Export Workflow",
            inputFileName: null,
            reportDateTime: "2020-05-07T20:07:45.627Z",
            userName: "mlradmin",
            workflowSteps: [
                {
                    name: "Complete Export Workflow",
                    httpStatus: 404,
                    success: false,
                    details: "{\"error_message\": \"Requested Location Not Found\"}"
                },
                {
                    name: "Notification",
                    httpStatus: 200,
                    success: true,
                    details: "Notification sent successfully."
                }
            ],
            sites: []
    }

    const exportErrorReport = {
        exportWorkflowErrors: {
            name: "Export Workflow Errors",
            errors: [
                {
                message: "Failed: Requested Location Not Found",
                name: "Complete Export Workflow"
                }
            ]
        }
}

    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('Renders the input fields and buttons', () => {
        const wrapper = mountFactory({});

        expect(wrapper.html()).toContain('Agency Code</label>');
        expect(wrapper.html()).toContain('Site Number</label>');
        expect(wrapper.html()).toContain('Select Ddot File to Upload</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Renders the report for successful Copy Location', async () => {
        const wrapper = mountFactory({});

        wrapper.setData({
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            snackbarShow: false
		});

        wrapper.vm.showExportReport(copySuccessResponse, exportSuccessReport);

        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(copySuccessResponse);
        expect(wrapper.vm.exportReport).toEqual(exportSuccessReport);
        expect(wrapper.contains(ExportReport)).toBe(true);
        expect(wrapper.contains(ValidateReport)).toBe(false);
    });

    it('Renders the report for failure Copy Location', async() => {
        const wrapper = mountFactory({});

        wrapper.setData({
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            snackbarShow: false
		});

        wrapper.vm.showExportReport(copyErrorResponse, exportErrorReport);

        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(copyErrorResponse);
        expect(wrapper.vm.exportReport).toEqual(exportErrorReport);
        expect(wrapper.contains(ExportReport)).toBe(true);
        expect(wrapper.contains(ValidateReport)).toBe(false);
    });

});
