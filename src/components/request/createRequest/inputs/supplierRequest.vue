<template>
        <v-card
          elevation="2"
          class="pa-2"
        >
            <v-row>
                <v-col md="6"
                    v-if="showField('dateShipedSupplier') "
                >
                    <!-- <v-text-field
                        v-model="propReceived.supplier.cnpj"
                        label="informe o cnpj"
                    ></v-text-field> -->
                    <v-autocomplete 
                        v-if="cnpjOptions.length >0"
                        required
                        v-model="propReceived.supplier.selectedOptionCnpj"
                        :items="cnpjOptions"
                        label="Selecione um CNPJ"
                        :filter="customFilter"
                        @input="onItemSelectedCnpj"
                    ></v-autocomplete>

                    <v-alert v-if="!cnpjOptions.length >0"
                        color="blue"
                        type="LOADING"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>
                </v-col>
                <v-col md="6"
                    v-if="showField('nameSupplier')" 
                >
                    <v-autocomplete v-if="cnpjOptions.length >0 && options && options.length > 1"
                        required
                        v-model="propReceived.supplier.selectedOption"
                        :items="options"
                        label="Selecione um fornecedor"
                        :filter="customFilter"
                        @input="onItemSelectedVendor"
                    ></v-autocomplete>

                
                     <v-alert  v-if="!options && !propReceived.supplier.selectedOptionCnpj"
                        outlined
                        type="warning"
                        
                        border="left"
                    >
                        SELECIONE UM CNPJ
                    </v-alert>

                    <v-alert v-if="!options && propReceived.supplier.selectedOptionCnpj"
                        color="blue"
                        type="LOADING"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>

                    <!-- <v-alert v-if="options && options.length == 1 && propReceived.supplier.selectedOptionCnpj"
                        color="green"
                        type="LOADING"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert> -->

                    <v-text-field v-if="options && options.length == 1 && propReceived.supplier.selectedOptionCnpj"
                        :value="`${propReceived.supplier.selectedOption.numero} -> ${propReceived.supplier.selectedOption.fornecedor}`"
                        label="SELECIONE UM FORNECEDOR"
                        readonly
                    ></v-text-field>
                   
                </v-col>
                <v-col md="6"
                    v-if="true"
                >
                    <v-text-field
                        v-model="propReceived.supplier.nameVendor"
                        label="Nome do vendedor"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="false">
              
                <v-col md="6"
                    v-if="showField('dateShipedSupplier')"
                >
                    <v-text-field
                        v-model="propReceived.supplier.dateShipedSupplier"
                        label="Data de entrega(input)"
                    ></v-text-field>
                </v-col>

                <v-col md="6"
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
            fornecedor: ['0001', '0002', '0003', '0004'],
            show:false,
            options:null,
            cnpjOptions:[],
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
         mounted() {
            this.loadOptionsFromLocalStorage(); 
            this.loadOptionsFromLocalStorageCnpj()
        },
        methods:{
           

            takeVendor(CNPJ){
                this.show = false
                console.log("TESTE",CNPJ)
                let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/fornecedores/`
              
                axios.get(API_URL,{
                    method: 'GET',
                    headers: {
                        'cpfCnpjForn': CNPJ
                    }
                })
                    .then(response => {
                    
                    if (response.status !== 200 ) {
                        console.error('Erro na solicitação:', response.status);
                        throw new Error('Não foi possível acessar a API da TOTVS');
                    }

                    const items = response;

                    console.log("fornecedor",items.data)
                    localStorage.setItem('vendor', JSON.stringify(items.data));
                    console.log(items.data.length)

                    if(items.data.length == 1){
                        console.log("aquiii o", items.data[0])
                        // this.propReceived.supplier.nameSupplier =
                        console.log(this.propReceived.supplier.selectedOption) 
                        this.propReceived.supplier.selectedOption = items.data[0]
                    }
                    if(items.data){
                        this.loadOptionsFromLocalStorage(); 
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
                this.show = true

            },  

            

            onItemSelectedVendor(){
                
                this.propReceived.supplier.nameSupplier = this.propReceived.supplier.selectedOption.numero
            },
            onItemSelectedCnpj(){
                this.options = null
                this.propReceived.supplier.nameSupplier = null
                this.propReceived.supplier.cnpj = this.propReceived.supplier.selectedOptionCnpj.cnpj
                this.takeVendor(this.propReceived.supplier.cnpj)
            },
            customFilter(item, queryText, itemText) {
                const normalizedQuery = queryText.toLowerCase()
                const normalizedItemText = itemText.toLowerCase()
                return normalizedItemText.includes(normalizedQuery) 
            },

            loadOptionsFromLocalStorage() {
                const requestItensGetApiSolicited = localStorage.getItem('vendor');

                if (requestItensGetApiSolicited) {
                    console.log(requestItensGetApiSolicited)
                    this.options = JSON.parse(requestItensGetApiSolicited).map(item => ({
                        text: `${item.numero} -> ${item.fornecedor}` ,
                        value: item,
                    }));
                }
            },

            loadOptionsFromLocalStorageCnpj() {
                const requestItensGetApiSolicited = localStorage.getItem('cnpjVendor')
                console.log("veja se foi",requestItensGetApiSolicited)
                if (requestItensGetApiSolicited) {
                   
                    this.cnpjOptions = JSON.parse(requestItensGetApiSolicited).map(item => ({
                        
                        text: `${item.cnpj}` ,
                        value: item,
                    }));
                }else {
                    let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/cnpjFornecedores/`

                    axios.get(API_URL)
                    .then(response => {

                        if (response.status !== 200 ) {
                            console.error('Erro na solicitação:', response.status);
                            throw new Error('Não foi possível acessar a API da TOTVS');
                        }

                        const items = response.data;
                        this.cnpjOptions = items.map(item => ({
                            
                            text: `${item.cnpj}` ,
                            value: item,
                        }));
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
                }
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
        },
        created(){
            this.loadOptionsFromLocalStorageCnpj()
        }
    }
</script>





