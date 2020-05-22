<template>
    <div>
        <v-form ref="form" v-model="valid">
            <v-container>
                <v-card flat>
                    <v-card-title>Audit Table</v-card-title>
                    <v-card-text>
                        <v-text-field
                            :rules="[rules.required, rules.dateTimeFormat]"
                            v-model="startDate"
                            label="From"
                        ></v-text-field>
                        <v-text-field
                            :rules="[rules.required, rules.dateTimeFormat]"
                            v-model="endDate"
                            label="To"
                        ></v-text-field>
                        <v-text-field
                            :rules="[ rules.onlyOneCode, rules.twoOrThreeChars]"
                            v-model="districtCode"
                            max-length="3"
                            label="District Code"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :disabled="!valid" color="primary" @click="getAuditTable">Go</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-form>
        <v-dialog hide-overlay width="300" v-model="loading">
            <v-card>
                <v-card-text>
                    Processing your request
                    <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import MonitoringLocationApi from "@/services/api/MonitoringLocationApi.js";

export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            districtCode: "",
            valid: true,
            loading: false,
            rules: {
                required: value => !!value || "Required.",
                dateTimeFormat: value => {
                    const pattern = /^(\d{4}-\d{2}-\d{2})$/;
                    return (
                        pattern.test(value) || "Dates are formatted: YYYY-MM-DD"
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
        getAuditTable() {
            this.validate();
            if (this.valid) {
                this.loading = true;
                MonitoringLocationApi.getByDatesAndOptionalDistrictCode(
                    this.startDate,
                    this.endDate,
                    this.districtCode
                )
                    .then(response => {
                        this.$emit("auditTable", response.data);
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