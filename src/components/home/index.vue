<template>
	<div id="app">
            <v-row justify="center" class="ma-1">
                <v-card @click="navRouter(item.router)" v-for="(item, index) in itensOptions" :key="index"
                    class="mx-auto text-center ma-1"
                    width="150"
                    color="green"
                    elevation="0"
                >
                    <div class="text-overline ma-2">
                        <v-icon large color="blue">mdi-book-open-page-variant</v-icon>
                    </div>

                    <v-list-item-subtitle class="pa-5">{{item.title}}</v-list-item-subtitle>
                </v-card>
               
            </v-row>
    </div>
</template>
  
<script>
export default {
	
	data() {
		return {

            itensOptions: [
				{ title: this.$t('navgation.home'), icon: 'mdi-home', router:'create' },
			],
		}
	},
	
	methods: {
        navRouter(nameRouter) {
			this.$emit('close');
			this.$route.name != nameRouter ? this.$router.push({ name: nameRouter }) :  ''
		},
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
	},created() {
      
    },
};
</script>
