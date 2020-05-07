<template>
    <v-card flat>
        <v-card-title>Station Change</v-card-title>
        <v-card-text>
            <v-form
                ref="stationChangeForm"
                v-model="validForm"
                lazy-validation
                >
                <v-row>
                     <v-col cols="2" sm="6" md="4">
                        <v-text-field
                            v-model="oldAgencyCode"
                            :rules="requiredRules"
                            label="Agency Code"
                            required
                        ></v-text-field>
                     </v-col>
                     <v-col cols="2" sm="6" md="6">
                        <v-text-field
                            v-model="oldSiteNumber"
                            :rules="requiredRules"
                            label="Site Number"
                            required
                        ></v-text-field>
                     </v-col>
                </v-row>
                <v-row>
                     <v-col cols="2" sm="6" md="4">
                        <v-text-field
                            v-model="newAgencyCode"
                            :rules="requiredRules"
                            label="New Agency Code"
                            required
                        ></v-text-field>
                     </v-col>
                    <v-col cols="2" sm="6" md="6">
                        <v-text-field
                            v-model="newSiteNumber"
                            :rules="requiredRules"
                            label="New Site Number"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                <v-text-field
                    v-model="reasonText"
                    :counter="64"
                    :rules="validReasonText"
                    label="Reason for change"
                    required
                ></v-text-field>
                </v-row>
                </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="updatePrimaryKey">Station Change</v-btn>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on" icon class="mx-2">
                        <v-icon>mdi-help-circle</v-icon>
                    </v-btn>
                </template>
                <span>Enter the old agency code and site number and the new agency code and site number, and the reason for an existing site that you'd like to update the primary key for.</span>
            </v-tooltip>
        </v-card-actions>
    </v-card>
</template>

<script>
import _ from "lodash";
import LegacyLocationApi from "@/services/api/LegacyLocationApi.js";
import { EventBus } from "@/components/EventBus.js";

export default {
    name: "UpdatePrimaryKeyCard",

    data() {
        return {
            validForm: true,
            oldAgencyCode: "",
            oldSiteNumber: "",
            newAgencyCode: "",
            newSiteNumber: "",
            reasonText:"",
            requiredRules: [
                field => !!field || 'Item is required'
            ],
            validReasonText: [
                text => !!text || 'Item is required',
                text => text && /^[0-9a-zA-Z ]+$/.test(text) || 'Reason text must contain only letters, numbers and spaces.'
            ]
        };
    },
    methods: {
        updatePrimaryKey() {
            this.validForm = this.$refs.stationChangeForm.validate();
            if(this.validForm) {
                LegacyLocationApi.postChange(this.oldAgencyCode, this.oldSiteNumber, this.newAgencyCode, this.newSiteNumber, this.reasonText)
                    .then(response => {
                        this.$emit("change-workflow", response.data);
                    })
                    .catch(error => {
                        this.$emit("change-workflow", response.data);
                    });

            }
        }
    }
};
</script>