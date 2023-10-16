<template>
    <div>
      <v-form>
        <v-text-field
              :label="NOTHING"
              placeholder="CATEGORIA"
              outlined
              v-model="amountField"
            ></v-text-field>
        <v-text-field
              :label="NOTHING"
              placeholder="NOVA SOLICITAÇÃO"
              outlined
              v-model="amountField"
            ></v-text-field>
      <v-container>
        <div class="text-h4">
          CAMPOS PADRÃO
        </div>
        <div class="text-h6">
            nome
        </div>
        <div class="text-h6">
            email
        </div>
        <div class="text-h6">
            prioridade
        </div>
        <div class="text-h6">
            filial
        </div>
        <div class="text-h6">
            telefone contato
        </div>
        <div class="text-h6">
            skype
        </div>
        <div class="text-h6">
            mensagem
        </div>
        <div class="text-h4">
          CAMPOS CRIADOS
        </div>
        <div class="text-h6"  v-for="(input, index) in inputs" :key="index">
          {{input.label}}
        </div>
       
      </v-container>
      <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
          <v-text-field
              :label="newField"
              placeholder="Digite nome do novo campo"
              outlined
              v-model="newField"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-btn @click="adicionarCampo(newField)">criar campo</v-btn>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col
            :cols="amountField"
            :sm="amountField"
            :md="amountField"
          >
          <v-text-field
              :label="amountField"
              placeholder="tamanho do campo"
              outlined
              v-model="amountField"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card v-for="(values, index) in formTicketSuport.fieldsNew"
          elevation="2" :key="index"
        >{{values.label}}: {{values.value}}</v-card>
    </v-form>
    
    <v-btn @click="sendMessage()">ENVIAR</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formTicketSuport:{
          name:'',
          number:'',
          fieldsNew:[]
        },

        newField:'',
        
        inputs:[
          
        ],

        input2:[
          {label:'cliente name', value:''},
          {label:'cliente value', value:''},
          {label:'cliente novo', value:''},
          {label:'cliente errado', value:''}
        ]
      }
    },

    methods: {
      sendMessage(){
        this.formTicketSuport.fieldsNew = this.inputs
        console.log("form", this.formTicketSuport)
        
      },
      adicionarCampo(){
        let input={}
        input.label = this.newField
        input.value = ''
        

        this.inputs.push(input)
      }
      
    },
    created() {
      // this.sendData();
    },
  };
  </script>
  