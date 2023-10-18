<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <Navigation v-if="this.drawer" @close="drawerValidate"/>
    </v-navigation-drawer>

    <v-app-bar app  dark color="black">
      <v-app-bar-nav-icon @click="drawerValidate"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $t('titleAplication') }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '../src/components/navigation'

export default {
  name: 'App',
  components:{
    Navigation
  },

  data: () => ({
    drawer: false,

    apiUrl: 'http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/',
        items: [], // Armazenará os dados da API
  
        listProducts:[],
        hasNext:null
  }),

  methods:{
    drawerValidate(){
      this.drawer = this.drawer ?  false : true
    },


    saveToLocalStorage(data) {
      // Salvar os dados no localStorage
      localStorage.setItem(data, JSON.stringify(this.listProducts));
    },
    
    showLocalStorageData() {
      // Recuperar os dados do localStorage e exibi-los
      const produtos = localStorage.getItem('apiData');
      this.listProducts = produtos ? JSON.parse(produtos) : [];
      console.log(localStorage)
      
    },

    takeValuesApi(){
      this.takeProducts(1)
    },

    takeProducts(page) {
      let pageSize = 50000

      let API_URL =this.apiUrl + `api/retail/v1/retailItem?page=${page}&pageSize=${pageSize}&fields=code,description`

      axios.get(API_URL)
          .then(response => {
          
          if (response.status !== 200 ) {
              console.error('Erro na solicitação:', response.status);
              window.alert('erro em RPO SOLICITE SUPORTE')
              throw new Error('Não foi possível acessar a API da TOTVS');

          }
    
          const items = response.data.items;
    
          this.listProducts = this.listProducts.concat(items);
          
          this.saveToLocalStorage('apiData')
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },
    takeBranch(){

      let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/filiais/`

      axios.get(API_URL)
          .then(response => {
          
          if (response.status !== 200 ) {
              console.error('Erro na solicitação:', response.status);
              throw new Error('Não foi possível acessar a API da TOTVS');
          }
    
          const items = response;
          console.log("filiais",items)
          
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },
    takeTransport(){

      let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/fat/v1/carrier`

      axios.get(API_URL)
        .then(response => {
        
        if (response.status !== 200 ) {
            console.error('Erro na solicitação:', response.status);
            throw new Error('Não foi possível acessar a API da TOTVS');
        }

        const items = response;
        console.log("transportadoras",items)
        
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    },
    takePayment(){

      let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/fat/v1/paymentcondition/?pageSize=50000`

      axios.get(API_URL)
        .then(response => {
        
        if (response.status !== 200 ) {
            console.error('Erro na solicitação:', response.status);
            throw new Error('Não foi possível acessar a API da TOTVS');
        }

        const items = response;
        console.log("pagamento",items)
        
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    },
    takeVendor(){
      
      let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/fornecedores/`

      axios.get(API_URL)
        .then(response => {
        
        if (response.status !== 200 ) {
            console.error('Erro na solicitação:', response.status);
            throw new Error('Não foi possível acessar a API da TOTVS');
        }

        const items = response;
        console.log("fornecedor",items)
        
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    },
    takeRequest(){
      
      let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/pedidos/`

      axios.get(API_URL)
        .then(response => {
        
        if (response.status !== 200 ) {
            console.error('Erro na solicitação:', response.status);
            throw new Error('Não foi possível acessar a API da TOTVS');
        }

        const items = response;
        console.log("pedido",items)
        
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    }
  },

  created(){
    this.takeValuesApi()
    this.takeBranch()
    this.takeTransport()
    this.takePayment()
    this.takeVendor()
    this.takeRequest()
    //  console.log("list",this.listProducts)
    // this.saveToLocalStorage()
    // this.showLocalStorageData()
    
  }
};
</script>

<style scoped>


</style>
