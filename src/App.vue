<template>
    <v-app>
        <USGSHeaderBar />

        <v-content>
            <v-row>
                <v-col>
                    <DdotProcessCard />
                </v-col>
                <v-divider vertical color="black"></v-divider>
                <v-col>
                    <CopyLocationCard />
                </v-col>
            </v-row>
        </v-content>
        <USGSFooter />
    </v-app>
</template>

<script>
import USGSFooter from "./components/USGSFooter";
import USGSHeaderBar from "./components/USGSHeaderBar";
import DdotProcessCard from "./components/DdotProcessCard";
import CopyLocationCard from "./components/CopyLocationCard";
import axios from "axios";

export default {
    name: "App",

    components: {
        USGSFooter,
        USGSHeaderBar,
        DdotProcessCard,
        CopyLocationCard
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
