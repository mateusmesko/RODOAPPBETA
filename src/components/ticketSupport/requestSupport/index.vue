<template>
    <div>
      <v-form>
      <v-container>
        <v-autocomplete
            v-model="select"
            :hint="`${select.state}, ${select.abbr}`"
            :items="items"
            item-text="state"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
            filled
            rounded
            fixed
        ></v-autocomplete>
        
        <div class="text-h4">
          CAMPOS PADRÃO
        </div>

        <fields :field="item" v-for="(item, index) in formTicketSuport" :key="index"/>

        
        <div class="text-h6">
          Campos editados
        </div>
        <v-text-field  v-for="(input, index) in input2" :key="index"
            :label="input.label"
            :placeholder="input.label"
            outlined
            v-model="input.value"
        ></v-text-field>
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
              autofocus
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
       
        <v-card v-for="(values, index) in formTicketSuport.fieldsNew" :key="index"
          elevation="2"
        >{{values.label}}: {{values.value}}</v-card>
    </v-form>
    
    <v-btn @click="sendMessage()">ENVIAR</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import fields from './fields.vue';
  
  export default {
    components:{
		fields,
	},
    data() {
      return {
        select: { state: 'novo acesso', abbr: 'TI - A' },
      items: [
        { state: 'novo acesso', abbr: 'TI - A' },
        { state: 'sem acesso', abbr: 'TI - B' },
        { state: 'teste de acesso', abbr: 'TI - C' },
        { state: 'cancelar acesso', abbr: 'PROTHEUS - A' },
        { state: 'n tem acesso', abbr: 'PROTHEUS - B' },
      ],
        formTicketSuport:[
            {name:"nome",value:""},
            {name:"email",value:""},
            {name:"prioridade",value:""},
            {name:"filial",value:""},
            {name:"telefone contato",value:""},
            {name:"skype",value:""},
            {name:"assunto",value:""},
            {name:"mensagem",value:""}
        ],
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
        this.formTicketSuport.fieldsNew = this.input2
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
  