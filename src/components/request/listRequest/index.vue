<template >
	<div  style="background-color: rgb(209, 209, 209) !important; height: 100%;">
		
		<template  >
			
	
				<!-- <div v-for="(item, index) in allDataRequestList">
					{{ item.numero }}
				</div> -->
			<v-row class="mx-1 pt-5"  v-if="!isModalVisible && !requestModal">
				<v-col md="2">
					<div>
						<v-autocomplete
							required
							v-model="optionBranch"
							:items="options"
							label="Selecione uma filial"
							:filter="customFilter"
							@input="onItemSelected"
						></v-autocomplete>
					</div>
				</v-col>
			
				<v-col md="2" class="text-center">
					<v-text-field
						v-model="requestNumber"
						label="Número do pedido"
					></v-text-field>
				</v-col>

				<v-col md="2" class="text-center">
					<v-text-field
						type="date"
						v-model="dataStart"
						label="data inicial de busca"
						@input="convertData()"
					></v-text-field>
				</v-col>

				<v-col md="2" class="text-center">
					<v-text-field
						type="date"
						v-model="dataEnd"
						label="data final de busca"
						@input="convertData()"
					></v-text-field>
				</v-col>
				
				<v-col md="1" class="text-center mr-6" >
					<v-btn @click="dataBTN(requestNumber)" color="primary">
						<v-icon>
							FILTRAR
						</v-icon>
					</v-btn>
				</v-col>

				<v-col md="1" class="text-center ml-6" >
					<v-btn @click="goRoute()" dark color="green">
						<v-icon>
							CRIAR+
						</v-icon>
					</v-btn>
				</v-col>
				<!-- <v-col md="1" class="text-center" >
					<v-btn class="mx-2 rodo-btn" elevation="0" dark @click="goRoute()" color="green"><v-icon left>
					mdi-plus
				</v-icon>
		
			{{ $t('request.createRequest') }}</v-btn>
				</v-col>-->
			</v-row>

			<ModalBranch
				:show="isModalVisible"
				@close="closeModal"
			/>
			<ModalRequest
				:show="requestModal"
				:info="itemInfo"
				@close="closeModal"
			/>
			
			<tirar-inicialmente v-if="false">
				<v-btn class="ma-2 rodo-btn" dark elevation="0" @click="changeStatus('CONFIRMAÇÃO')" color="blue">
					<v-icon left>
						mdi-cart-arrow-down
					</v-icon>
					<span>SOLICITAÇÕES</span>
				</v-btn>

				<v-btn class="ma-2 rodo-btn" dark elevation="0" @click="changeStatus('COMPRAS')" color="blue"><v-icon left>
					mdi-cart-check
					</v-icon>
					<span>CONFIRMAÇÃO</span>
				</v-btn>

				<v-btn class="ma-2 rodo-btn" dark elevation="0" @click="changeStatus('RECEBIMENTO')" color="blue"><v-icon left>
					mdi-cart-percent
					</v-icon>
					<span>COMPRA</span>
				</v-btn>
			
				<v-btn class="ma-2 rodo-btn" dark elevation="0" @click="changeStatus('PAGAMENTO')" color="blue"><v-icon left>
					mdi-account-arrow-left
					</v-icon>
					<span>ENTREGUE</span>
				</v-btn>
				
				<v-btn class="ma-2 rodo-btn" dark elevation="0" @click="changeStatus('ENTRADA')" color="blue"><v-icon left>
					mdi-cart-plus
					</v-icon>
					<span>FINALIZADO</span>
				</v-btn>
			</tirar-inicialmente>
			
			<div class="mx-2"  v-if="!isModalVisible && !requestModal">
				<v-card
					class="d-flex flex-row-reverse"
					color="white"
					flat
					tile
				>
					<v-btn-toggle 
						shaped
						mandatory
						multiple
					>
						<v-btn @click="contMini()" color="primary" :disabled="cont==0">
							<v-icon style="color:white">
								mdi-chevron-left
							</v-icon>
						</v-btn>

						<v-btn style="color:white" color="primary">
							{{cont+1}}
						</v-btn>
			
						<v-btn @click="contPlus()" color="primary" :disabled="!next">
							<v-icon style="color:white">
								mdi-chevron-right
							</v-icon>
						</v-btn>
					</v-btn-toggle>
				</v-card>
			</div>

			<v-simple-table v-if="!isModalVisible && !requestModal" class="mx-2 my-0" style="border-bottom-radius: 10px; background-color: rgb(255, 255, 255);">
			
				<template v-slot:default>
					
					<thead >
						<toolbar :toobarList="toolbartTitles"/>
					</thead>
					
					<tbody>
						<tr style="border-left: 1px black ;" v-for="(item, index) in allDataRequestList"
						
						>
						
							<td style="border-left: 1px;">
								{{ item.numero }}
							</td>
							<td>alguma info</td>
							<td v-if="item.info">
								<span v-if="isMultipleNote()">
									<v-btn v-if="isMultipleNote()" @click="verifyDataTbn" icon>
										<ButtonTooltip 
											corzinha="blue" 
											:icon="$t('request.icon.notes')"
											:title="$t('request.iconTooltip.notes')"   
										/>
									</v-btn>
								</span>

								<span v-if="!isMultipleNote()">
									<v-btn  @click="verifyDataTbn" icon>
										<ButtonTooltip
											corzinha="red"
											:icon="$t('request.icon.onlyNote')"
											:title="$t('request.iconTooltip.onlyNote')"
										/>
									</v-btn>
								</span>
							</td>
							<td>nome do fornecedor</td>
							<td>
								<v-alert
									border="left"
									colored-border
									color="warning"
									elevation="0"
									class="ma-0 pa-3"
									style=" background-color: rgb(251 140 0 / 24%);border-radius: 0%;"
								>{{item.status}}</v-alert>
							</td>
							
							<td>
								<v-alert
									border="left"
									colored-border
									color="success"
									elevation="0"
									style=" background-color: rgb(212, 255, 213);border-radius: 0%;"
									class="ma-0 pa-3"
								>status</v-alert>
							</td>
							
							<td><v-alert
									border="left"
									colored-border
									color="success"
									elevation="0"
									class="ma-0 pa-3"
									style=" background-color: rgb(212, 255, 213);border-radius: 0%;"
								>status</v-alert></td>
							<td class="text-center">
								<v-btn @click="verifyDataTbn(item.numero)" icon>
									<ButtonTooltip
										corzinha="blue"
										:icon="$t('request.icon.infoRequest')"
										:title="$t('request.iconTooltip.infoRequest')"
									/>
								</v-btn>

								<v-btn @click="editRequest(item.id)" icon>
									<ButtonTooltip
										corzinha="blue"
										:icon="$t('request.icon.editRequest')"
										:title="$t('request.iconTooltip.editRequest')"
									/>
								</v-btn>
							</td>
							
						</tr>
						
						
					</tbody>
					
				</template>
			</v-simple-table>
			
		</template>

		
	</div>
