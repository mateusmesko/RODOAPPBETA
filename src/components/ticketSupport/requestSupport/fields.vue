<template>
    <div>
        <v-text-field
            :label="field.name"
            :placeholder="field.name"
            outlined
            v-model="field.value"
        ></v-text-field>
    </div>
</template>
<script>
export default {
    props:{
        field: Array
    }
}
</script>