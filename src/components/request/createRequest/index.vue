<template>
	<div style="background-color: rgb(207, 207, 207);height: 100%;">
		<v-btn 	class="ma-2 rodo-btn" elevation="0" 
						
		v-for="(item,i) of panel"
		v-if="item.show"
				:key="i" 
				@click="showExpansionPainel(item.component)" 
				color="blue"
		>
			<ButtonTooltip
				corzinha="white"
				:icon="item.icon"
				:title="item.title"
			/>
		</v-btn>

		<v-btn 
			color="success" 
			class="ma-3"
			:disabled="false"
			elevation="0" @click="sendData(request)"
			
		>
			<!-- :disabled="!request.info.numberRequest" -->
			<v-icon light>mdi-plus</v-icon>
			
			SALVAR PEDIDO em filial 
		</v-btn>
		<div>
		</div>
		<component 
			class="ma-2 pa-6" 
			style="background-color: rgb(231, 231, 231); border-radius: 16px;" :is="componentSelected" :propReceived="request"/>

		<v-card  v-if="componentSelected == 'ProductRequest'"
			style="background-color: rgb(231, 231, 231); border-radius: 16px;"
			class="overflow-y-auto overflow-x-hidden ma-2 pa-0"
			height="300"
		>
			<v-col md="3">
				<v-btn block color="success"
					elevation="2" @click="createProduct"
				>
					<v-icon light>mdi-plus</v-icon>
						criar
				</v-btn>
			</v-col>
			
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<toolbar  style="background-color: rgb(231, 231, 231);" :toobarList="headerProducts"/>
					</thead>

					<tbody>
						<ListProducts :product="item" :index="index" v-for="(item, index) in request.products" @delete="deleteProduct" @edit="editProduct" :key="index"/>
						
					</tbody>
				</template>
			</v-simple-table>
		</v-card>
		
		<modal
			:show="isModalVisible"
			:product="productWorking"
			@close="closeModal"
			@save="saveModal"
			:isEdit="idEdit" 
		/>
		
		<v-expansion-panels>
			<v-expansion-panel 
			v-if="showArea(item) && !isModalVisible"
				v-for="(item,i) of panel"
				:key="i"
			>
				<v-expansion-panel-content v-if="request">
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { db } from '../../../firebaseDb'
import axios from 'axios';

import InfoRequest from './inputs/infoRequest.vue'
import ProductRequest from './inputs/productRequest.vue'
import PaymentRequest from './inputs/paymentRequest.vue'
import SupplierRequest from './inputs/supplierRequest.vue'
import FiscoRequest from './inputs/fiscoRequest.vue'
import Modal from './inputs/modalProduct.vue'

import ListProducts from './products/listProducts.vue'

import Toolbar from '../../tools/toolbar'
import ButtonTooltip from '../../tools/buttonIconTooltip'

import RequestInfo from '../../../models/request/Info'
import RequestFisco from '../../../models/request/Fisco'
import RequestPayment from '../../../models/request/Payment'
import RequestProduct from '../../../models/request/Product'
import RequestSupplier from '../../../models/request/Supplier'

import ModelRequest from '../../../models/Request'

