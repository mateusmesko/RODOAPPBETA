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
                        :value="valueTotal()"
                        label="valor"
                        prefix="$"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-row>

            <!-- <v-col
                md="3"
                v-if="showField('statusPayment')"
            >
                <v-select
                    v-model="propReceived.payment.statusPayment"
                    :items="statusPayment"
                    label="status"
                ></v-select>
            </v-col> -->

            <v-col
                md="3"
                v-if="showField('termsPayment')"
            >
                <v-autocomplete v-if="options"
                    required
                    v-model="propReceived.payment.selectedOption"
                    :items="options"
                    label="Selecione um metodo de pagamento"
                ></v-autocomplete>
                <v-alert v-if="!options"
                        color="blue"
                        type="LOADING"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>
            </v-col>

            <v-col
                md="3"
                v-if="showField('installmentsPayment') && propReceived.payment.selectedOption"
            >
                <v-text-field
                    :value="`${propReceived.payment.selectedOption.QuantityPlots}`"
                    label="Valor de parcela"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col
                md="3"
                v-if="showField('valueInstallmentsPayment') && propReceived.payment.selectedOption && valueTotal()"
            >
                <v-text-field
                    :value="`${valueTotal() / propReceived.payment.selectedOption.QuantityPlots}`"
                    label="Valor de parcela"
                    readonly
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
            options:null,
            isValidLoader : false,
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
           
        }),mounted() {
            this.loadOptionsFromLocalStorage(); 
        },
        methods:{
            loadOptionsFromLocalStorage() {
                const payment = localStorage.getItem('payment');
                let paymentsJson
                if(payment){
                    paymentsJson = JSON.parse(payment)
                } else {
                    let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/fat/v1/paymentcondition/?pageSize=50000`

                    axios.get(API_URL)
                    .then(response => {
                    
                    if (response.status !== 200 ) {
                        console.error('Erro na solicitação:', response.status);
                        throw new Error('Não foi possível acessar a API da TOTVS');
                    }

                    const items = response.data;
                    paymentsJson = items
                    console.log("esta aqyu",paymentsJson)
                    let optionsPayment = []

                    for(let item of paymentsJson.items){
                        if(item.Code[0] == 'C' || item.Code[0] == 'c'){

                            if(optionsPayment){
                                optionsPayment = optionsPayment.concat(item)
                            }
                            else{
                                optionsPayment = item
                            }
                        }
                    }
                    console.log(optionsPayment)

                    this.options = optionsPayment.map(item => ({
                        
                        text:`${item.Description}` ,
                        value: item,
                    }));
                  
                    })
                    .catch(error => {
                    console.error('Erro:', error);
                    });
                
                }
                
                      
       

                if (payment) {
                    let optionsPayment = []

                    for(let item of paymentsJson){
                        console.log(item.Code, item.Description)
                        if(item.Code[0] == 'C' || item.Code[0] == 'c'){
   
                            if(optionsPayment){
                                optionsPayment = optionsPayment.concat(item)
                            }
                            else{
                                optionsPayment = item
                            }
                        }
                    }
                    console.log(optionsPayment)

                    this.options = optionsPayment.map(item => ({
                        
                        text:`${item.Description}` ,
                        value: item,
                    }));
                    
                }

            },

            onItemSelected(){
                this.propReceived.payment.termsPayment = propReceived.payment.selectedOption.code
                console.log(this.propReceived.info.branchRequest)
            },

            customFilter(item, queryText, itemText) {
                const normalizedQuery = queryText.toLowerCase()
                const normalizedItemText = itemText.toLowerCase()
                return normalizedItemText.includes(normalizedQuery) 
            },
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
            valueTotal(){
                let value = 0
                console.log(this.propReceived.products)

                for(let item of this.propReceived.products){
                    value = value + parseFloat(item.valueProduct * item.amontProduct)
                    console.log(item)
                }
                return value
            }
        },
        created(){
            this.propReceived.payment.statusPayment = 'Não pago'
            this.loadOptionsFromLocalStorage()
        
        }
    }
</script>
