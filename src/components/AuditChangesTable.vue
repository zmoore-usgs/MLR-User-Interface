<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Column</th>
                    <th class="text-left">Old Value</th>
                    <th class="text-left">New Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(change,index) in changesData.changes" :key="index">
                    <td>{{ change.column }}</td>
                    <td>{{ change.oldValue }}</td>
                    <td>{{ change.newValue }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script>
export default {
    name: "AuditChangesTable",
    props: {
        changesData: Object
    }
};
</script>