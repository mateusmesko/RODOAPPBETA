<template>

        
        <v-card 
          elevation="2"
          class="pa-0 ma-0"
          v-if="product"
        >
        <v-card >
            <v-alert
                text
                prominent
                type="info"
                icon="mdi-cloud-alert"
                v-if="!options"
            >
                Carregando...
            </v-alert>
        </v-card>
        <v-form
            v-if="options"
            ref="form"
            @submit.prevent="submit"
        >
            <v-row>
                <v-col
                    md="3"
                    v-if="showField('selectedOption')"
                >
                    <div>
                        <v-autocomplete
                            required
                            :rules="[rules.numberValid]"
                            v-model="product.selectedOption"
                            :items="options"
                            label="Selecione um produto"
                            :filter="customFilter"
                            @input="onItemSelected"
                        ></v-autocomplete>
                        
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    md="3"
                    v-if="showField('amontProduct')"
                >
                    <v-text-field
                        :rules="rulesField"
                        v-model="product.amontProduct"
                        label="quantidade"
                    ></v-text-field>
                </v-col>

                <v-col
                    md="3"
                    v-if="showField('discountProduct')"
                >
                    <v-text-field
                       
                        :rules="isNumberRule || isNumberPos"
                        v-model="product.discountProduct"
                        
                        prefix="$"
                        label="Desconto"
                    ></v-text-field>
                </v-col>
           
                <v-col
                    md="3"
                    v-if="showField('valueProduct')"
                >
                    <v-text-field
                      
                        :rules="rulesField"
                        v-model="product.valueProduct"
                        prefix="$"
                        label="valor"
                        
                    ></v-text-field>
                    <!-- verificar depois o campo para ter 2 casas decimais -->
                </v-col>
                <v-col
                    md="3"
                    v-if="product.valueProduct && product.amontProduct"
                >
                    <v-text-field
                        :value="`${product.valueProduct * product.amontProduct}`"
                        label="VALOR TOTAL"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    md="3"
                    v-if="showField('observationProduct')"
                >
                    <v-text-field
                        :rules="[rules.required]"
                        v-model="product.observationProduct"
                        label="Observação"
                    ></v-text-field>
                </v-col>
            
                <v-col
                    md="3"
                   
                >
                    <v-text-field
                        :rules="[rules.required]"
                        v-model="product.suggestionProduct"
                        label="Sugestão(link do produto)"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="product.selectedOption">
                <v-col
                    md="3"
                >
                    <v-text-field
                        :value="`${product.selectedOption.Code}`"
                        label="CODIGO DO PRODUTO"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col
                    md="3"
                >
                    <v-text-field
                        :value="`${product.selectedOption.Description}`"
                        label="Descrição de produto"
                        readonly
                    ></v-text-field>
                </v-col>
                  <v-col
                    md="3"
                >
                    <v-text-field
                        :value="`${product.selectedOption.MercosulNomenclature}`"
                        label="NCM"
                        readonly
                    ></v-text-field>
                </v-col>
                
            </v-row>
            <v-row>
                <v-col
                    md="3"
                    v-if="showField('amontShipedProduct')"
                >
                    <v-text-field
                        v-model="product.amontShipedProduct"
                        label="quantidade entregue"
                    ></v-text-field>
                </v-col>

                <v-col
                    md="3"
                    v-if="showField('statusShipProduct')"
                >
                    <v-select
                        :rules="[rules.required]"
                        v-model="product.statusShipProduct"
                        :hint="`${select.state}`"
                        :items="items"
                        :color="select.color"
                        item-text="state"
                        item-value="abbr"
                        label="Status de entrega"
                        persistent-hint
                        return-object
                        single-line
                    ></v-select>
                </v-col>
            </v-row>
                <v-btn 
                    color="green" 
                    @click="saveModal" 
                    :disabled="!formIsValid"
                    elevation="0"
                >
                    <v-icon>
                        mdi-check
                    </v-icon>Salvar
                </v-btn>
            </v-form>
        </v-card>
</template>

