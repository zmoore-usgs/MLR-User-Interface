<template>
    <v-card flat>
        <v-card-title>Station Change</v-card-title>
        <v-card-text>
            <v-row>
                    <v-col cols="2" sm="6" md="4">
                    <v-text-field
                        v-model="oldAgencyCode"
                        :rules="requiredRules"
                        label="Agency Code"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="6" md="6">
                    <v-text-field
                        v-model="oldSiteNumber"
                        :rules="requiredRules"
                        label="Site Number"
                        required
                    ></v-text-field>
                    </v-col>
            </v-row>
            <v-row>
                    <v-col cols="2" sm="6" md="4">
                    <v-text-field
                        v-model="newAgencyCode"
                        :rules="requiredRules"
                        label="New Agency Code"
                        required
                    ></v-text-field>
                    </v-col>
                <v-col cols="2" sm="6" md="6">
                    <v-text-field
                        v-model="newSiteNumber"
                        :rules="requiredRules"
                        label="New Site Number"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
            <v-text-field
                v-model="reasonText"
                :counter="64"
                :rules="validReasonText"
                label="Reason for change"
                required
            ></v-text-field>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="updatePrimaryKey">Station Change</v-btn>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on" icon class="mx-2">
                        <v-icon>mdi-help-circle</v-icon>
                    </v-btn>
                </template>
                <span>Enter the old agency code and site number and the new agency code and site number, and the reason for an existing site that you'd like to update the primary key for.</span>
            </v-tooltip>
        </v-card-actions>
        <v-dialog 
            hide-overlay width="300"
            v-model="loading" 
            >
            <v-card>
                <v-card-text>
                    Processing your request
                    <v-progress-linear 
                        indeterminate 
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import _ from "lodash";
import LegacyLocationApi from "@/services/api/LegacyLocationApi.js";

export default {
    name: "UpdatePrimaryKeyCard",

    data() {
        return {
            oldAgencyCode: "",
            oldSiteNumber: "",
            newAgencyCode: "",
            newSiteNumber: "",
            reasonText:"",
            requiredRules: [
                field => !!field || 'Item is required'
            ],
            validReasonText: [
                text => !!text || 'Item is required',
                text => text && /^[0-9a-zA-Z ]+$/.test(text) || 'Reason text must contain only letters, numbers and spaces.'
            ],
            loading: false
        };
    },
    methods: {
        updatePrimaryKey() {
            this.loading = true;
            LegacyLocationApi.postChange(this.oldAgencyCode, this.oldSiteNumber, this.newAgencyCode, this.newSiteNumber, this.reasonText)
                .then(response => {
                    this.handleWorkflowError(response);
                })
                .catch(error => {
                    this.handleWorkflowError(error.response);
                })
                .finally(() => {
                        this.loading = false;
                });
        },
        parseMessage(message){
            if (message.includes("_message") || (message.includes("validation_errors"))){
                return JSON.parse(message);
            } else {
                return message;
            }
        },
        handleWorkflowError(response) {
            var workflowFailureMsg = {};
            var workflowErrors = null;
            if (response.data.name === undefined){
                workflowFailureMsg.workflowStatus = {
                        name: "Status",
                        message:"No sites processed"
                    };
                workflowFailureMsg.workflowLevelErrors = {
                        name: "Workflow-level Errors",
                        errors: []
                    };
                workflowFailureMsg.workflowLevelErrors.errors.push({
                    name: "Error",
                    message: response.data.error_message
                });
            } else {
                if (response.data.workflowSteps.length > 0) {
                    var workflowFailure = response.data.workflowSteps.filter(
                        function(x) {
                            return x.name.search("Workflow") > 0;
                        }
                    );
                    if (workflowFailure.length > 0) {
                        workflowFailureMsg.workflowStatus = {
                            name: workflowFailure[0].name,
                            message:
                                this.parseMessage(workflowFailure[0].details)
                        };
                    }
                    workflowErrors = response.data.workflowSteps.filter(function(
                        x
                    ) {
                        return x.name.search("Workflow") < 0;
                    });
                }
                if (workflowFailureMsg.workflowStatus === undefined) {
                    workflowFailureMsg.workflowStatus = {
                        name: "Status",
                        message:
                            response.data.numberSiteSuccess +
                            " Transactions Succeeded, " +
                            response.data.numberSiteFailure +
                            " Transactions Failed"
                    };
                }
                if (workflowErrors != null) {
                    workflowFailureMsg.workflowLevelErrors = {
                        name: "Workflow-level Errors",
                        errors: []
                    };
                    workflowErrors.forEach(function(e) {
                        workflowFailureMsg.workflowLevelErrors.errors.push({
                            name: e.name,
                            message: JSON.parse(e.details).error_message
                        });
                    });
                }
                if (response.data.sites.length > 0) {
                    workflowFailureMsg.siteErrors = {
                        name: "Site-level Errors and Warnings",
                        errors: this.parseSiteErrorRows(response.data.sites)
                    };
                }
            }
            this.$emit("changeWorkflow", "updatePrimaryKeyReport", response.data, workflowFailureMsg);
        },
        parseSiteErrorRows(errorList) {
            var result = [];
            errorList.forEach(function(s) {
                var site = s.agencyCode.trim() + "-" + s.siteNumber.trim();
                var steps = s.steps;
                steps.forEach(function(st) {
                    var detailMsg = this.parseMessage(st.details);
                    if (detailMsg.hasOwnProperty("error_message")) {
                        if (typeof this.parseMessage(detailMsg.error_message) === "object") {
                            var detailErrMessage = this.parseMessage(detailMsg.error_message)
                            if (
                                detailErrMessage.hasOwnProperty("validation_errors")
                                ) {
                                    Object.keys(
                                        detailErrMessage.validation_errors
                                    ).forEach(function(key) {
                                        result.push({
                                            name: site,
                                            message:
                                                st.name +
                                                " Fatal Error: " +
                                                key +
                                                " - " +
                                                detailErrMessage.validation_errors[key]
                                        });
                                    });
                                }
                        } else {
                            result.push({
                                name: site,
                                message:
                                    st.name +
                                    " Fatal Error: " +
                                    detailMsg.error_message
                            });
                        }
                    }
                    if (detailMsg.hasOwnProperty("validator_message")) {
                        if (
                            detailMsg.validator_message.hasOwnProperty(
                                "fatal_error_message"
                            )
                        ) {
                            Object.keys(
                                detailMsg.validator_message.fatal_error_message
                            ).forEach(function(key) {
                                result.push({
                                    name: site,
                                    message:
                                        st.name +
                                        " Fatal Error: " +
                                        key +
                                        " - " +
                                        detailMsg.validator_message
                                            .fatal_error_message[key]
                                });
                            });
                        }
                    }
                }.bind(this));
            }.bind(this));
            return result;
        }
    }
};
</script>