</template>

<script>
import { db } from '../../../firebaseDb'

import ButtonTooltip from '../../tools/buttonIconTooltip'
import Toolbar from '../../tools/toolbar'
import ModalBranch from './modalSelectBranch.vue'
import ModalRequest from './modalSelectRequest.vue'
export default {
	name: 'Home',

	components:{
		Toolbar,
		ButtonTooltip,
		ModalBranch,
		ModalRequest
	},

	

	data: () => ({
		isModalVisible:true,
		toolbartTitles:[
			{title:'request.table.numberRequest'},
			{title:'request.table.NumberNotes'},
			{title:'request.table.supplier'},
			{title:'request.table.statusShip'},
			{title:'request.table.statusOrdem'},
			{title:'request.table.statusPay'},
			{title:'request.table.actions'}
		],
		cont:0,
		allDataRequestList:null,
		branchSelect: null,
		options:[],
		requestNumber:'',
		dataStart:'',
		dataEnd:'',
        optionBranch:null,
        option:null,
		user:{
			name:'nome do uuario',
			função:'cordenador'
		},
		tasks:[],
		statusData:{},
		statusList:{
			newRequest:{name:'newRequest',color:'blue', icon:'mdi-account-arrow-left'},
			confirmRequest:{name:'confirmRequest',color:'orange',icon:'mdi-account-arrow-left'},
			salleRequest:{name:'salleRequest',color:'green',icon:'mdi-account-arrow-left'},
			stokeRequest:{name:'stokeRequest',color:'purple',icon:'mdi-account-arrow-left'},
			paymentRequest:{name:'paymentRequest',color:'yeallow',icon:'mdi-account-arrow-left'},
		},
		contActive:true,
		next:null,
		requestModal:false,
		format_start_data:'',
		format_end_data:'',
		itemInfo:null
	}),
	mounted() {
        this.loadOptionsFromLocalStorage(); 
    },
    methods:{
		contPlus(){
			if(this.contActive){
				this.cont++
				this.takeAllRequest()
			}
		},
		convertData(){
			let data_format_START = this.dataStart.replace("-", "")
			data_format_START = data_format_START.replace("-", "")
			
			let data_format_END = this.dataEnd.replace("-", "")
			data_format_END = data_format_END.replace("-", "")

			this.format_start_data = data_format_START,
			this.format_end_data = data_format_END
			console.log('data start',this.format_start_data,'data end',this.format_end_data)
		},
		contMini(){
			this.cont--
			this.takeAllRequest()
		},
        customFilter(item, queryText, itemText) {
            const normalizedQuery = queryText.toLowerCase()
            const normalizedItemText = itemText.toLowerCase()
            return normalizedItemText.includes(normalizedQuery) 
        },
        onItemSelected(){
            this.branchSelect = this.optionBranch
			this.takeAllRequest()
			this.cont = 0
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
		requestSeatch(requestNumber){
			this.takeAllRequest(requestNumber)
			this.cont = 0
		},
		dataBTN(requestNumber){
			if(requestNumber){
				this.takeAllRequest(requestNumber)
			} else {
				this.takeAllRequest()
			}
			this.cont=0
			
		},
		goRoute(){
			this.$router.push({ name: 'create' })
		},

		isMultipleNote(){
			return true
		},
		verifyDataTbn(numberRequest){
			console.log('teste btn',numberRequest)
			axios.get(`http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/pedido?codeEdit=${numberRequest}`)
				.then(response => {
					
				if (response.status !== 200 ) {
					console.error('Erro na solicitação:', response.status);
					console.log('teste a')
					throw new Error('Não foi possível acessar a API da TOTVS');
				}
					this.itemInfo = response
					console.log('teste response:', response)
	
				})

			this.requestModal = true
		},
		editRequest(ID_REQUEST){//requestEdit, index
			
			this.$router.push({ name: 'createdWithId',params: { id: ID_REQUEST } });
		},
		changeStatus(text){
			this.statusData = text
		},

		async takeValues(){
			this.tasks = [];
			db.collection('task').get().then(snapshot => {
				snapshot.forEach(doc =>{
					let objectTask = doc.data();
					objectTask.id = doc.id
					this.tasks.push(objectTask)
				})
			})
			
		},showModal() {
			this.isModalVisible = true
		},closeModal() {
			const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
			this.branchSelect = JSON.parse(requestItensGetApiSolicited)
			this.optionBranch = JSON.parse(requestItensGetApiSolicited)
			this.isModalVisible = false 
			this.requestModal = false
			this.takeAllRequest()
		},

		takeAllRequest(requestNumber){
			if(!requestNumber){
				requestNumber = ''
			}
			this.contActive = false
			let API_URL = `http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/pedidos/?pageSelect=${this.cont*30}&dataStart=${this.format_start_data}&dataFinaly=${this.format_end_data}&branchNumber=${this.optionBranch.numero}&codeEdit=${requestNumber}`//codeEdit=006267

			axios.get(API_URL)
			.then(response => {
			if (response.status !== 200 ) {
				console.error('Erro na solicitação:', response.status);
				throw new Error('Não foi possível acessar a API da TOTVS');
			}
				axios.get(`http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/pedidos/?pageSelect=${this.cont*30}&dataStart=${this.format_start_data}&dataFinaly=${this.format_end_data}&branchNumber=${this.optionBranch.numero}&codeEdit=${requestNumber}`)
				.then(response => {
					
					console.log("teste:", response)
				if (response.status !== 200 ) {
					console.error('Erro na solicitação:', response.status);
					console.log('teste a')
					throw new Error('Não foi possível acessar a API da TOTVS');
				}

					const items = response.data;
					
					this.next = items.length > 0 &&  items.length == 30 ? this.next = true : this.next = false
					console.log(items.length)
					if(!items.length){
						window.alert('n foi possivel achar nenhum registro')
					}
					this.contActive = true
				})
			
				const items = response.data;
				this.allDataRequestList = items
			})
			.catch(error => {
				console.error('Erro:', error);
			});
		}
		
	},
	created(){
		this.takeValues()
		this.takeAllRequest()
		const requestGet = localStorage.getItem('requestList');
 		this.requestList = requestGet ? JSON.parse(requestGet) : [];
	}
}
</script>
<style>

*{
	font-family: 'Roboto', sans-serif;
}
.rodo-btn{
	border-radius: 10px !important;
}
</style>