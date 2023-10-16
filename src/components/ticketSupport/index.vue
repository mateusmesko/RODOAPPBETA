<template >
	<div  style="background-color: rgb(209, 209, 209) !important; height: 100%;">
		<v-btn 	
			class="ma-2 rodo-btn"
			elevation="0" 
			color="green"
			@click="createNewSupportRequest()"
		>
			<ButtonTooltip
				corzinha="white"
				:icon="'mdi-check'"
				:title="'titulo'"
			/>
		</v-btn>

		<v-btn 	
			class="ma-2 rodo-btn"
			elevation="0" 
			color="blue"
			@click="SupportRequest()"
		>
			<ButtonTooltip
				corzinha="white"
				:icon="'mdi-check'"
				:title="'aqui'"
			/>
		</v-btn>

		<template >
			<v-simple-table class="ma-2 my-2" style="border-radius: 10px; background-color: rgb(255, 255, 255);">
				<template v-slot:default>
					<thead >
						<toolbar :toobarList="headerProducts"/>
					</thead>

					<tbody>
						<tr
							v-for="(item, index) in statusList"
							:key="index"
						>
							<td>{{ item.name }}</td>
							<td>{{ item.calories }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</template>
	</div>
</template>

<script>

import ButtonTooltip from '../tools/buttonIconTooltip'
import Toolbar from '../tools/toolbar'

export default {
	name: 'Home',

	components:{
		Toolbar,
		ButtonTooltip,
	},

	

	data: () => ({
		headerProducts:[
			{title:'request.addRequest.headProductsList.name'},
			{title:'request.addRequest.headProductsList.value'},
		],
		statusList:[
			{name:'teste'},
			{name:'asd'},
			{name:'asds'}
		]
	}),

	methods:{
		createNewSupportRequest(){
			this.$router.push({ name: 'createNewSupport' })
		},
		SupportRequest(){
			this.$router.push({ name: 'requestSupport' })
		}
	},
	created(){

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