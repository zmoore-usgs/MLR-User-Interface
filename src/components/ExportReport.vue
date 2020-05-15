<template>
    <v-container>
        <span>{{successMessage}}</span>
        <v-list dense>
            <v-list-item v-for="(error, i) in report.exportWorkflowErrors.errors" :key="i">
                <v-list-item-content>{{error.name}} {{error.message}}</v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
export default {
    props: {
        report: Object
    },
    computed: {
        successMessage(){
            if (this.report.exportWorkflowErrors.errors.length == 0){
                return "Copy Success"
            } else {
                return null
            }

        }
    }
};
</script>