<template >
	<div  style="background-color: rgb(209, 209, 209) !important; height: 100%;">
		<template >
			<v-btn class="ma-2 rodo-btn" elevation="0" dark @click="goRoute()" color="green"><v-icon left>
					mdi-plus
				</v-icon>
			
				{{ $t('request.createRequest') }}</v-btn>
			<v-btn class="ma-2 rodo-btn" dark elevation="0" @click="changeStatus('CONFIRMAÇÃO')" color="blue"><v-icon left>
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

			<v-simple-table class="ma-2 my-2" style="border-radius: 10px; background-color: rgb(255, 255, 255);">
				<template v-slot:default>
					<thead >
						<toolbar :toobarList="toolbartTitles"/>
					</thead>
					
					<tbody>
						<tr style="border-left: 1px black ;" v-for="(item, index) in tasks"
						
						>
						
							<td  style="border-left: 1px;" >
								
									{{ item.info.numberRequest }}
								</td>
							<td >
								<span v-if="isMultipleNote()">
									<v-btn v-if="isMultipleNote()" @click="testeBTNTOOLBAR" icon>
										<ButtonTooltip 
											corzinha="blue" 
											:icon="$t('request.icon.notes')"
											:title="$t('request.iconTooltip.notes')"   
										/>
									</v-btn>
								</span>

								<span v-if="!isMultipleNote()">
									<v-btn  @click="testeBTNTOOLBAR" icon>
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
								<v-btn @click="testeBTNTOOLBAR" icon>
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

export default {
	name: 'Home',

	components:{
		Toolbar,
		ButtonTooltip,
	},

	

	data: () => ({
		toolbartTitles:[
			{title:'request.table.numberRequest'},
			{title:'request.table.NumberNotes'},
			{title:'request.table.supplier'},
			{title:'request.table.statusShip'},
			{title:'request.table.statusOrdem'},
			{title:'request.table.statusPay'},
			{title:'request.table.actions'}
		],
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
		}
	}),

	methods:{
		goRoute(){
			this.$router.push({ name: 'create' })
		},

		isMultipleNote(){
			return true
		},
		testeBTNTOOLBAR(){
			console.log('teste btn')
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
			
		},
	},
	created(){
		this.takeValues()
		
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