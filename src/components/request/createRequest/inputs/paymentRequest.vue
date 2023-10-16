<template>

        <v-card
          elevation="2"
          class="pa-2"
        >
      
        <v-row>
         
            <v-col
                v-if="showField('valuePayment')"
                md="3"            
            >
                <v-text-field
                    v-model="propReceived.payment.valuePayment"
                    prefix="$"
                    label="valor"
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
                v-if="showField('statusPayment')"
            >
                <v-select
                    v-model="propReceived.payment.statusPayment"
                    :items="statusPayment"
                    label="status"
                ></v-select>
            </v-col>

            <v-col
                md="3"
                v-if="showField('termsPayment')"
            >
                <v-select
                    v-model="propReceived.payment.termsPayment"
                    :items="methodPayment"
                    label="Condição de pagamento"
                ></v-select>
            </v-col>

            <v-col
                md="3"
                v-if="showField('installmentsPayment')"
            >
                <v-select
                    v-model="propReceived.payment.installmentsPayment"
                    :items="mutiplayerPayment"
                    label="Numero de parcelas"
                ></v-select>
            </v-col>

            <v-col
                md="3"
                v-if="showField('valueInstallmentsPayment')"
            >
                <v-text-field
                    v-model="propReceived.payment.valueInstallmentsPayment"
                    prefix="$"
                    label="valor parcela"
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
                v-if="showField('observationPayment')"
            >
                <v-text-field
                    v-model="propReceived.payment.observationPayment"
                    label="observação"
                ></v-text-field>
            </v-col>
        </v-row>
      </v-card>

</template>

<script>
import { statusNewRequest } from './fields';
    export default {
        name: 'PaymentRequest',
        props:{
            propReceived: Object
        },
        data: () => ({
            mutiplayerPayment: ['1x', '2x', '3x', '4x'],
            methodPayment: ['boleto', 'cartao', 'pix', 'permuta'],
            statusPayment:['Pago', 'Não pago', 'Parcialmente pago', 'Aguardando pagamento'],

            newRequestFieldsReturn:{
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },
            newRequestFieldsReturn: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            confirmedRequest: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            boughtRequest: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            receivedRequest: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
            },

            Finalizado: {
                valuePayment:               true,
                statusPayment:              true,
                termsPayment:               true,
                installmentsPayment:        true,
                valueInstallmentsPayment:   true,
                observationPayment:         true,
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
