<template>
    <v-app-bar app color="black" dark>
        <v-img
            alt="USGS Logo"
            class="shrink mr-2"
            contain
            :src="require('../assets/usgs_logo.jpg')"
            transition="scale-transition"
            width="150"
        />

        <v-spacer></v-spacer>
        <v-btn to="/sites" class="mx-2">Monitoring Location Management</v-btn>
        <v-btn to="/auditTable" class="mx-2">Audit Table</v-btn>
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
</template>
<script>
export default {
    name: "USGSHeaderBar"
};
</script>