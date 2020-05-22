// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Components
import ExportReport from '@/components/ExportReport.vue'
import ValidateReport from '@/components/ValidateReport.vue'
import UpdatePrimaryKeyReport from '@/components/UpdatePrimaryKeyReport.vue'
import SiteManagementPage from '@/views/SiteManagementPage.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('SiteManagementPage.vue', () => {
    let localVue;
    let vuetify;

    const mountFactory = function (args) {
        return mount(SiteManagementPage, {
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

    const validateSuccessResponse = {
        data: {
            name: "Validate D dot File",
            inputFileName: "d.cabuchwa_good.011",
            reportDateTime: "2020-05-08T17:40:54.241Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [],
            numberSiteSuccess: 2,
            numberSiteFailure: 0
        }
    }

    const validateSuccessParsed = {
        workflowStatus: {
            message: "2 Transactions Succeeded, 0 Transactions Failed",
            name: "Status"
        }
    }

    const validateFatalErrorResponse = {
        data: {
            name: "Validate D dot File",
            inputFileName: "d.cabuchwaBadFatalValidation.011",
            reportDateTime: "2020-05-08T18:22:00.455Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "USGS ",
                    siteNumber: "432356088153001",
                    transactionType: "A",
                    success: false,
                    steps: [
                        {
                            name: "Validate",
                            httpStatus: 400,
                            success: false,
                            details: "{\"validator_message\": {\"fatal_error_message\": {\"latitude\": [\"Latitude is out of range for state 54\"], \"longitude\": [\"Longitude is out of range for state 54\"]}}\n}"
                        },
                        {
                            name: "Validate Single D dot Transaction",
                            httpStatus: 400,
                            success: false,
                            details: "{\"error_message\":\"Transaction validation failed.\"}"
                        }
                    ]
                }
            ],
            numberSiteSuccess: 0,
            numberSiteFailure: 1
        }
    }

    const validateFatalErrorParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Validate Fatal Error: latitude - Latitude is out of range for state 54",
                    name: "USGS-432356088153001"
                },
                {
                    message: "Validate Fatal Error: longitude - Longitude is out of range for state 54",
                    name: "USGS-432356088153001"
                },
                {
                    message: "Validate Single D dot Transaction Fatal Error: Transaction validation failed.",
                    name: "USGS-432356088153001"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "0 Transactions Succeeded, 1 Transactions Failed",
            name: "Status"
        }
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

    it('Renders the input fields and buttons when the Station Change functionality is toggled on', () => {
        const $config = {STATION_CHANGE_ENABLED: "true"}
        const wrapper = mountFactory({
            mocks: {
                $config
              }
        });

        expect(wrapper.html()).toContain('Agency Code</label>');
        expect(wrapper.html()).toContain('Site Number</label>');
        expect(wrapper.html()).toContain('Select Ddot File to Upload</label>');
        expect(wrapper.html()).toContain('New Agency Code</label>');
        expect(wrapper.html()).toContain('New Site Number</label>');
        expect(wrapper.html()).toContain('Reason for change</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Renders the input fields and buttons when the Station Change functionality is toggled off', () => {
        const $config = {STATION_CHANGE_ENABLED: "false"}
        const wrapper = mountFactory({
            mocks: {
                $config
              }
        });

        expect(wrapper.html()).toContain('Agency Code</label>');
        expect(wrapper.html()).toContain('Site Number</label>');
        expect(wrapper.html()).toContain('Select Ddot File to Upload</label>');
        expect(wrapper.html()).not.toContain('New Agency Code</label>');
        expect(wrapper.html()).not.toContain('New Site Number</label>');
        expect(wrapper.html()).not.toContain('Reason for change</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Renders the report for successful Copy Location', async () => {
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

        wrapper.vm.setReportData("exportReport", copySuccessResponse, exportSuccessReport);

        await Vue.nextTick();
        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(copySuccessResponse);
        expect(wrapper.vm.exportReport).toEqual(exportSuccessReport);
        expect(wrapper.contains(ExportReport)).toBe(true);
        expect(wrapper.contains(ValidateReport)).toBe(false);
        expect(wrapper.contains(UpdatePrimaryKeyReport)).toBe(false);
        expect(wrapper.html()).toContain('<span>Copy Success</span>');
    });

    it('Renders the report for failure Copy Location', async () => {
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

        wrapper.vm.setReportData("exportReport", copyErrorResponse, exportErrorReport);

        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(copyErrorResponse);
        expect(wrapper.vm.exportReport).toEqual(exportErrorReport);
        expect(wrapper.contains(ExportReport)).toBe(true);
        expect(wrapper.contains(ValidateReport)).toBe(false);
        expect(wrapper.contains(UpdatePrimaryKeyReport)).toBe(false);
        expect(wrapper.html()).toContain('Complete Export Workflow Failed: Requested Location Not Found</div>');
    });

    it('Renders the report for successful Validate', async () => {
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

        wrapper.vm.setReportData("validateReport", validateSuccessResponse, validateSuccessParsed);

        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(validateSuccessResponse);
        expect(wrapper.vm.validateReport).toEqual(validateSuccessParsed);
        expect(wrapper.contains(ExportReport)).toBe(false);
        expect(wrapper.contains(ValidateReport)).toBe(true);
        expect(wrapper.contains(UpdatePrimaryKeyReport)).toBe(false);
        expect(wrapper.html()).toContain('<p>Status: 2 Transactions Succeeded, 0 Transactions Failed</p>');
    });

    it('Renders the report for validation failure', async () => {
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

        wrapper.vm.setReportData("validateReport", validateFatalErrorResponse, validateFatalErrorParsed);

        await Vue.nextTick();

        expect(wrapper.vm.responseData).toEqual(validateFatalErrorResponse);
        expect(wrapper.vm.validateReport).toEqual(validateFatalErrorParsed);
        expect(wrapper.contains(ExportReport)).toBe(false);
        expect(wrapper.contains(ValidateReport)).toBe(true);
        expect(wrapper.contains(UpdatePrimaryKeyReport)).toBe(false);
        expect(wrapper.html()).toContain('USGS-432356088153001 Validate Fatal Error: latitude - Latitude is out of range for state 54</div>');
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
        expect(wrapper.contains(ExportReport)).toBe(false);
        expect(wrapper.contains(ValidateReport)).toBe(false);
        expect(wrapper.html()).toContain('<div><p>Status: 1 Transactions Succeeded, 0 Transactions Failed</p>');
    });

});
