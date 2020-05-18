// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Mocks
// See - https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b
import { validateDdot } from "@/services/api/DdotApi";
jest.mock('@/services/api/DdotApi', () => ({
    validateDdot: jest.fn()
}))

// Components
import DdotProcessCard from '@/components/DdotProcessCard.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('DdotProcessCard.vue', () => {
    let localVue;
    let vuetify;
    
    const app = document.createElement ("div");
    app.setAttribute ("data-app", true);
    document.body.append (app);
    
    const mountFactory = function(args) {
        return mount(DdotProcessCard, {
            localVue,
            vuetify,
            ...args
        });
    }

    const fileContents       = 'file contents';
    const dDotFile = new Blob([fileContents], {type : 'text/plain'});

    const validateSuccessWarningResponse = {
        data: {
            name: "Validate D dot File",
            inputFileName: "d.cabuchwa_good.011",
            reportDateTime: "2020-05-08T16:28:11.485Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "USGS ",
                    siteNumber: "432506088151701",
                    transactionType: "A",
                    success: true,
                    steps: [
                        {
                            name: "Validate",
                            httpStatus: 200,
                            success: true,
                            details: "{\"validator_message\": {\"warning_message\": {\"latitude\": [\"Latitude is out of range for county 067\"], \"longitude\": [\"Longitude is out of range for county 067\"]}}\n}"
                        }
                    ]
                },
                {
                    agencyCode: "USGS ",
                    siteNumber: "432452088151501",
                    transactionType: "A",
                    success: true,
                    steps: [
                        {
                            name: "Validate",
                            httpStatus: 200,
                            success: true,
                            details: "{\"validator_message\": {\"warning_message\": {\"latitude\": [\"Latitude is out of range for county 067\"], \"longitude\": [\"Longitude is out of range for county 067\"]}}\n}"
                        }
                    ]
                }
            ],
            numberSiteSuccess: 2,
            numberSiteFailure: 0
        }
    };

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

    const validateErrorNotFoundResponse = {
        data: {name: "Validate D dot File",
            inputFileName: "d.cabuchwaBadNotFound.011",
            reportDateTime: "2020-05-08T18:00:06.254Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "USGS ",
                    siteNumber: "432506088151701",
                    transactionType: "M",
                    success: false,
                    steps: [
                        {
                            name: "Location Get by AgencyCode and SiteNumber",
                            httpStatus: 404,
                            success: false,
                            details: "{\"error_message\": \"Requested Location Not Found\"}"
                        },
                        {
                            name: "Validate",
                            httpStatus: 404,
                            success: false,
                            details: "{\"error_message\": \"Requested Location Not Found\"}"
                        },
                        {
                            name: "Validate Single D dot Transaction",
                            httpStatus: 404,
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

    const validateFatalErrorResponse = {
        data: {name: "Validate D dot File",
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

    const validateWorkflowLevelErrorsResponse = {
        data: {
            name: "Validate D dot File",
            inputFileName: "d.cabuchwa_good.011",
            reportDateTime: "2020-05-08T19:11:50.488Z",
            userName: "mlradmin",
            workflowSteps: [
                {
                    name: "Ingest D dot File",
                    httpStatus: 500,
                    success: false,
                    details: "{\"error_message\":\"DdotClient#ingestDdot(MultipartFile) failed and no fallback available.\"}"
                },
                {
                    name: "Validate D dot File workflow failed",
                    httpStatus: 500,
                    success: false,
                    details: "{\"error_message\": \"Unable to read ingestor output.\"}"
                }
            ],
            sites: [],
            numberSiteSuccess: 0,
            numberSiteFailure: 0
        }
    }

    const validateNoCruServiceErrorResponse = {
       data: {
            name: "Validate D dot File",
            inputFileName: "d.cabuchwa.011",
            reportDateTime: "2020-05-11T12:34:09.485Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "USGS ",
                    siteNumber: "432506088151701",
                    transactionType: "M",
                    success: false,
                    steps: [
                        {
                            name: "Validate Duplicate Monitoring Location Name",
                            httpStatus: 500,
                            success: false,
                            details: "LegacyCruClient#validateMonitoringLocation(String) failed and no fallback available."
                        },
                        {
                            name: "Validate",
                            httpStatus: 500,
                            success: false,
                            details: "{\"error_message\":\"LegacyCruClient#getMonitoringLocation(String,String) failed and no fallback available.\"}"
                        },
                        {
                            name: "Validate Single D dot Transaction",
                            httpStatus: 500,
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

    const validateDuplicateStationErrorResponse = {
        data: {
            name: "Validate and Process D dot File Workflow",
            inputFileName: "d.cabuchwa_good.011",
            reportDateTime: "2020-05-11T18:20:14.707Z",
            userName: "mlradmin",
            workflowSteps: [],
            sites: [
                {
                    agencyCode: "USGS ",
                    siteNumber: "432506088151701",
                    transactionType: "A",
                    success: false,
                    steps: [
                        {
                            name: "Validate Duplicate Monitoring Location Name",
                            httpStatus: 400,
                            success: false,
                            details: "{\"error_message\": \"{\\\"validation_errors\\\":{\\\"stationIx\\\":\\\"Duplicate normalized station name locations found for 'GILBERTLAKESPRING3NRWESTBENDWI': USGS-432506088151701, stateFipsCode: 55\\\",\\\"duplicate_site\\\":\\\"Duplicate Agency Code and Site Number found in MLR.\\\"}}\"}"
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

    const validateInternalServerErrorResponse = {
        data: {
            error_message: "Something bad happened. Contact us with Reference Number: 341013512"
        }
    }

    const validateSuccessWarningParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Validate Warning: latitude - Latitude is out of range for county 067",
                    name: "USGS-432506088151701"
                },
                {
                    message: "Validate Warning: longitude - Longitude is out of range for county 067",
                    name: "USGS-432506088151701"
                },
                {
                    message: "Validate Warning: latitude - Latitude is out of range for county 067",
                    name: "USGS-432452088151501"
                },
                {
                    message: "Validate Warning: longitude - Longitude is out of range for county 067",
                    name: "USGS-432452088151501"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "2 Transactions Succeeded, 0 Transactions Failed",
            name: "Status"
        }
    }

    const validateSuccessParsed = {
        workflowStatus: {
            message: "2 Transactions Succeeded, 0 Transactions Failed",
            name: "Status"
        }
    }

    const validateErrorNotFoundParsed = {
            siteErrors: {
                errors: [
                    {
                        message: "Location Get by AgencyCode and SiteNumber Fatal Error: Requested Location Not Found",
                        name: "USGS-432506088151701"
                    },
                    {
                        message: "Validate Fatal Error: Requested Location Not Found",
                        name: "USGS-432506088151701"
                    },
                    {
                        message: "Validate Single D dot Transaction Fatal Error: Transaction validation failed.",
                        name: "USGS-432506088151701"
                    }
                ],
                name: "Site-level Errors and Warnings"
            },
            workflowStatus: {
                message: "0 Transactions Succeeded, 1 Transactions Failed",
                name: "Status"
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

    const validateWorkflowLevelErrorsParsed = {
        workflowLevelErrors: {
            errors: [
                {
                    message: "DdotClient#ingestDdot(MultipartFile) failed and no fallback available.",
                    name: "Ingest D dot File"
                }
            ],
            name: "Workflow-level Errors"
        },
        workflowStatus: {
            message: " (Unable to read ingestor output.) : No Transactions were processed. Error details listed below: ",
            name: "Validate D dot File workflow failed"
        }
    }

    const validateNoCruServiceErrorParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Validate Fatal Error: LegacyCruClient#getMonitoringLocation(String,String) failed and no fallback available.",
                    name: "USGS-432506088151701"
                },
                {
                    message: "Validate Single D dot Transaction Fatal Error: Transaction validation failed.",
                    name: "USGS-432506088151701"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "0 Transactions Succeeded, 1 Transactions Failed",
            name: "Status"
        }
    }

    const validateDuplicateStationErrorParsed = {
        siteErrors: {
            errors: [
                {
                    message: "Validate Duplicate Monitoring Location Name Fatal Error: stationIx - Duplicate normalized station name locations found for 'GILBERTLAKESPRING3NRWESTBENDWI': USGS-432506088151701, stateFipsCode: 55",
                    name: "USGS-432506088151701"
                },
                {
                    message: "Validate Duplicate Monitoring Location Name Fatal Error: duplicate_site - Duplicate Agency Code and Site Number found in MLR.",
                    name: "USGS-432506088151701"
                },
                {
                    message: "Validate Single D dot Transaction Fatal Error: Transaction validation failed.",
                    name: "USGS-432506088151701"
                }
            ],
            name: "Site-level Errors and Warnings"
        },
        workflowStatus: {
            message: "0 Transactions Succeeded, 1 Transactions Failed",
            name: "Status"
        }
    }

    const validateInternalServerErrorParsed = {
        workflowLevelErrors: {
            errors: [
                {
                    message: "Something bad happened. Contact us with Reference Number: 341013512",
                    name: "Internal Server Error"
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
    });

    it('Renders the input fields and button', () => {
        const wrapper = mountFactory({});

        expect(wrapper.html()).toContain('Select Ddot File to Upload</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Emits proper response for success with warnings', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateSuccessWarningResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateSuccessWarningResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateSuccessWarningParsed);
    });

    it('Emits proper response for success', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateSuccessResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateSuccessResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateSuccessParsed);
    });

    it('Emits proper response for failure due to location not found', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateErrorNotFoundResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateErrorNotFoundResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateErrorNotFoundParsed);
    });

    it('Emits proper response for validation fatal error', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateFatalErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateFatalErrorResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateFatalErrorParsed);
    });

    it('Emits proper response for validation workflow-level errors', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateWorkflowLevelErrorsResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateWorkflowLevelErrorsResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateWorkflowLevelErrorsParsed);
    });

    it('Emits proper response for validation no CRU Service available errors', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateNoCruServiceErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateNoCruServiceErrorResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateNoCruServiceErrorParsed);
    });

    it('Emits proper response for validation duplicate station errors', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateDuplicateStationErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateDuplicateStationErrorResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateDuplicateStationErrorParsed);
    });

    it('Emits proper response for internal server error', async () => {
        validateDdot.mockImplementation(() => Promise.resolve(
            validateInternalServerErrorResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().validateWorkflow).toBeUndefined();
        
        wrapper.setData({
            ddotFile: dDotFile,
            districtCodes: null,
            transactionTypes: null
        });
        
        wrapper.find('button.validate').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().validateWorkflow).toBeTruthy();
        expect(wrapper.emitted().validateWorkflow[0][1]).toEqual(validateInternalServerErrorResponse.data);
        expect(wrapper.emitted().validateWorkflow[0][2]).toEqual(validateInternalServerErrorParsed);
    });
    
});
