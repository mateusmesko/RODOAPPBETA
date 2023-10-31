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

    saveToLocalStorageProducts() {
      localStorage.setItem('apiDataA', JSON.stringify(this.listProducts));
    },

    showLocalStorageData() {
      const produtos = localStorage.getItem('apiData1');
      this.listProducts = produtos ? JSON.parse(produtos) : [];
      console.log(localStorage)  
    },

    takeProducts(page) {
      let pageSize = 10000

      let API_URL =this.apiUrl + `api/retail/v1/retailItem?page=1&pageSize=10000&fields=code,description,MercosulNomenclature`

      axios.get(API_URL)
          .then(response => {
          
          if (response.status !== 200 ) {
              console.error('Erro na solicitação:', response.status);
              window.alert('erro em RPO SOLICITE SUPORTE')
          }
    
          const items = response.data.items;
          
          localStorage.setItem('apiData1', JSON.stringify(items));
          console.log('save1')
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },

    takeProducts2(page) {
      let pageSize = 10000

      let API_URL =this.apiUrl + `api/retail/v1/retailItem?page=2&pageSize=10000&fields=code,description,MercosulNomenclature`
      axios.get(API_URL)
          .then(response => {
          
          if (response.status !== 200 ) {
              console.error('Erro na solicitação:', response.status);
              window.alert('erro em RPO SOLICITE SUPORTE')
              throw new Error('Não foi possível acessar a API da TOTVS');

          }
    
          const items = response.data.items;
    
          
          localStorage.setItem('apiData2', JSON.stringify(items));
          console.log('save2')
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },
    takeProducts4(page) {

      let API_URL =this.apiUrl + `api/retail/v1/retailItem?page=4&pageSize=10000&fields=code,description,MercosulNomenclature`
      axios.get(API_URL)
          .then(response => {
          
          if (response.status !== 200 ) {
              console.error('Erro na solicitação:', response.status);
              window.alert('erro em RPO SOLICITE SUPORTE')
              throw new Error('Não foi possível acessar a API da TOTVS');

          }
    
          const items = response.data.items;
    
          
          localStorage.setItem('apiData4', JSON.stringify(items));
          console.log('save3')
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
          localStorage.setItem('branch', JSON.stringify(items.data));
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },
    takeTransport(){

      let API_URL = `http://rodoparanaimplementos120531.protheus.cloudtotvs.com.br:4050/rest/api/fat/v1/carrier/?pageSize=50000`

      axios.get(API_URL)
        .then(response => {
        
        if (response.status !== 200 ) {
            console.error('Erro na solicitação:', response.status);
            throw new Error('Não foi possível acessar a API da TOTVS');
        }

        const items = response; 
        console.log("transportadoras",items)
        localStorage.setItem('transport', JSON.stringify(items.data));
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
        console.log("pagamento", items.data.items)
        localStorage.setItem('payment', JSON.stringify(items.data.items));
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
        localStorage.setItem('request', JSON.stringify(items.data));
       
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    },
    takeCnpj(){
              let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/cnpjFornecedores/`

                axios.get(API_URL)
                .then(response => {

                    if (response.status !== 200 ) {
                        console.error('Erro na solicitação:', response.status);
                        throw new Error('Não foi possível acessar a API da TOTVS');
                    }

                    const items = response;
                    localStorage.setItem('cnpjVendor', JSON.stringify(items.data));
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
            },
  },

  created(){
    localStorage.clear()
    this.takeProducts(1)
    this.takeProducts2(2)

    this.takeProducts4(2)
    this.takeBranch()
    this.takeTransport()
    this.takePayment()
    //this.takeVendor()
    this.takeRequest()
    this.takeCnpj()
    //  console.log("list",this.listProducts)
    // this.saveToLocalStorageProducts()
    // this.showLocalStorageData()
    
  }
};
</script>

<style scoped>


</style>
