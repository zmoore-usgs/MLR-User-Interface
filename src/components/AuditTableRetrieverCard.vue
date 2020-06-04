<template>
    <v-card flat>
        <v-card-title>Search Criteria</v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-row>
                    <v-col cols="2">
                        <v-row no-gutters>
                            <v-col>
                                <v-text-field
                                    :rules="[rules.dateTimeFormat]"
                                    v-model="criteria.startDate"
                                    label="From Date"
                                    hint="YYYY-MM-DD"
                                ></v-text-field>
                            </v-col>
                            <v-col md="1"></v-col>
                            <v-col>
                                <v-text-field
                                    :rules="[rules.dateTimeFormat]"
                                    v-model="criteria.endDate"
                                    label="To Date"
                                    hint="YYYY-MM-DD"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            v-model="criteria.agencyCode"
                            label="Agency Code"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            v-model="criteria.siteNumber"
                            label="Site Number"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            :rules="[rules.onlyOneCode, rules.twoOrThreeChars]"
                            v-model="criteria.districtCode"
                            label="District Code"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            v-model="criteria.username"
                            max-length="3"
                            label="Enacted By"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select
                            :items="actionItems"
                            item-text="text"
                            item-value="value"
                            v-model="criteria.action"
                            label="Action"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-form>
            <v-btn :disabled="!valid" color="primary" @click="updateAuditTable">Go</v-btn>
        </v-card-text>
        <v-dialog hide-overlay width="300" v-model="loading">
            <v-card>
                <v-card-text>
                    Processing your request
                    <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import MonitoringLocationApi from "@/services/api/MonitoringLocationApi.js";

export default {
    data() {
        return {
            criteria: {
                startDate: "",
                endDate: "",
                districtCode: "",
                username: "",
                action: "",
                siteNumber: "",
                agencyCode: ""
            },
            actionItems: [
                {
                    text: 'Any',
                    value: ''
                },
                {
                    text: 'Add',
                    value: 'I'
                },
                {
                    text: 'Update',
                    value: 'U'
                },
                {
                    text: 'Delete',
                    value: 'D'
                }
            ],
            valid: true,
            loading: false,
            rules: {
                required: value => !!value || "Required.",
                dateTimeFormat: value => {
                    const pattern = /^(\d{4}-\d{2}-\d{2})$/;
                    return (
                        (value.length == 0 || pattern.test(value)) || "Dates are formatted: YYYY-MM-DD"
                    );
                },
                onlyOneCode: value => {
                    const pattern = /^(|[0-9]*)$/;
                    return (
                        pattern.test(value) ||
                        "Only one district code. Only numeric characters."
                    );
                },
                twoOrThreeChars: value =>
                    value.length === 0 ||
                    (value.length > 1 && value.length <= 3) ||
                    "District codes are 2 or 3 characters."
            }
        };
    },
    methods: {
        updateAuditTable() {
            this.validate();
            if (this.valid) {
                this.loading = true;
                MonitoringLocationApi.getLoggedTransactionsCount(
                    this.criteria
                ).then(response => {
                    this.$emit("tableCriteria", {
                        totalItems: response.data,
                        criteria: JSON.parse(JSON.stringify(this.criteria))
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        },
        validate() {
            this.$refs.form.validate();
        }
    }
};
</script>