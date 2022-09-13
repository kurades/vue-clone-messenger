import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: `/t/${store.state.user}` || '/t/1',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        name: "detail",
        path: "/t/:id",
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/components/MainSection.vue')
      }
    ]
  },
  {
    path: "/login",
    component: () => import('@/views/LoginView.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.userName !== "") {
      next();
    } else {
      next({ path: "/login" })
    }
  } else {
    next();
  }

})

export default router
