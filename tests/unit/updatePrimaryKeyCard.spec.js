// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Mocks
// See - https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b
import { postChange } from "@/services/api/LegacyLocationApi";
jest.mock('@/services/api/LegacyLocationApi', () => ({
    postChange: jest.fn()
}))

// Components
import UpdatePrimaryKeyCard from '@/components/UpdatePrimaryKeyCard.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('UpdatePrimaryKeyCard.vue', () => {
    let localVue;
    let vuetify;

    const app = document.createElement ("div");
    app.setAttribute ("data-app", true);
    document.body.append (app);
    
    const mountFactory = function(args) {
        return mount(UpdatePrimaryKeyCard, {
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

    const stationChangeErrorNotFoundResponse = {
        data: {
            "name": "Site Agency Code and/or Site Number Update Workflow",
            "reportDateTime": "2020-05-14T15:14:52.022Z",
            "userName": "mlradmin",
            "workflowSteps": [],
            "sites": [
                {
                    "agencyCode": "USGS",
                    "siteNumber": "234",
                    "transactionType": "M",
                    "success": false,
                    "steps": [
                        {
                            "name": "Location Get by AgencyCode and SiteNumber",
                            "httpStatus": 404,
                            "success": false,
                            "details": "{\"error_message\": \"Requested Location Not Found\"}"
                        },
                        {
                            "name": "Update Agency Code and/or Site Number",
                            "httpStatus": 404,
                            "success": false,
                            "details": "{\"error_message\": \"Requested Location Not Found\"}"
                        }
                    ]
                }
            ],
            "numberSiteSuccess": 0,
            "numberSiteFailure": 1
        }
    }

    const stationChangeFatalErrorResponse = {
        data: {
            name: "Site Agency Code and/or Site Number Update Workflow",
            reportDateTime: "2020-05-15T12:08:31.494Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "BLAH",
                    siteNumber: "040851375",
                    transactionType: "M",
                    success: false,
                    steps: [
                        {
                            name: "Validate",
                            httpStatus: 400,
                            success: false,
                            details: "{\"validator_message\": {\"fatal_error_message\": {\"agencyCode\": [\" 'BLAH' is not in reference list\"]}}\n}"
                        },
                        {
                            name: "Update Agency Code and/or Site Number",
                            httpStatus: 400,
                            success: false,
                            details: "{\"error_message\":\"Transaction validation failed.\"}"
                        }
                    ]
                }
            ],
            numberSiteSuccess: 1,
            numberSiteFailure: 1
        }
    }

    const stationChangeNoCruServiceErrorResponse = {
       data: {
        name: "Site Agency Code and/or Site Number Update Workflow",
        reportDateTime: "2020-05-15T12:28:01.319Z",
        userName: "mlradmin",
        workflowSteps: [],
        sites: [
          {
            agencyCode: "USGS",
            siteNumber: "534534",
            transactionType: "M",
            success: false,
            steps: [
              {
                name: "Update Agency Code and/or Site Number",
                httpStatus: 500,
                success: false,
                details: "{\"error_message\": \"LegacyCruClient#getMonitoringLocation(String,String) failed and no fallback available.\"}"
              }
            ]
          }
        ],
        numberSiteSuccess: 0,
        numberSiteFailure: 1
      }
    }

    const stationChangeNoExportServiceErrorResponse = {
        data: {
            name: "Site Agency Code and/or Site Number Update Workflow",
            reportDateTime: "2020-05-15T12:50:55.369Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
              {
                agencyCode: "USGS",
                siteNumber: "040851373",
                transactionType: "M",
                success: false,
                steps: [
                  {
                    name: "Export Change Transaction File",
                    httpStatus: 500,
                    success: false,
                    details: "{\"error_message\":\"FileExportClient#exportChange(String) failed and no fallback available..  This error requires manual intervention to resolve. Please contact the support team for assistance.\"}"
                  },
                  {
                    name: "Update Agency Code and/or Site Number",
                    httpStatus: 500,
                    success: false,
                    details: "{\"error_message\":\"FileExportClient#exportChange(String) failed and no fallback available.. This error requires manual intervention to resolve. Please contact the support team for assistance.\"}"
                  }
                ]
              }
            ],
            numberSiteSuccess: 1,
            numberSiteFailure: 1
          }
        }
    
    const stationChangeNoNotificationServiceErrorResponse = {
        data: {
            name: "Site Agency Code and/or Site Number Update Workflow",
            reportDateTime: "2020-05-15T13:06:14.307Z",
            userName: "mlradmin",
            workflowSteps: [
              {
                name: "Notification",
                httpStatus: 500,
                success: false,
                details: "{\"error_message\": \"Notification failed to send.\"}"
              }
            ],
            sites: [],
            numberSiteSuccess: 2,
            numberSiteFailure: 0
          }
    }

    const stationChangeDuplicateStationErrorResponse = {
        data: {
            name: "Site Agency Code and/or Site Number Update Workflow",
            reportDateTime: "2020-05-15T13:51:13.716Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "USGS",
                    siteNumber: "04087098",
                    transactionType: "M",
                    success: false,
                    steps: [
                        {
                            name: "Validate Duplicate Monitoring Location Name",
                            httpStatus: 400,
                            success: false,
                            details: "{\"error_message\": \"{\\\"validation_errors\\\":{\\\"duplicate_site\\\":\\\"Duplicate Agency Code and Site Number found in MLR.\\\"}}\"}"
                        },
                        {
                            name: "Update Agency Code and/or Site Number",
                            httpStatus: 400,
                            success: false,
                            details: "{\"error_message\":\"Transaction validation failed.\"}"
                        }
                    ]
                }
            ],
            numberSiteSuccess: 1,
            numberSiteFailure: 1
        }
    }

    const stationChangeInternalServerErrorResponse = {
        data: {
            error_message: "Something bad happened. Contact us with Reference Number: 341013512"
        }
    }

    const stationChangeSuccessParsed = {
        workflowStatus: {
            message: "1 Transactions Succeeded, 0 Transactions Failed",
            name: "Status"
        }
    }

    const stationChangeErrorNotFoundParsed = {
            siteErrors: {
                errors: [
                    {
                        message: "Location Get by AgencyCode and SiteNumber Fatal Error: Requested Location Not Found",
                        name: "USGS-234"
                    },
                    {
                        message: "Update Agency Code and/or Site Number Fatal Error: Requested Location Not Found",
                        name: "USGS-234"
                    }
                ],
                name: "Site-level Errors and Warnings"
            },
            workflowStatus: {
                message: "0 Transactions Succeeded, 1 Transactions Failed",
                name: "Status"
            }
    }

    const stationChangeFatalErrorParsed = {
            siteErrors: {
                errors: [
                    {
                        message: "Validate Fatal Error: agencyCode -  'BLAH' is not in reference list",
                        name: "BLAH-040851375"
                    },
                    {
                        message: "Update Agency Code and/or Site Number Fatal Error: Transaction validation failed.",
                        name: "BLAH-040851375"
                    }
                ],
                name: "Site-level Errors and Warnings"
            },
            workflowStatus: {
                message: "1 Transactions Succeeded, 1 Transactions Failed",
                name: "Status"
            }
    }

    const stationChangeNoCruServiceErrorParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Update Agency Code and/or Site Number Fatal Error: LegacyCruClient#getMonitoringLocation(String,String) failed and no fallback available.",
                    name: "USGS-534534"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "0 Transactions Succeeded, 1 Transactions Failed",
            name: "Status"
        }
    }

    const stationChangeNoExportServiceErrorParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Export Change Transaction File Fatal Error: FileExportClient#exportChange(String) failed and no fallback available..  This error requires manual intervention to resolve. Please contact the support team for assistance.",
                    name: "USGS-040851373"
                },
                {
                    message: "Update Agency Code and/or Site Number Fatal Error: FileExportClient#exportChange(String) failed and no fallback available.. This error requires manual intervention to resolve. Please contact the support team for assistance.",
                    name: "USGS-040851373"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "1 Transactions Succeeded, 1 Transactions Failed",
            name: "Status"
        }
    }

    const stationChangeNoNotificationServiceErrorParsed = {
        workflowLevelErrors: {
            errors: [
                {
                    message: "Notification failed to send.",
                    name: "Notification"
                }
            ],
            name: "Workflow-level Errors"
        },
        workflowStatus: {
            message: "2 Transactions Succeeded, 0 Transactions Failed",
            name: "Status"
        }
    }

    const stationChangeDuplicateStationErrorParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Validate Duplicate Monitoring Location Name Fatal Error: duplicate_site - Duplicate Agency Code and Site Number found in MLR.",
                    name: "USGS-04087098"
                },
                {
                    message: "Update Agency Code and/or Site Number Fatal Error: Transaction validation failed.",
                    name: "USGS-04087098"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "1 Transactions Succeeded, 1 Transactions Failed",
            name: "Status"
        }
    }

    const stationChangeInternalServerErrorParsed = {
        workflowLevelErrors: {
            errors: [
                {
                    message: "Something bad happened. Contact us with Reference Number: 341013512",
                    name: "Error"
                }
            ],
            name: "Workflow-level Errors"
        },
        workflowStatus: {
            message: "No sites processed",
            name: "Status"
        }
    }

    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        jest.resetModules();
        jest.clearAllMocks();
        jest.spyOn(window, 'confirm').mockImplementation(() => {return true});
    });

    it('Renders the input fields and button', () => {
        const wrapper = mountFactory({});

        expect(wrapper.html()).toContain('>Agency Code</label>');
        expect(wrapper.html()).toContain('>New Agency Code</label>');
        expect(wrapper.html()).toContain('>Site Number</label>');
        expect(wrapper.html()).toContain('>New Site Number</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Emits proper response for success', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeSuccessResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeSuccessResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeSuccessParsed);
    });

    it('Emits proper response for failure due to location not found', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeErrorNotFoundResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeErrorNotFoundResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeErrorNotFoundParsed);
    });

    it('Emits proper response for validation fatal error', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeFatalErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeFatalErrorResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeFatalErrorParsed);
    });

    it('Emits proper response for validation no CRU Service available errors', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeNoCruServiceErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeNoCruServiceErrorResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeNoCruServiceErrorParsed);
    });

    it('Emits proper response for validation no Export Service available errors', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeNoExportServiceErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeNoExportServiceErrorResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeNoExportServiceErrorParsed);
    });

    it('Emits proper response for validation no Notification Service available errors', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeNoNotificationServiceErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeNoNotificationServiceErrorResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeNoNotificationServiceErrorParsed);
    });

    it('Emits proper response for validation duplicate station errors', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeDuplicateStationErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeDuplicateStationErrorResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeDuplicateStationErrorParsed);
    });

    it('Emits proper response for internal server error', async () => {
        postChange.mockImplementation(() => Promise.resolve(
            stationChangeInternalServerErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().changeWorkflow).toBeUndefined();
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().changeWorkflow).toBeTruthy();
        expect(wrapper.emitted().changeWorkflow[0][1]).toEqual(stationChangeInternalServerErrorResponse.data);
        expect(wrapper.emitted().changeWorkflow[0][2]).toEqual(stationChangeInternalServerErrorParsed);
    });

});
