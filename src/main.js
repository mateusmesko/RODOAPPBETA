import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueMask from 'v-mask';

import VueI18n from 'vue-i18n';

Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(VueMask);

const messages = {
	'pt-BR': require('@/i18n/pt-BR.json')
};

const i18n = new VueI18n({
	locale: 'pt-BR', // Defina o idioma padrão
	messages
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
