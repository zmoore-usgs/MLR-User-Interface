<template>
    <v-app>
        <USGSHeaderBar />
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
