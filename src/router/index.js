import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ListAll from '../views/ListAll.vue'
import Detail from '../views/Detail.vue'
import Ordering from '../views/Ordering.vue'
import Customer from '../views/Customer.vue'
import Customer_admin from '../views/Customer_admin.vue'
import Car_admin from '../views/Car_admin.vue'
import Ordering_admin from '../views/Ordering_admin.vue'
import Admin from '../components/Admin.vue'
import store from '../store/store'
import ListOne from '../views/ListOne.vue'
import ListTwo from '../views/ListTwo.vue'
import ListThree from '../views/ListThree.vue'
import SearchCar from '../views/SearchCar.vue'
import Add_car_admin from '../views/Add_car_admin.vue'
import Statistics from '../views/Statistics.vue'


Vue.use(Router)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/listall',
      name: 'ListAll',
      component: ListAll
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/ordering',
      name: 'Ordering',
      component: Ordering
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/customer_admin',
      name: 'Customer_admin',
      component: Customer_admin
    },
    {
      path: '/car_admin',
      name: 'Car_admin',
      component: Car_admin
    },
    {
      path: '/ordering_admin',
      name: 'Ordering_admin',
      component: Ordering_admin
    },
    {
      path: '/listone',
      name: 'ListOne',
      component: ListOne
    },
    {
      path: '/listtwo',
      name: 'ListTwo',
      component: ListTwo
    },
    {
      path: '/listthree',
      name: 'ListThree',
      component: ListThree
    },
    {
      path: '/searchcar', 
      component: SearchCar 
    },
    {
      path:'/add_car_admin',
      name: '/Add_car_admin',
      component: Add_car_admin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path:'/statistics',
      name: '/Statistics',
      component: Statistics
    },
  ];


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.token) {
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})

export default router;