export default {
    name: 'Home',

    components:{
		InfoRequest,
		PaymentRequest,
		ProductRequest,
		SupplierRequest,
		FiscoRequest,
		Modal,
		Toolbar,
		ListProducts,
		ButtonTooltip
    },
	props:{
		index: {
			type: Number,
			default: null,
			},
		},
    data: () => ({	
		requestInfo: new RequestInfo,
		requestFisco: new RequestFisco,
		requestPayment: new RequestPayment,
		requestSupplier: new RequestSupplier,

		productWorking:null,

		isModalVisible: false,
		BASE_ROUTE_I18N:'request.addRequest.',

		request: null,
		requestList:[],
		headerProducts:[
			{title:'request.addRequest.headProductsList.name'},
			{title:'request.addRequest.headProductsList.value'},
			{title:'request.addRequest.headProductsList.amountSolicited'},
			{title:'request.addRequest.headProductsList.amountShiped'},
			{title:'request.addRequest.headProductsList.statusShip'},
			{title:'request.addRequest.headProductsList.actions'}
		],

		products: [],
		idEdit: false,
		componentSelected:'InfoRequest',
		panel:[
			{title:'Dados do pedido', tag:1, component:'InfoRequest', show:true, icon:'mdi-information-variant-box-outline'},
			{title:'Dados do fornecedor', tag:5,component:'SupplierRequest', show:true, icon:'mdi-human-dolly'},
			// {title:'Dados de nota', tag:2, component:'FiscoRequest', show:true, icon:'mdi-note-outline'},
			{title:'Produtos de pedido', tag:3, component:'ProductRequest', show:true, icon:'mdi-archive-check-outline'},
			{title:'Pagamento', tag:4, component:'PaymentRequest', show:true, icon:'mdi-cash'},
		],
		form:{
			subject:'teste',
			description:'teste'
		}
    }),
    methods:{
		testeRequest(){
			const produtos = localStorage.getItem('apiData');
            if (produtos) {
                this.options = JSON.parse(produtos).map(item => ({
                    
                    text: `${item.Code} -> ${item.Description}` ,
                    value: item,
                }));
				
            }
		},
		async sendData(request) {
			console.log(request)
	
			const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
			this.branchSelect = JSON.parse(requestItensGetApiSolicited)
			console.log(this.branchSelect)
			
			console.log("FORNECEDOR",request.nameSupplier)
			let itens = []
			this.itens = itens
			for (let index of request.products) {
				console.log(index);
				let prov = {};
				prov.ITEM = `000${this.itens.length + 1}`; // Gera o valor do campo "ITEM" com base na posição
				prov.PRODUTO = index.codeProduct;
				prov.QUANTIDADE = index.amontProduct;
				prov.VALUNIT = index.valueProduct;
				this.itens.push(prov); // Adiciona o objeto ao array this.itens
				}

				console.log(this.itens);
			// try {
			// const data = {
			// 	"OPCAO":3,
			// 	"FILIAL":"01",
			// 	"FORNECEDOR":"000001",//check
			// 	"LOJA":"01",//CHECK
			// 	"CONDFIN":"001",//CHECK
			// 	"itens":[
			// 		{
			// 					"ITEM":"0001",//CHECK
			// 			"PRODUTO":"RD208009105",	//CHECK			
			// 			"QUANTIDADE":1,//CHECK
			// 					"VALUNIT":85.50
			// 		},
			// 		{
			// 					"ITEM":"0002",
			// 			"PRODUTO":"RD208009105",				
			// 			"QUANTIDADE":5,
			// 					"VALUNIT":300
			// 		}		 
			// 	]
			// };
	
			// const response = await axios.post(
			// 	'http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/WSRDPXPEDCOM/',
			// 	data
			// );
			// console.log(response)
			
			// // O código de resposta está em response.status
			// // Os dados da resposta estão em response.data

			// console.log('criou o pedido aaeeeeeeee é teeeeetraaa')
			// console.log(response.data);
			// } catch (error) {
			// console.error('Erro ao fazer a solicitação:', error);
			// }
      	},
		valueProps(){
			return this.requestInfo
		},

		createProduct(){//
			this.insertModelProduct()
			this.showModal()
		},
		insertModelProduct(){
			this.productWorking = new RequestProduct
		},
		showModal() {
			this.isModalVisible = true
		},
		
		saveModal() {
			this.isEdited() ? this.editedRequestProduct() : this.saveNewRequestProduct()
                                                                                                                                                                                                                            
			this.closeModal()
		},
		isEdited(){
			return this.idEdit
		},
		editedRequestProduct(){
			this.request.products[this.newId] = this.productWorking
			this.idEdit = false
		},
		saveNewRequestProduct(){
			this.request.products.push(this.productWorking);
		},

		closeModal() {
			this.isModalVisible = false
		},

		saveRequest(newRequest){
			this.changeStatus()
			
			let request = JSON.stringify(newRequest)
			
			if(this.$route.params.id){
				db.collection('task').doc(this.$route.params.id).set(JSON.parse(request))
			}else {
				this.form.subject='thiago gomez'
				
				
				
				db.collection('task').add(JSON.parse(request))
			}
			let requestList = this.fetchAllRequest()
			
			if(this.$route.params.id+1){
				requestList[this.$route.params.id] = newRequest
			} else {
				requestList.push(newRequest)
			}
			this.addNewRequest(requestList)
			this.backRouteList()
		},
		changeStatus(){
			if (this.request.status == 'receivedRequest'){
				this.request.status = 'Finalizado'

			} if (this.request.status == 'boughtRequest') {
				this.request.status = 'receivedRequest'

			} if (this.request.status == 'confirmedRequest') {
				this.request.status = 'boughtRequest'

			} if (this.request.status == 'newRequest') {
				this.request.status = 'confirmedRequest'
			} if(!this.request.status){
				this.request.status = 'newRequest'
			}
		},

		showArea(item){
			item.show = true
			return this.newRequestArea(this.request.status, item)
		},

		newRequestArea(status, item){
			if(status == 'newRequest' && item.component == 'ProductRequest' || item.component == 'InfoRequest' ){
				return true
			}
			if(status == 'confirmedRequest' && (item.component == 'ProductRequest' || item.component == 'InfoRequest' || item.component == 'FiscoRequest')){
				return true
			}
			if(status == 'boughtRequest' || status == 'receivedRequest' || status == 'Finalizado'){
				return true
			}
		},

		fetchAllRequest(){
			const requestGet = localStorage.getItem('requestList');
			return requestGet ? JSON.parse(requestGet) : [];
		},
		addNewRequest(requestList){
			localStorage.setItem('status', JSON.stringify(requestList));
		},
		backRouteList(){
			this.$router.push({ name: 'list' })
		},
		
		deleteProduct(newId){
			this.request.products.splice(newId, 1)
		},

		editProduct(newId) {
			this.idEdit = true;
			this.productWorking = this.request.products[newId];
			this.newId = newId;
			this.showModal();
		},	
		showExpansionPainel(item){
			this.componentSelected = item
		},
		configModel(){
			this.request = new ModelRequest(1, this.requestInfo, this.requestSupplier, this.requestFisco, this.requestPayment,)
			this.request.products = []
		},
		// async sendData() {
		// // try {
		// //   const data = {
		// // 		"PEDIDO":[{
		// // 			"FILIAL":"0101",//zc7
		// // 			"FORNECEDOR":"000111",
		// // 			"LOJA":"01",
		// // 			"CONDFIN":"001",
		// // 			"OPERACAO":"1",
		// // 			"NUMERO":"",
		// // 			"EMISSAO":"",
		// // 			"NFISCAL":"",
		// // 			"SERIE":"",
		// // 		"ITENS":[{
		// // 			"ITEM":"001",//zc8
		// // 			"PRODUTO":"RD208009105",
		// // 			"QUANTIDADE":1,
		// // 			"VALUNIT":5
		// // 			},{
		// // 			"ITEM":"002",
		// // 			"PRODUTO":"RD208009106",
		// // 			"QUANTIDADE":1,
		// // 			"VALUNIT":5
		// // 			}]
		// // 		}]
		// //     };

		// const response = await axios.get(
		// 	'http://rodoparanaimplementos120532.protheus.cloudtotvs.com.br:4050/rest/reidoapsdu/consultar/fornecedores/'//,
		// 	//data
		// );
		// console.log("aquiiiii", response)
		
		// 	// O código de resposta está em response.status
		// 	// Os dados da resposta estão em response.data

		// }
	},
	
	created(){
		//this.sendData()
		this.configModel()
		const requestItensGetApiSolicited = localStorage.getItem('branchSelect');
		this.branchSelect = JSON.parse(requestItensGetApiSolicited)
		if(this.$route.params.id){
			let id = this.$route.params.id

			db.collection('task').doc(id).get().then(snapshot =>{
				const task = snapshot.data()
				this.request = task
			})
		} else {
			this.request.status = 'newRequest'
			localStorage.setItem('status', JSON.stringify(this.request.status))
		}
		console.log(this.$router.history.current.name)
	}
}
</script>
