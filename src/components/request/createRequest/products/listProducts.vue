<template>
    <tr>
        <td>{{ product.nameProduct }}</td>
        <td>{{ product.valueProduct }}</td>
        <td>{{ product.amontProduct }}</td>
        <td >{{ product.amontShipedProduct }}</td> 
        <v-alert :color="product.statusShipProduct.color">{{ product.statusShipProduct.state }}</v-alert>

        <td>
            <v-btn
                @click="editProduct"
                icon
                color="blue"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn
                @click="deleteProduct"
                icon
                color="red"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </td>
    </tr>
</template>

<script>
    export default {
        name: 'ListProducts',
        props:{
            product: Object,
            index: Number,
        },

        data: () => ({
        
        }),
        methods:{
            deleteProduct(){
                const newId = this.index
                this.eventEmit('delete',newId)
            },
            editProduct(){
                const newId = this.index
                this.eventEmit('edit',newId)
            },
            eventEmit(event,newId){
                this.$emit(event, newId)
            }
        }
    }
</script>