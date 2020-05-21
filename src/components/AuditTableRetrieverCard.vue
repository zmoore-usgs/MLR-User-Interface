<template>
    <v-card flat>
        <v-card-title>Audit Table</v-card-title>
        <v-card-text>
            <v-text-field v-model="startDate" label="From"></v-text-field>
            <v-text-field v-model="endDate" label="To"></v-text-field>
            <v-text-field v-model="districtCodes" label="District Codes"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="getAuditTable">Go</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import MonitoringLocationApi from "@/services/api/MonitoringLocationApi.js";

export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            districtCodes: []
        };
    },
    methods: {
        getAuditTable() {
            MonitoringLocationApi.getByDatesAndOptionalDistrictCodes(
                this.startDate,
                this.endDate,
                this.districtCodes
            ).then(response => {
                this.$emit("auditTable", response.data);
            });
        }
    }
};
</script>