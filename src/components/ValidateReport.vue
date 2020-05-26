<template>
    <div>
        <p
            v-if="report.workflowStatus"
        >{{report.workflowStatus.name}}: {{report.workflowStatus.message}}</p>

        <v-list v-if="report.workflowLevelErrors">
            <v-list-item-subtitle>{{report.workflowLevelErrors.name}}</v-list-item-subtitle>
            <v-list-item v-for="(error, i) in report.workflowLevelErrors.errors" :key="i">
                <v-list-item-content>{{error.name}}: {{error.message}}</v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list v-if="report.siteErrors">
            <v-list-item-subtitle>{{report.siteErrors.name}}</v-list-item-subtitle>
            <v-list-item v-for="(error, i) in report.siteErrors.errors" :key="i">
                <v-list-item-content>{{error.name}} {{error.message}}</v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
    props: {
        report: Object
    }
};
</script>