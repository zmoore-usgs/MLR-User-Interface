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
            </v-row>
            <v-card v-if="responseData">
                <v-list dense>
                    <v-list-item>MLR Workflow: {{responseData.name}}</v-list-item>
                    <v-list-item>User: {{responseData.userName}}</v-list-item>
                    <v-list-item>Date: {{responseData.reportDateTime}}</v-list-item>
                    <v-list-item>Input File: {{handleNullAttributes(responseData.inputFileName)}}</v-list-item>
                    <v-list-item>
                        <ExportReport v-if="exportReport" :report="exportReport" />
                    </v-list-item>
                    <v-list-item>
                        <ValidateReport v-if="validateReport" :report="validateReport" />
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
        <v-snackbar v-model="snackbarShow" :color="snackbarColor">
            {{snackbarMessage}}
            <v-spacer></v-spacer>
            <v-btn icon @click="snackbarShow=false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import USGSFooter from "@/components/USGSFooter";
import MLRFooter from "@/components/MLRFooter";
import USGSHeaderBar from "@/components/USGSHeaderBar";
import DdotProcessCard from "@/components/DdotProcessCard";
import CopyLocationCard from "@/components/CopyLocationCard";
import ExportReport from "@/components/ExportReport";
import ValidateReport from "@/components/ValidateReport";
import axios from "axios";
import { EventBus } from "@/components/EventBus.js";

export default {
    name: "App",

    components: {
        USGSFooter,
        MLRFooter,
        USGSHeaderBar,
        DdotProcessCard,
        CopyLocationCard,
        ExportReport,
        ValidateReport
    },

    data() {
        return {
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            snackbarShow: false
        };
    },
    created: function() {
        this.readAccessToken();

        EventBus.$on("snackbar-update", response => {
            this.showSnackbarMessage(response);
        });
    },

    computed: {
        responseSuccessful() {
            return this.response.status > 199 && this.response.status < 300;
        },
        snackbarColor() {
            return this.responseSuccessful ? "green" : "red";
        },
        snackbarMessage() {
            return this.responseSuccessful ? "Success!" : this.response;
        }
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
        showSnackbarMessage(response) {
            this.response = response;
            this.snackbarShow = true;
        },
        showValidateReport(responseData, workflowFailureMsg) {
            console.log(responseData);
            console.log(workflowFailureMsg);
            this.exportReport = null;
            this.validateReport = workflowFailureMsg;
            this.responseData = responseData;
        },
        showExportReport(responseData, workflowFailureMsg) {
            this.exportReport = workflowFailureMsg;
            this.validateReport = null;
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
