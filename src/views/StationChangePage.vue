<template>
    <v-content>
        <v-row>
            <v-col>
                <UpdatePrimaryKeyCard @changeWorkflow="setReportData" />
            </v-col>
        </v-row>
        <v-card v-if="responseData">
            <v-list dense>
                <v-list-item>MLR Workflow: {{responseData.name}}</v-list-item>
                <v-list-item>User: {{responseData.userName}}</v-list-item>
                <v-list-item>Date: {{responseData.reportDateTime}}</v-list-item>
                <v-list-item>Input File: {{handleNullAttributes(responseData.inputFileName)}}</v-list-item>
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
</template>

<script>
import UpdatePrimaryKeyCard from "@/components/UpdatePrimaryKeyCard";
import UpdatePrimaryKeyReport from "@/components/UpdatePrimaryKeyReport";

export default {
    name: "StationChangePage",

    components: {
        UpdatePrimaryKeyCard,
        UpdatePrimaryKeyReport
    },

    data() {
        return {
            response: {},
            responseData: null,
            updatePrimaryKeyReport: {}
        };
    },
    
    methods: {
        setReportData(reportType, responseData, workflowFailureMsg) {
            this.responseData = responseData;
            this.updatePrimaryKeyReport =
                reportType === "updatePrimaryKeyReport"
                    ? workflowFailureMsg
                    : null;
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