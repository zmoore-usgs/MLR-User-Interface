<template>
    <v-list>
        <v-list-item v-for="(error, i) in report.exportWorkflowErrors.errors" :key="i">
            <v-list-item-content>{{error.name}} {{error.message}}</v-list-item-content>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    props: {
        report: Object
    }
};
</script>