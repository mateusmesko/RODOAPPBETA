import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './product'

import actions from './actions';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    requestGet(){
      const requestGet = localStorage.getItem('requestList');
      return requestGet ? JSON.parse(requestGet) : [];
    }
  },

  state,
  mutations,
  actions,

  modules: {
    product: productModule
  }
})

// import Vue from 'vue';
// import Vuex from 'vuex';



// Vue.use(Vuex);

// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
// });