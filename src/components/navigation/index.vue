<template>
	<div id="app">
		<v-app id="inspire">
			<v-card
				height="400"
				width="256"
				class="mx-auto"
				
			>
				<v-navigation-drawer permanent style="border-radius: 0%;" color="black" height="100vh" class="overflow-y-auto" >
					<v-list-item>
						<v-list-item-content  class="overflow-hidden">
							<v-list-item-title class="text-h6">
								<img :src="require('@/assets/RODO_LOGO.svg')"  />
							</v-list-item-title>

							<v-list-item-subtitle>
								a{{ $t('titleAplication') }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<div id="nav-container">
						<div class="toggle-icon">
							<span class="bar"></span>
							<span class="bar"></span>
							<span class="bar"></span>
						</div><!-- /toggle-icon -->
					</div><!-- /nav-container -->
					<v-divider></v-divider>
					<v-list dense nav dark>
						<v-list-item
							v-for="(item, index) in menuItens"
							:key="index"
							@click="navRouter(item.router)"
							link
						>
							<v-list-item-icon>
							<v-icon class="blue--text">{{ item.icon }}</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
							<v-list-item-title class="blue--text">{{ item.title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						</v-list>
				</v-navigation-drawer>
			</v-card>
		</v-app>
	</div>
</template>
  
<script>
export default {
	
	data() {
		return {
			menuItens: [
				{ title: this.$t('navgation.home'), icon: 'mdi-home', router:'home' },
				{ title: this.$t('navgation.listRequest'), icon: 'mdi-list-box', router:'list'},
				{ title: this.$t('borrow'), icon: 'mdi-home', router:'borrow' },
				{ title: this.$t('support'), icon: 'mdi-list-box', router:'ticketSupport'},
			],

			right: null,
		}
	},
	
	methods: {
		navRouter(nameRouter) {
			this.$emit('close');
			this.$route.name != nameRouter ? this.$router.push({ name: nameRouter }) :  ''
		}
	},
};
</script>
