<template>

        
        <v-card 
          elevation="2"
          class="pa-0 ma-0"
          v-if="product"
        >
        <v-form
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
                            :rules="[rules.required]"
                            v-model="product.selectedOption"
                            :items="options"
                            label="Selecione um produto"
                            :filter="customFilter"
                            @input="onItemSelected"
                        ></v-autocomplete>
                    </div>
                </v-col>
                
                <v-col
                    md="3"
                    v-if="showField('amontProduct')"
                >
                    <v-text-field
                      
                        :rules="[rules.required]"
                        v-model="product.amontProduct"
                        label="quantidade"
                    ></v-text-field>
                </v-col>

                <v-col
                    md="3"
                    v-if="showField('discountProduct')"
                >
                    <v-text-field
                       
                        :rules="[rules.required]"
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
                      
                        :rules="[rules.required]"
                        v-model="product.valueProduct"
                        prefix="$"
                        label="valor"
                    ></v-text-field>
                    <!-- verificar depois o campo para ter 2 casas decimais -->
                </v-col>
                    
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
            select: { state: 'Status de entrega'},
            selected: {},
            rules: {
                required: value => !!value || 'Campo obrigatorio.',
            },
            items: [
                { state: 'Cancelada' ,color: 'red' },
                { state: 'Aguardando', color: 'yellow lighten-1' },
                { state: 'Entregue', color: 'green' },
                { state: 'Entregue parcialmente', color: 'orange' }
            ],
            newRequestFieldsReturn: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: true,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: true,
                statusShipProduct: true
            },
            newRequestFieldsReturn: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: true,
                valueProduct: true,
                observationProduct: true,
                suggestionProduct: true,
                amontShipedProduct: true,
                statusShipProduct: true
            },

            confirmedRequest: {
                selectedOption: true,
                amontProduct: true,
                discountProduct: true,
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
            options: [], // Aqui armazenaremos as opções do v-select
            loading: false,
       
            requestStatusNoew: ''
        }),
        computed: {
            formIsValid() {
                return(
                    this.product.selectedOption &&
                    this.product.amontProduct &&
                    this.product.reasonProduct &&
                    this.product.statusShipProduct
                )
            }
        },
        mounted() {
            this.loadOptionsFromLocalStorage(); 
        },
        methods:{
            loadOptionsFromLocalStorage() {
                const produtos = localStorage.getItem('apiData');

                if (produtos) {
                    this.options = JSON.parse(produtos).map(item => ({
                        text: `${item.Code} -> ${item.Description}` ,
                        value: item,
                    }));
                }
            },

            onItemSelected(){
                this.product.codeProduct = this.product.selectedOption.Code
                this.product.nameProduct = this.product.selectedOption.Description
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
