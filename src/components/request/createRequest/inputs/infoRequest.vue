<template #app>
  <v-card
    elevation="2"
    class="pa-2"
  >
    <v-row>
      <v-col 
        v-if="showField('numberRequest')"
        sm="3"
      >
        <v-text-field
          v-model="propReceived.info.numberRequest"
          label="Número de pedido"
        ></v-text-field>
      </v-col>

      <v-col
        v-if="showField('numberRequest')"
        sm="3"
      >
        <v-text-field
          v-model="propReceived.info.numberRequest"
          label="Número de pedido"
        ></v-text-field>
      </v-col>

    
      <v-col
      v-if="showField('startRequest')"
        md="3"
      >
        {{propReceived.info.dateStartRequest}}
      </v-col>
      
      <v-col
      v-if="showField('shippedRequest')"
        md="3"
      >
        <v-text-field 
          
          type="date"
          v-model="propReceived.info.dataShippedRequest"
          label="Previsão de entrega"
        ></v-text-field>
      </v-col>
      
      <v-col
        md="3"
        v-if="showField('branchRequest')"
      >
        <v-text-field  v-model="propReceived.info.branchRequest"
          label="Filial"
        ></v-text-field>
      </v-col>
      
      <v-col
        md="3"
        v-if="showField('userRequest')"
      >
        <v-text-field
          
          v-model="propReceived.info.userRequest"
          label="Solicitante"
        ></v-text-field>
      </v-col>

      <v-col
        md="3"
        v-if="showField('contactRequest')"
      >
        <v-text-field
          
          v-model="propReceived.info.contactRequest"
          label="Contato"
        ></v-text-field>
      </v-col>

      <v-col
        md="3"
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

        },
        created(){
          if(!this.propReceived.info.dateStartRequest){
            this.propReceived.info.dateStartRequest = new Date()
          }
        }
    }
</script>
