import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/home')
//    component: () => import('../views/HomeRequest.vue')
  },


  {
    path: '/create',
    name: 'create',
    component: () => import('../components/request/createRequest')
  },

  {
    path: '/created/:id',
    name: 'createdWithId',
    props: (route) => ({
      id: route.params.id,
      editData: route.query.editData,
    }),
    component: () => import('../components/request/createRequest')
  },

  {
    path: '/list',
    name: 'list',
    component: () => import('../components/request/listRequest')
  },
  
  {
    path: '/product',
    name: 'product',
    component: () => import('../components/request/products')
  },

  {
    path: '/borrow',
    name: 'borrow',
    component: () => import('../components/borrow')
  },

  {
    path: '/ticketSupport',
    name: 'ticketSupport',
    component: () => import('../components/ticketSupport')
  },
  {
    path: '/createNewSupport',
    name: 'createNewSupport',
    component: () => import('../components/ticketSupport/createNewSupport')
  },
  {
    path: '/requestSupport',
    name: 'requestSupport',
    component: () => import('../components/ticketSupport/requestSupport')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
