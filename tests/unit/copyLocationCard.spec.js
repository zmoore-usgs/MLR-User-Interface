// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Mocks
// See - https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b
import { postExport } from "@/services/api/LegacyLocationApi";
jest.mock('@/services/api/LegacyLocationApi', () => ({
    postExport: jest.fn()
}))

// Components
import CopyLocationCard from '@/components/CopyLocationCard.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('CopyLocationCard.vue', () => {
    let localVue;
    let vuetify;
    
    const app = document.createElement ("div");
    app.setAttribute ("data-app", true);
    document.body.append (app);
    
    const mountFactory = function(args) {
        return mount(CopyLocationCard, {
            localVue,
            vuetify,
            ...args
        });
    }

    const copySuccessResponse = {
        data: {
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
        }
    };

    const copyErrorResponse = {
        data: {
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
    };

    const copyServiceErrorResponse = {
         data:  {
            name: "Complete Export Workflow",
            inputFileName: null,
            reportDateTime: "2020-05-11T11:57:07.890Z",
            userName: "mlradmin",
            workflowSteps: [
                {
                    name: "Complete Export Workflow",
                    httpStatus: 500,
                    success: false,
                    details: "LegacyCruClient#getMonitoringLocation(String,String) failed and no fallback available."
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
    }

    const copySuccessParsed = {"exportWorkflowErrors" : 
        {"errors": [],
        "name": "Export Workflow Errors"
        }}

    const copyErrorParsed = {"exportWorkflowErrors" : 
        {"errors": [
            {
                "message": "Failed: Requested Location Not Found",
                "name": "Complete Export Workflow"
            }
        ],
        "name": "Export Workflow Errors"
        }}

    const copyServiceErrorParsed = {"exportWorkflowErrors" : 
        {"errors": [
            {
                "message": "Failed: LegacyCruClient#getMonitoringLocation(String,String) failed and no fallback available.",
                "name": "Complete Export Workflow"
            }
        ],
        "name": "Export Workflow Errors"
        }}

    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('Renders the input fields and button', () => {
        const wrapper = mountFactory({});

        expect(wrapper.html()).toContain('Agency Code</label>');
        expect(wrapper.html()).toContain('Site Number</label>');
        expect(wrapper.html()).toContain('v-text-field');
        expect(wrapper.html()).toContain('v-btn');
    });

    it('Emits proper response for success', async () => {
        postExport.mockImplementation(() => Promise.resolve(
            copySuccessResponse
        ));
        const wrapper = mountFactory({});
        expect(wrapper.emitted().exportWorkflow).toBeUndefined();
        
        wrapper.setData({
            agencyCode: "USGS",
            siteNumber: "1234"
		});
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().exportWorkflow).toBeTruthy();
        expect(wrapper.emitted().exportWorkflow[0][1]).toEqual(copySuccessResponse.data);
        expect(wrapper.emitted().exportWorkflow[0][2]).toEqual(copySuccessParsed);
        
    });

    it('Emits proper response for validation failure', async () => {
        postExport.mockImplementation(() => Promise.resolve(
            copyErrorResponse
        ));
        const wrapper = mountFactory({});
        
        wrapper.setData({
            agencyCode: "USGS",
            siteNumber: "1234"
		});
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().exportWorkflow).toBeTruthy();
        expect(wrapper.emitted().exportWorkflow[0][1]).toEqual(copyErrorResponse.data);
        expect(wrapper.emitted().exportWorkflow[0][2]).toEqual(copyErrorParsed);
    });

    it('Emits proper response for backing service failure', async () => {
        postExport.mockImplementation(() => Promise.resolve(
            copyServiceErrorResponse
        ));
        const wrapper = mountFactory({});
        
        wrapper.setData({
            agencyCode: "USGS",
            siteNumber: "1234"
		});
        
        wrapper.find('button').trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().exportWorkflow).toBeTruthy();
        expect(wrapper.emitted().exportWorkflow[0][1]).toEqual(copyServiceErrorResponse.data);
        expect(wrapper.emitted().exportWorkflow[0][2]).toEqual(copyServiceErrorParsed);
    });
});
