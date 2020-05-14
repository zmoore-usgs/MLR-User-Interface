<template>
    <v-app>
        <USGSHeaderBar />

        <v-content>
            <v-row>
                <v-col>
                    <DdotProcessCard @validateWorkflow="showValidateReport" />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <CopyLocationCard @exportWorkflow="showExportReport" />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <UpdatePrimaryKeyCard @changeWorkflow="showUpdatePrimaryKeyReport" />
                </v-col>
            </v-row>
            <v-card v-if="responseData">
                <v-list dense>
                    <v-list-item>MLR Workflow: {{responseData.name}}</v-list-item>
                    <v-list-item>User: {{responseData.userName}}</v-list-item>
                    <v-list-item>Date: {{responseData.reportDateTime}}</v-list-item>
                    <v-list-item>Input File: {{handleNullAttributes(responseData.inputFileName)}}</v-list-item>
                    <v-list-item v-if="exportReport">
                        <ExportReport :report="exportReport" />
                    </v-list-item>
                    <v-list-item v-if="validateReport">
                        <ValidateReport :report="validateReport" />
                    </v-list-item>
                    <v-list-item v-if="updatePrimaryKeyReport">
                        <UpdatePrimaryKeyReport :report="updatePrimaryKeyReport" />
                    </v-list-item>
                    <v-list-item>
                        <v-btn
                            text
                            color="primary"
                            @click="downloadStepReport"
                        >Download the Error Warning/Step Report</v-btn>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-content>
        <MLRFooter />
        <USGSFooter />
    </v-app>
</template>

<script>
import USGSFooter from "@/components/USGSFooter";
import MLRFooter from "@/components/MLRFooter";
import USGSHeaderBar from "@/components/USGSHeaderBar";
import DdotProcessCard from "@/components/DdotProcessCard";
import CopyLocationCard from "@/components/CopyLocationCard";
import UpdatePrimaryKeyCard from "@/components/UpdatePrimaryKeyCard";
import ExportReport from "@/components/ExportReport";
import ValidateReport from "@/components/ValidateReport";
import UpdatePrimaryKeyReport from "@/components/UpdatePrimaryKeyReport";
import axios from "axios";

export default {
    name: "App",

    components: {
        USGSFooter,
        MLRFooter,
        USGSHeaderBar,
        DdotProcessCard,
        CopyLocationCard,
        UpdatePrimaryKeyCard,
        ExportReport,
        ValidateReport,
        UpdatePrimaryKeyReport
    },

    data() {
        return {
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            updatePrimaryKeyReport: {},
        };
    },
    created: function() {
        this.readAccessToken();
    },

    methods: {
        readAccessToken() {
            var accessToken = new URL(location.href).searchParams.get(
                "mlrAccessToken"
            );
            if (accessToken) {
                axios.defaults.headers.common["X-Auth-Token"] = accessToken;
                window.history.replaceState({}, document.title, "/");
            } else {
                window.location = axios.defaults.baseURL + "auth/login";
            }
        },
        showValidateReport(responseData, workflowFailureMsg) {
            this.exportReport = null;
            this.validateReport = workflowFailureMsg;
            this.updatePrimaryKeyReport = null;
            this.responseData = responseData;
        },
        showExportReport(responseData, workflowFailureMsg) {
            this.exportReport = workflowFailureMsg;
            this.validateReport = null;
            this.updatePrimaryKeyReport = null;
            this.responseData = responseData;
        },
        showUpdatePrimaryKeyReport(responseData, workflowFailureMsg) {
            this.exportReport = null;
            this.validateReport = null;
            this.updatePrimaryKeyReport = workflowFailureMsg;
            this.responseData = responseData;
        },
        downloadStepReport() {
            var dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(this.responseData, null, 4));
            var downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "mlr-results.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        handleNullAttributes(attr){
            if (attr == null){
                return "null";
            }
        }
    }
};
</script>
