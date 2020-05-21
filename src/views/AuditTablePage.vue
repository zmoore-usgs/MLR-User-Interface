<template>
    <v-content>
        <v-row>
            <v-col cols="4">
                <AuditTableRetrieverCard @auditTable="showAuditTable" />
            </v-col>
            <v-divider vertical color="black"></v-divider>
        </v-row>

        <v-card v-if="auditTable.length != 0">
            <AuditTable v-if="auditTable" :tableData="auditTable" />
        </v-card>
    </v-content>
</template>

<script>
import AuditTable from "@/components/AuditTable";
import AuditTableRetrieverCard from "@/components/AuditTableRetrieverCard";

export default {
    name: "AuditTablePage",

    components: {
        AuditTable,
        AuditTableRetrieverCard
    },

    data() {
        return {
            auditTable: []
        };
    },

    methods: {
        showAuditTable(auditTable) {
            this.auditTable = auditTable;
        }
    }
};
</script>