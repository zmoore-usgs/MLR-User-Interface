<template>
    <v-card flat>
        <v-card-title>Copy a Location</v-card-title>
        <v-card-text>
            <v-text-field 
                v-model="agencyCode" 
                :rules="[rules.required]"
                label="Agency Code">
            </v-text-field>
            <v-text-field 
                v-model="siteNumber" 
                :rules="[rules.required]"
                label="Site Number">
            </v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="exportLocation">Copy</v-btn>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on" icon class="mx-2">
                        <v-icon>mdi-help-circle</v-icon>
                    </v-btn>
                </template>
                <span>Enter an agency code and site number for an existing site that you'd like to copy. The site will be copied to all NWIS hosts as a result.</span>
            </v-tooltip>
        </v-card-actions>
    </v-card>
</template>

<script>
import LegacyLocationApi from "@/services/api/LegacyLocationApi.js";
import { EventBus } from "@/components/EventBus.js";

export default {
    name: "CopyLocationCard",

    data() {
        return {
            agencyCode: "",
            siteNumber: "",
            rules: {
                    required: value => !!value || 'Required'
            },
        }
    },
    methods: {
        exportLocation() {
            LegacyLocationApi.postExport(this.agencyCode, this.siteNumber)
                .then(response => {
                    this.handleExportWorkflowError(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleExportWorkflowError(response) {
            var workflowFailureMsg = {};
            workflowFailureMsg.exportWorkflowErrors = {
                name: "Export Workflow Errors",
                errors: []
            };
            response.data.workflowSteps.forEach(function(w) {
                if (w.name === "Complete Export Workflow") {
                    if (w.success === false) {
                        workflowFailureMsg.exportWorkflowErrors.errors.push({
                            name: w.name,
                            message:
                                "Failed: " + JSON.parse(w.details).error_message
                        });
                    }
                }
            });
            this.$emit("exportWorkflow", response.data, workflowFailureMsg);
        }
    }
};
</script>