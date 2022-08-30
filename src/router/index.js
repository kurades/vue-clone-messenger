import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // name : "home",
    path : "/",
    redirect : "/t/2",
    // component : ()=> import('@/views/HomeView.vue')
  },
  {
    name : "detail",
    path : "/t/:id",
    component : ()=>import('@/components/MainSection.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
