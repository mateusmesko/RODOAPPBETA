<template>
        <v-card
          elevation="2"
          class="pa-2"
        >
            <v-row>
                <v-col md="3"
                    v-if="showField('nameSupplier')"
                >
                    <v-text-field
                        v-model="propReceived.supplier.nameSupplier"
                        label="Fornecedor(input)"
                    ></v-text-field>
                </v-col>

                <v-col md="3"
                    v-if="showField('dateShipedSupplier')"
                >
                    <v-text-field
                        v-model="propReceived.supplier.dateShipedSupplier"
                        label="Data de entrega(input)"
                    ></v-text-field>
                </v-col>

                <v-col md="3"
                    v-if="showField('valueShipedSupplier')"
                >
                    <v-text-field
                        v-model="propReceived.supplier.valueShipedSupplier"
                        label="Valor frete(input)"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
import { statusNewRequest } from './fields';

    export default {
        props:{
            propReceived: Object
        },
        name: 'SupplierRequest',

        data: () => ({
            newRequestFieldsReturn:{
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },
            newRequestFieldsReturn: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            confirmedRequest: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            boughtRequest: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            receivedRequest: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            },

            Finalizado: {
                nameSupplier: true,
                dateShipedSupplier: true,
                valueShipedSupplier: true
            }
        }),
        methods:{
            showField(field){ 
                const statusAndFieldValid = statusDefine =>{
                    const listStatus = {
                        newRequest: statusNewRequest(field, this.newRequestFieldsReturn),
                        confirmedRequest: statusNewRequest(field, this.confirmedRequest),
                        boughtRequest: statusNewRequest(field, this.boughtRequest),
                        receivedRequest: statusNewRequest(field, this.receivedRequest),
                        Finalizado: statusNewRequest(field, this.Finalizado),
                    }

                    return listStatus[statusDefine]
                }
                
    		    return statusAndFieldValid( this.propReceived.status)
            },
        }
    }
</script>





