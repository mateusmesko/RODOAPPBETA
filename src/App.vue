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
        loading:false,
        hasNext:null
  }),

  methods:{
    drawerValidate(){
      this.drawer = this.drawer ?  false : true
    },


    saveToLocalStorage() {
        // Salvar os dados no localStorage
        localStorage.setItem('apiData', JSON.stringify(this.listProducts));
      },
      
      showLocalStorageData() {
        // Recuperar os dados do localStorage e exibi-los
        const produtos = localStorage.getItem('apiData');
        this.listProducts = produtos ? JSON.parse(produtos) : [];
        console.log(localStorage)
       
      },
      takeValuesApi(){
        this.fetchData(1)
      },
      fetchData(page) {
        this.loading = false
        let pageSize = 50000
        console.log( (pageSize * page - pageSize) + 'a' +  (pageSize * page))
        console.log(page)
        // console.log(this.apiUrl + `api/retail/v1/retailItem?page=1&pageSize=${pageSize}&fields=code,description`)
        let API_URL =this.apiUrl + `api/retail/v1/retailItem?page=${page}&pageSize=${pageSize}&fields=code,description`

        axios
            .get(API_URL)
            .then(response => {
            // Verifica se a resposta da API foi bem-sucedida (código de status 200)
            if (response.status !== 200 ) {
                console.error('Erro na solicitação:', response.status);
                throw new Error('Não foi possível acessar a API da TOTVS');
            }
  
            // Armazena os dados da API na variável 'items'
            const hasNext = response.data.hasNext;
            const items = response.data.items;
  
            // Adicione os itens à lista existente
            this.listProducts = this.listProducts.concat(items);
            this.loading = true
            console.log("the list",this.listProducts)
            
            this.saveToLocalStorage()
            })
                .catch(error => {
                console.error('Erro:', error);
            });
        }
  },

  created(){
    //  this.takeValuesApi()
    //  console.log("list",this.listProducts)
    // this.saveToLocalStorage()
    // this.showLocalStorageData()
    
  }
};
</script>

<style scoped>


</style>
