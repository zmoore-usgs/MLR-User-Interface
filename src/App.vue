<template>
    <v-app>
        <v-app-bar app color="black" dark>
            <v-img
                alt="USGS Logo"
                class="shrink mr-2"
                contain
                :src="require('./assets/usgs_logo.jpg')"
                transition="scale-transition"
                width="150"
            />

            <v-spacer></v-spacer>

            <v-btn href="https://www.usgs.gov" title="Link to main USGS page" text>
                <span class="mr-2">USGS Home</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>

            <v-btn
                href="https://answers.usgs.gov/cgi-bin/gsanswers?tmplt=2"
                title="Link to USGS contact page"
                text
            >
                <span class="mr-2">Contact USGS</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-row>
                <v-col cols="3">
                    <v-card flat>
                        <v-card-title>Upload and Process a Ddot file</v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-file-input label="Select Ddot File to Upload"></v-file-input>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="mx-2" color="primary">Validate</v-btn>
                            <v-btn color="primary">Validate and Update records</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col cols="4">
                    <v-card flat>
                        <v-card-title>Copy a Location</v-card-title>
                        <v-card-text>
                            <v-text-field label="Agency Code"></v-text-field>
                            <v-text-field label="Site Number"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary">Copy</v-btn>
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
                </v-col>
            </v-row>
        </v-content>
        <USGSFooter />
    </v-app>
</template>

<script>
import USGSFooter from "./components/USGSFooter";
import axios from "axios";

export default {
    name: "App",

    components: {
        USGSFooter
    },

    data() {
        return {
            show: false
        };
    },
    created: function() {
        this.readAccessToken();
        let token = sessionStorage.getItem("mlr-access-token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            window.location = axios.defaults.baseURL + "util/login";
        }
    },
    methods: {
        readAccessToken() {
            var accessToken = new URL(location.href).searchParams.get(
                "mlrAccessToken"
            );
            if (accessToken) {
                sessionStorage.setItem("mlr-access-token", accessToken);
                window.history.replaceState({}, document.title, "/");
            }
        }
    }
};
</script>
