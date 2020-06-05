<template>
    <v-content>
        <v-row>
            <v-col cols="12">
                <AuditTableRetrieverCard @tableCriteria="showAuditTable" />
            </v-col>
        </v-row>

        <v-card>
            <AuditTable :tableCriteria="tableCriteria" />
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
            tableCriteria: {}
        };
    },

    methods: {
        showAuditTable(tableCriteria) {
            this.tableCriteria = tableCriteria;
        }
    }
};
</script>