<script>
import listProducts from '../../products'
import { statusNewRequest } from './fields';

    export default {
        name: 'ProductRequest',
        props: {
            product: Object
        },
        components:{
            listProducts
            
        },
        data: () => ({
            allProducts : false,
            validNumber : null,
            select: { state: 'Status de entrega'},
            selected: {},
            rules: {
                required: value => !!value || 'Campo obrigatorio.',
                numberValid: value => !value >= 0 || 'Campo aqui.'
            },
            isNumberRule: [
                value => {
                    if (!/[^0-9]/.test(value)) return true
                    return 'Verifique o valor informado em campo'
                },
            ],
            isNumberPos: [
                value => {
                    if (!value >= 0) return true

                    return 'Verifique o valor informado em campo'
                },
            ],
            rulesField: [
                value => {
                if (value) return true

                return 'Campo obrigatorio.'
                },
                value => {
                    if (!/[^0-9]/.test(value)) return true
                    return 'Verifique o valor informado em campo'
                },
            ],
            items: [
                { state: 'Cancelada' ,color: 'red' },
                { state: 'Aguardando', color: 'yellow lighten-1' },
                { state: 'Entregue', color: 'green' },
                { state: 'Entregue parcialmente', color: 'orange' }
            ],
            newRequestFieldsReturn: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: false,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: false,
                statusShipProduct: true
            },

            confirmedRequest: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: false,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: true,
                statusShipProduct: true
            },

            boughtRequest: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: true,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: true,
                statusShipProduct: true
            },

            receivedRequest: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: true,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: true,
                statusShipProduct: true
            },

            Finalizado: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: true,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: true,
                statusShipProduct: true
            },

            selectedOption: null,
            options: null, // Aqui armazenaremos as opções do v-select
            loading: false,
       
            requestStatusNoew: ''
        }),
        computed: {
            formIsValid() {
                return(
                    this.product.selectedOption &&
                    this.product.amontProduct && 
                    this.product.amontProduct >= 0 &&  !isNaN(this.product.amontProduct) &&
                    this.product.valueProduct &&
                    this.product.valueProduct >= 0 &&  !isNaN(this.product.valueProduct) &&
                    this.product.statusShipProduct
                )
            },
           
        },
        mounted() {
            this.loadOptionsFromLocalStorage(); 
        },
        methods:{
            
            valueAmont(){
                console.log('teste aqui')
                this.product.amontProduct
                this.product.amontProduct = this.product.amontProduct.replace(/[^0-9.]/g, '');

                // Substituir vírgulas (,) por pontos (.)
                this.product.amontProduct = this.product.amontProduct.replace(/,/g, '.');

                // Impedir números negativos
                if (this.product.amontProduct < 0) {
                    this.product.amontProduct = '';
                }
            },
            loadOptionsFromLocalStorage() {
                
                const produtos = localStorage.getItem('apiData1');
                const produtos2 = localStorage.getItem('apiData2');
                const produtos3 = localStorage.getItem('apiData4');
                
              
                if (produtos) {
                    let options1 = JSON.parse(produtos).map(item => ({
                        text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()}` ,
                        value: item,
                    }));
                    this.options = options1
                } else {
                    let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/retail/v1/retailItem?page=1&pageSize=10000&fields=code,description,MercosulNomenclature`
                    axios.get(API_URL)
                        .then(response => {
                        
                        if (response.status !== 200 ) {
                            console.error('Erro na solicitação:', response.status);
                            window.alert('erro em RPO SOLICITE SUPORTE')
                            throw new Error('Não foi possível acessar a API da TOTVS');

                        }
                    
                         
                            const items = response.data.items;
                            console.log(items)
                            let options1 = items.map(item => ({
                                text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()} -> ` ,
                                value: item,
                            }));
                            
                            this.options =this.options? this.options.concat(options1) : this.options = options1
                    
                        })
                            .catch(error => {
                            console.error('Erro:', error);
                        });
                        console.log('teste')
                }
                if (produtos2){
                    let options2 = JSON.parse(produtos2).map(item => ({
                        text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()} ` ,
                        value: item,
                    }));
                    this.options = this.options.concat(options2)
                }else {
                    let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/retail/v1/retailItem?page=2&pageSize=10000&fields=code,description,MercosulNomenclature`
                    axios.get(API_URL)
                        .then(response => {
                        
                        if (response.status !== 200 ) {
                            console.error('Erro na solicitação:', response.status);
                            window.alert('erro em RPO SOLICITE SUPORTE')
                            throw new Error('Não foi possível acessar a API da TOTVS');

                        }
                    
                         
                            const items = response.data.items;
                            console.log(items)
                            let options1 = items.map(item => ({
                                text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()} -> ` ,
                                value: item,
                            }));
                            
                            this.options =this.options? this.options.concat(options1) : this.options = options1
                    
                        })
                            .catch(error => {
                            console.error('Erro:', error);
                        });
                        console.log('teste')
                }
                if (produtos3){
                    let options3 = JSON.parse(produtos3).map(item => ({
                        text: `${item.Code.trim()} -> ${item.Description.trim()} ->${item.MercosulNomenclature.trim()} ` ,
                        value: item,
                    }));
                    this.options = this.options.concat(options3)

                }else {
                    let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/retail/v1/retailItem?page=3&pageSize=10000&fields=code,description,MercosulNomenclature`
                    axios.get(API_URL)
                        .then(response => {
                        
                        if (response.status !== 200 ) {
                            console.error('Erro na solicitação:', response.status);
                            window.alert('erro em RPO SOLICITE SUPORTE')
                            throw new Error('Não foi possível acessar a API da TOTVS');

                        }
                    
                         
                            const items = response.data.items;
                            console.log(items)
                            let options1 = items.map(item => ({
                                text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()} -> ` ,
                                value: item,
                            }));
                            
                            this.options =this.options? this.options.concat(options1) : this.options = options1
                    
                        })
                            .catch(error => {
                            console.error('Erro:', error);
                        });
                        console.log('teste')
                }
                if (true){
                    let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/retail/v1/retailItem?page=3&pageSize=10000&fields=code,description,MercosulNomenclature`
                    axios.get(API_URL)
                        .then(response => {
                        
                        if (response.status !== 200 ) {
                            console.error('Erro na solicitação:', response.status);
                            window.alert('erro em RPO SOLICITE SUPORTE')
                            throw new Error('Não foi possível acessar a API da TOTVS');

                        }
                    
                         
                            const items = response.data.items;
                            console.log(items)
                            let options4 = items.map(item => ({
                                text: `${item.Code.trim()}-> ${item.Description.trim()} -> ${item.MercosulNomenclature.trim()} -> ` ,
                                value: item,
                            }));
                            
                            this.options = this.options.concat(options4)
                    
                        })
                            .catch(error => {
                            console.error('Erro:', error);
                        });
                        
                }
                this.allProducts = true
                    
            },

             
            onItemSelected(){
                this.product.codeProduct = this.product.selectedOption.Code
                this.product.nameProduct = this.product.selectedOption.Description
                console.log(this.product.selectedOption)
                let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/retail/v1/retailItem?page=1&pageSize=1&Code=${this.product.selectedOption.Code}`
                
                axios.get(API_URL)
                    .then(response => {
                
                if (response.status !== 200 ) {
                    console.error('Erro na solicitação:', response.status);
                    window.alert('erro em RPO SOLICITE SUPORTE')
                    throw new Error('Não foi possível acessar a API da TOTVS');
                }
                    const items = response.data;
                    console.log("produto selecionado",items)
                    this.product.valueProduct = items.SalesPrice
                })
                    .catch(error => {
                    console.error('Erro:', error);
                });
            },

            customFilter(item, queryText, itemText) {
                const normalizedQuery = queryText.toLowerCase()
                const normalizedItemText = itemText.toLowerCase()
                return normalizedItemText.includes(normalizedQuery) 
            },

            saveModal() {
                this.$emit('save');
            },

            showField(field){
                const statusAndFieldValid = statusDefine => {
                    const listStatus = {
                        newRequest: this.fieldReturn(field, (this.newRequestFieldsReturn)),   
                    }
                    return listStatus[statusDefine]
                }
                return statusAndFieldValid(this.requestStatusNoew)
            },
            fieldReturn(field, returnRequest) {
                const newRequestFields = statusDefine => {
                    const listStatus = returnRequest
                    return listStatus[statusDefine]
                }
                return newRequestFields(field)
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
                
    		    return statusAndFieldValid( this.requestStatusNoew)
            },
        },

        created(){

            let requestGet = localStorage.getItem('status');
            this.requestStatusNoew = JSON.parse(requestGet)
            console.log( JSON.parse(requestGet) )
        }
    }
</script>
