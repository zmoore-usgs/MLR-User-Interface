<template>
    <v-card flat>
        <v-card-title>Copy a Location</v-card-title>
        <v-card-text>
            <v-text-field label="Agency Code"></v-text-field>
            <v-text-field label="Site Number"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary">Copy</v-btn>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on" icon class="mx-2">
                        <v-icon>mdi-help-circle</v-icon>
                    </v-btn>
                </template>
                <span>Enter an agency code and site number for an existing site that you'd like to copy. The site will be copied to all NWIS hosts as a result.</span>
            </v-tooltip>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {};
</script>