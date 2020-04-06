<template>
    <v-card flat>
        <v-card-title>Upload and Process a Ddot file</v-card-title>
        <v-card-text>
            <v-form>
                <v-file-input v-model="ddotFile" label="Select Ddot File to Upload"></v-file-input>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn class="mx-2" color="primary" @click="validateButtonClicked">Validate</v-btn>
            <v-btn color="primary" @click="uploadButtonClicked">Validate and Update records</v-btn>
        </v-card-actions>
        <v-dialog v-model="showValidateDialog">
            <v-card>
                <v-card-title>Validate</v-card-title>
                <v-card-text>{{confirmStatement}}</v-card-text>
                <v-card-actions>
                    <v-btn color="primary" class="mx-2" @click="showValidateDialog = false">Close</v-btn>
                    <v-btn color="primary" @click="validateDdotFile">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showUploadDialog">
            <v-card>
                <v-card-title>Upload</v-card-title>
                <v-card-text>{{confirmStatement}}</v-card-text>
                <v-card-actions>
                    <v-btn color="primary" class="mx-2" @click="showUploadDialog = false">Close</v-btn>
                    <v-btn color="primary" @click="uploadDdotFile">Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import DdotApi from "@/services/api/DdotApi.js";
import { EventBus } from "@/components/EventBus.js";

export default {
    name: "DdotProcessCard",

    data() {
        return {
            ddotFile: null,
            districtCodes: null,
            transactionTypes: null,
            showValidateDialog: false,
            showUploadDialog: false
        };
    },
    computed: {
        confirmStatement() {
            var toRet = this.transactionTypesCheck
                ? "Please coordinate with other LDMs if you are creating a site in another district code.\n"
                : "";
            toRet += this.districtCodesCheck
                ? "Please be aware that you are adding or modifying sites in multiple district codes."
                : "";
            return toRet;
        },
        transactionTypesCheck() {
            return this.transactionTypes && this.transactionTypes.includes("A");
        },
        districtCodesCheck() {
            return this.districtCodes && this.districtCodes.length > 1;
        }
    },
    methods: {
        validateButtonClicked() {
            this.parseDdotFile().then(() => {
                if (this.transactionTypesCheck || districtCodesCheck) {
                    this.showValidateDialog = true;
                } else {
                    this.validateDdotFile();
                }
            });
        },
        uploadButtonClicked() {
            this.parseDdotFile().then(() => {
                if (this.transactionTypesCheck || districtCodesCheck) {
                    this.showUploadDialog = true;
                } else {
                    this.uploadDdotFile();
                }
            });
        },
        parseDdotFile() {
            return DdotApi.parseDdot(this.ddotFile).then(response => {
                this.districtCodes = response.data.districtCodes;
                this.transactionTypes = response.data.transactionTypes;
            });
        },
        uploadDdotFile() {
            this.showUploadDialog = false;
            DdotApi.uploadDdot(this.ddotFile)
                .then(response => {
                    this.emitSnackbarUpdate(response);
                })
                .catch(error => {
                    this.emitSnackbarUpdate(error);
                });
        },
        validateDdotFile() {
            this.showValidateDialog = false;
            DdotApi.validateDdot(this.ddotFile)
                .then(response => {
                    this.emitSnackbarUpdate(response);
                })
                .catch(error => {
                    this.emitSnackbarUpdate(error);
                });
        },
        emitSnackbarUpdate(response) {
            EventBus.$emit("snackbar-update", response);
        }
    }
};
</script>