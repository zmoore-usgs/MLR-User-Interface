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
                <v-col v-if="showStationChange">
                    <UpdatePrimaryKeyCard @changeWorkflow="setReportData" />
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
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <MLRFooter />
        <USGSFooter />
    </v-app>
</template>

<script>
import USGSFooter from "@/components/USGSFooter";
import MLRFooter from "@/components/MLRFooter";
import USGSHeaderBar from "@/components/USGSHeaderBar";
import axios from "axios";

export default {
    name: "App",

    components: {
        USGSFooter,
        MLRFooter,
        USGSHeaderBar
    },

    data() {
        return {
            response: {},
            responseData: null,
            validateReport: null,
            exportReport: {},
            updatePrimaryKeyReport: {},
            auditTable: []
        };
    },
    created: function() {
        this.readAccessToken();
    },
    methods: {
        readAccessToken() {
            var accessToken = this.$route.query.mlrAccessToken;
            if (accessToken) {
                axios.defaults.headers.common["X-Auth-Token"] = accessToken;
                this.$router.push("/");
            } else {
                window.location = axios.defaults.baseURL + "auth/login";
            }
        }
    }
};
</script>
