<template>
    <v-content>
        <v-container>
            <v-row>
                <v-col>
                    <DdotProcessCard @validateWorkflow="setReportData" />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <CopyLocationCard @exportWorkflow="setReportData" />
                </v-col>
            </v-row>
            <br/>
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
        </v-container>
    </v-content>
</template>

<script>
import DdotProcessCard from "@/components/DdotProcessCard";
import CopyLocationCard from "@/components/CopyLocationCard";
import ExportReport from "@/components/ExportReport";
import ValidateReport from "@/components/ValidateReport";

export default {
    name: "SiteManagementPage",

    components: {
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
            exportReport: {}
        };
    },
    
    methods: {
        setReportData(reportType, responseData, workflowFailureMsg) {
            this.responseData = responseData;
            this.exportReport =
                reportType === "exportReport" ? workflowFailureMsg : null;
            this.validateReport =
                reportType === "validateReport" ? workflowFailureMsg : null;
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
            } else {
                return attr;
            }
        }
    }
};
</script>