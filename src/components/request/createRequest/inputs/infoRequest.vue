<template #app>
  <v-card
    elevation="2"
    class="pa-2"
  >
    <v-row>
        <v-col md="12">
          <div>
            <v-autocomplete
              required
              v-model="propReceived.info.selectedOption"
              :items="options"
              label="Selecione uma filial"
              :filter="customFilter"
              @input="onItemSelected"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          md="6"
          v-if="showField('userRequest')"
        >
          <v-text-field
            v-model="propReceived.info.userRequest"
            label="Solicitante"
          ></v-text-field>
        </v-col>

        <v-col
          md="6"
          v-if="true"
        >
          <v-text-field
            v-model="propReceived.info.rateio"
            label="raio de despesa"
          ></v-text-field>
        </v-col>

        <v-col
          md="6"
          v-if="showField('contactRequest')"
        >
          <v-text-field
            v-model="propReceived.info.contactRequest"
            label="Contato"
          ></v-text-field>
        </v-col>

        <v-col
          md="6"
          v-if="showField('priorityRequest')"
        >
          <v-select
            v-model="propReceived.info.priorityRequest"
            :hint="`Prioridade`"
            :items="items"
            :color="select.color"
            item-text="state"
            item-value="abbr"
            label="Status"
            persistent-hint
            return-object
            single-line
          ></v-select>

          <v-btn> teste</v-btn>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
import { statusNewRequest } from './fields';
export default {
  name: 'InfoRequest',

  props:{
    propReceived: Object
  },

  data: () => ({
    select: { state: 'Baixa', color: 'alert' },

    options:[],

    fields:[
      {nameField:'numberRequest',  label:'Número de pedido'  }
    ],

    items: [
        { state: 'Alta' ,color: 'red' },
        { state: 'Media', color: 'warning' },
        { state: 'Baixa', color: 'green' }
    ],

    newRequestFieldsReturn: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    confirmedRequest: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    boughtRequest: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    receivedRequest: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    },

    Finalizado: {
      numberRequest:true,
      contactRequest:true,
      priorityRequest:true,
    }
  }),

  mounted() {
    this.loadOptionsFromLocalStorage();
  },

  methods:{
    customFilter(item, queryText, itemText) {
      const normalizedQuery = queryText.toLowerCase()
      const normalizedItemText = itemText.toLowerCase()
      return normalizedItemText.includes(normalizedQuery) 
    },

    onItemSelected(){
      this.propReceived.info.branchRequest = this.propReceived.info.selectedOption.numero
      console.log(this.propReceived.info.branchRequest)
    },

    loadOptionsFromLocalStorage() {
      const requestItensGetApiSolicited = localStorage.getItem('branch');

      if (requestItensGetApiSolicited) {
        this.options = JSON.parse(requestItensGetApiSolicited).map(item => ({
          text: `${item.numero} -> ${item.filial}` ,
          value: item,
        }));
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
    const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
    this.branchSelect = JSON.parse(requestItensGetApiSolicited)
    this.propReceived.info.selectedOption = this.branchSelect

    if(!this.propReceived.info.dateStartRequest){
      this.propReceived.info.dateStartRequest = new Date()
    }
  }
}
</script>
