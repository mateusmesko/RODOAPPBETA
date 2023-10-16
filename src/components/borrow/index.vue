<template>
    <div>

      <v-text-field class="ma-5" type="text" v-model="buscarCodigo"></v-text-field>
      
      <v-btn @click="sendData">
        CRIAR
      </v-btn>
      
      <v-btn @click="takeData">
        BUSCAR
      </v-btn>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                NAME
              </th>

              <th class="text-left">
                FILIAL
              </th>
              <th class="text-left">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listData"
              :key="index"
            >
              <td>{{ item.numero }}</td>
              <td>{{ item.filial }}</td>
              <td>ACTIONS</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    
    data: () => ({
      listData: null,
      buscarCodigo: ''
    }),
    methods: {
      
      async takeData() {
          let headers = {
            codeEdit: this.buscarCodigo,
          };
          
          const response = await axios.get(
            `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/fornecedores/`,
              {headers}
          );
            console.log("aquiiiii", response)
            this.listData = response.data
      	 },
    },
    created() {
      
      this.takeData()
    },
  };
  </script>
  