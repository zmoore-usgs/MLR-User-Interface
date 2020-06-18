<template>
    <v-card>
        <v-card-title>
            Audit Table
        </v-card-title>

        <v-data-table
            :server-items-length="tableCriteria.totalItems"
            :options.sync="options"
            :loading="loadingTable"
            :headers="headers"
            :items="indexedItems"
            :footer-props="{'items-per-page-options': [5,10,15,20]}"
            :single-expand="true"
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
import MonitoringLocationApi from "@/services/api/MonitoringLocationApi.js";

export default {
    name: "AuditTable",

    components: {
        AuditChangesTable
    },
    props: {
        tableCriteria: Object
    },
    data() {
        return {
            options: {},
            loadingTable: false,
            tableData: [],
            rowsPerPageItems: [5,10,15],
            headers: [
                { text: "Time (UTC)", value: "actionTime", width: "250px" },
                { text: "Agency Code", value: "agencyCode" },
                { text: "Site Number", value: "siteNumber" },
                { text: "District Code", value: "affectedDistricts" },
                { text: "Site Information", value: "siteInformation", sortable: false },
                { text: "Enacted By", value: "username" },
                { text: "Action", value: "action" }
            ],
            expanded: []
        };
    },
    watch: {
        options: {
            handler() {
                this.getTableRows();
            },            
            deep: true
        },
        tableCriteria: {
            handler() {
                this.options.page = 1;
                this.getTableRows();
            },
            deep: true
        }
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
        },
        getTableRows() {
            if(this.tableCriteria.criteria && this.options) {
                this.loadingTable = true;
                MonitoringLocationApi.getLoggedTransactions(
                    this.tableCriteria.criteria,
                    this.options.itemsPerPage,
                    this.options.page,
                    this.options.sortBy ? this.options.sortBy[0] : null,
                    this.options.sortDesc ? (this.options.sortDesc[0] == false ? 'ASC' : 'DESC') : 'DESC'
                )
                .then(response => {
                    for(var index in response.data) {
                        response.data[index].actionTime = new Date(Date.parse(response.data[index].actionTime)).toLocaleString("en-us")
                    }
                    this.tableData = response.data;
                })
                .finally(() => {
                    this.loadingTable = false;
                });
            }
        }
    }
};
</script>