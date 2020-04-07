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
            transactionTypes: null
        };
    },
    methods: {
        validateButtonClicked() {
            this.parseDdotFile().then(() => {
                this.validateDdotFile();
            });
        },
        uploadButtonClicked() {
            this.parseDdotFile().then(() => {
                this.uploadDdotFile();
            });
        },
        parseDdotFile() {
            return DdotApi.parseDdot(this.ddotFile);
        },
        uploadDdotFile() {
            DdotApi.uploadDdot(this.ddotFile)
                .then(response => {
                    this.emitSnackbarUpdate(response);
                })
                .catch(error => {
                    this.emitSnackbarUpdate(error);
                });
        },
        validateDdotFile() {
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