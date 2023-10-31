<template>
	<div class="modal" v-if="show">
		<div class="modal-content">
			<v-row class="mx-1">
				<v-col md="11">
					<h2>Selecione a filial</h2>
				</v-col>

				<v-col md="1">
					<v-tooltip color="red" top>
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="red" icon v-bind="attrs" v-on="on" @click="closeModal" >
								<v-icon>
									mdi-close
								</v-icon>
							</v-btn>
						</template>

						<span>fechar</span>
					</v-tooltip>
                    {{ option }}
				</v-col>
			</v-row>
			
            <v-row class="mx-1">
                <v-col
                    md="3"
                >
                <!-- select -->
                    <div>
						<v-autocomplete  
						
						v-if="haveOptions()"
							required
							v-model="optionBranch"
							:items="options"
							label="Selecione uma filial"
							:filter="customFilter"
							@input="onItemSelected"
						></v-autocomplete>
						<v-alert v-if="!haveOptions()"
                        color="blue"
                        type="LOADING"
                        outlined
                        icon="mdi-clock-fast"
                        border="left"
                        class="text-subtitle-2 text-center"
                    >CARREGANDO...</v-alert>
                    </div>
                
                </v-col>
            </v-row>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		show: Boolean,
		
	},
    data: () => ({
        options:null,
        optionBranch:null,
        option:null
		
    }
    ),   
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
            this.option = this.optionBranch
            localStorage.setItem('branchSelect', JSON.stringify(this.option));
            this.closeModal()
        },
        loadOptionsFromLocalStorage() {

			let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/filiais/`

			axios.get(API_URL)
			.then(response => {
			
			if (response.status !== 200 ) {
				console.error('Erro na solicitação:', response.status);
				throw new Error('Não foi possível acessar a API da TOTVS');
			}
		
				const items = response.data;
				console.log("filiais",items)

				this.options = items.map(item => ({
                    text: `${item.numero} -> ${item.filial}` ,
                    value: item,
                }));
			})
			.catch(error => {
				console.error('Erro:', error);
			});

        },
		closeModal() {
			this.$emit('close');
		},
		saveModal() {
			this.$emit('save');
		},
		haveOptions(){
			return this.options? true : false
		}
		
	}
};
</script>

<style scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		width: 80%;
		background-color: rgba(255, 255, 255);
		backdrop-filter: blur(1px);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
