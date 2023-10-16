
<template>
    <v-card elevation="2" class="pa-2">
        <v-row>
            <v-col v-if="showField('serialFisco')" sm="2">
                <v-text-field
                    v-model="propReceived.fisco.serialFisco"
                    label="serie(input)"
                ></v-text-field>
            </v-col>

            <v-col v-if="showField('numberFisco')" sm="2" >
                <v-text-field
                    v-model="propReceived.fisco.numberFisco"
                    label="numero(input)"
                ></v-text-field>
            </v-col>

            <v-col v-if="showField('keyFisco')" sm="8" >
                <v-text-field
                    v-model="propReceived.fisco.keyFisco"
                    label="Número da chave da nota"
                ></v-text-field>

                <v-tooltip bottom color="#B3261E   ">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="warning"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-alert-outline
                        </v-icon>
                    </template>
                    
                    <span>
                        <v-icon color="#fff" dark>
                            mdi-alert-outline
                        </v-icon>

                        Validar chave no site da sefaz
                    </span>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { statusNewRequest } from './fields';

    export default {
        name: 'SupplierRequest',
        props:{
            propReceived: Object
        },
        data: () => ({
            newRequestFieldsReturn:{
                serialFisco:true,
                numberFisco:true,
                keyFisco:true,
            },
            confirmedRequest:{
                serialFisco:true,
                numberFisco:true,
                keyFisco:true,
            },
            boughtRequest:{
                serialFisco:true,
                numberFisco:true,
                keyFisco:true,
            },
            receivedRequest:{
                serialFisco:true,
                numberFisco:true,
                keyFisco:true,
            },
            Finalizado:{
                serialFisco:true,
                numberFisco:true,
                keyFisco:true,
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
