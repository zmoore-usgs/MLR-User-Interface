<template>
    <v-card flat>
        <v-card-title>Upload and Process a Ddot file</v-card-title>
        <v-card-text>
            <v-form>
                <v-file-input v-model="ddotFile" label="Select Ddot File to Upload"></v-file-input>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn class="mx-2" color="primary" @click="validateFile">Validate</v-btn>
            <v-btn color="primary">Validate and Update records</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import DdotApi from "@/services/api/DdotApi.js";

export default {
    name: "DdotProcessCard",

    data() {
        return {
            ddotFile: null
        };
    },
    methods: {
        validateFile() {
            DdotApi.postDdot("util/parse", this.ddotFile).then(response => {
                console.log(response);
            });
        }
    }
};
</script>