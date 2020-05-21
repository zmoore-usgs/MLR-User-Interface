<template>
    <v-card>
        <v-card-title>
            Audit Table
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="indexedItems"
            :single-expand="true"
            :search="search"
            :expanded.sync="expanded"
            show-expand
            item-key="id"
        >
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <AuditChangesTable :changesData="item" />
                </td>
            </template>
            <template v-slot:item.siteInformation="{ item }">
                <td>
                    <a
                        :href="getSiteInformationLink(item.agencyCode,item.siteNumber)"
                        target="_blank"
                    >Link</a>
                </td>
            </template>
            <template v-slot:item.action="{ item }">
                <td>{{ readActionShorthand(item.action) }}</td>
            </template>
            <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
                <v-btn @click="expand(true)" v-if="item.changes.length != 0 && !isExpanded">Expand</v-btn>
                <v-btn @click="expand(false)" v-if="isExpanded">close</v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import axios from "axios";
import AuditChangesTable from "@/components/AuditChangesTable";

export default {
    name: "AuditTable",

    components: {
        AuditChangesTable
    },

    props: {
        tableData: Array
    },
    data() {
        return {
            search: "",
            headers: [
                { text: "Site Number", value: "siteNumber" },
                { text: "Site Information", value: "siteInformation" },
                { text: "Agency Code", value: "agencyCode" },
                { text: "District Code", value: "affectedDistricts" },
                { text: "Enacted By", value: "username" },
                { text: "Change", value: "action" }
            ],
            expanded: []
        };
    },
    computed: {
        indexedItems() {
            return this.tableData.map((item, index) => ({
                id: index,
                ...item
            }));
        }
    },
    methods: {
        readActionShorthand(action) {
            if (action === "I") {
                return "Add";
            } else if (action === "U") {
                return "Update";
            } else if (action === "D") {
                return "Delete";
            }
            return null;
        },
        getSiteInformationLink(agencyCode, siteNumber) {
            return (
                axios.defaults.baseURL +
                "monitoringLocations?agencyCode=" +
                agencyCode +
                "&siteNumber=" +
                siteNumber
            );
        }
    }
};
</script>