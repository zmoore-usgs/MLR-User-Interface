<template>
    <v-container>
        <span v-if="report.numberSiteSuccess == 1">Station Change Successful</span>
        <span v-if="report.numberSiteSuccess == 0">Station Change Errors:</span>
        <v-list v-if="showWorkflowErrors">
            <v-list-item v-for="(error, i) in report.workflowSteps" :key="i">
                <v-list-item-content>{{error.name}}: {{parsedErrorMessage(error.details)}}</v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list v-if="showSiteErrors">
            <v-list-item v-for="(error, i) in report.sites[0].steps" :key="i">
                <v-list-item v-for="(message, j) in parsedErrorResponse(error.details)" :key="j">
                    <v-list-item-content>{{error.name}}: {{message}}</v-list-item-content>
                </v-list-item>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
export default {
    props: {
        report: { type: Object, required: true }
    },
    computed: {
        showSiteErrors(){ 
            return !this.report.sites[0].success; 
        },
        showWorkflowErrors(){
            return this.report.workflowSteps.length > 0;
        }
    },
    methods: {
        parsedErrorResponse(details){
            var error_message;
            var validation_errors;
            var error_messages = [];
            error_message = this.parsedErrorMessage(details);
            if (error_message.includes('validation_errors')){
                validation_errors = JSON.parse(error_message);
                _.forIn(validation_errors.validation_errors, function(value, key){
                    error_messages.push(value);
                })
            } else {
                error_messages.push(error_message);
            }
            return error_messages;
        },
        parsedErrorMessage(details){
            return JSON.parse(details).error_message;
        }
    }
};
</script>