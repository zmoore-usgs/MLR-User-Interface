<template>
    <v-app>
        <USGSHeaderBar />

        <v-content>
            <v-row>
                <v-col>
                    <DdotProcessCard @validateWorkflow="setReportData" />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <CopyLocationCard @exportWorkflow="setReportData" />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <UpdatePrimaryKeyCard @changeWorkflow="setReportData" />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <AuditTableRetrieverCard @auditTable="showAuditTable" />
                </v-col>
            </v-row>
            <v-card v-if="auditTable.length != 0">
                <AuditTable v-if="auditTable" :tableData="auditTable" />
            </v-card>
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
import AuditTable from "@/components/AuditTable";
import AuditTableRetrieverCard from "@/components/AuditTableRetrieverCard";
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
        AuditTable,
        AuditTableRetrieverCard,
        UpdatePrimaryKeyReport
    },

    data() {
        return {
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            auditTable: [],
            updatePrimaryKeyReport: {}
        };
    },
    created: function() {
        this.readAccessToken();
    },
    methods: {
        setReportData(reportType, responseData, workflowFailureMsg) {
            this.responseData = responseData;
            this.exportReport =
                reportType === "exportReport" ? workflowFailureMsg : null;
            this.validateReport =
                reportType === "validateReport" ? workflowFailureMsg : null;
            this.updatePrimaryKeyReport =
                reportType === "updatePrimaryKeyReport"
                    ? workflowFailureMsg
                    : null;
        },
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
        showAuditTable(auditTable) {
            this.setReportData(null, null, null);
            this.auditTable = auditTable;
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
        handleNullAttributes(attr) {
            if (attr == null) {
                return "null";
            }
        }
    }
};
</script>
