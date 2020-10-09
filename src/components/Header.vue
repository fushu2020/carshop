<template>
<div>
        <header>
        <div class="w">
            <div class="hd_pic fl">
                <router-link to="/">
                <img  src="../assets/img/pic.png" alt="">
                </router-link>
            </div>
            <ul class="nav">
                <li class="nav-item">
                    <router-link to="/listall" class="nav-link">ALL</router-link>
                  </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/listone">轿车</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/listtwo">SUV</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/listthree">跑车</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#search-collapse" type="button" aria-expanded="false" aria-controls="search-collapse">搜索</a>
                </li>
                <li class="nav-item fr" style="padding-left: 150px;" v-if="!showEmployeeName">
                    <router-link to="/login" class="nav-link" v-if="!showEmployeeName">登录</router-link>
                    
                </li>
                <li class="nav-item" style="padding-left: 50px" v-else>
                    <router-link to="/customer" class="nav-link" v-if="showUserName">欢迎{{showUserName}}顾客</router-link>
                    <router-link to="/customer" class="nav-link" v-else>记录客人信息</router-link>
                </li>
                <li class="nav-item">
                      <a class="nav-link" v-if="showEmployeeName">导购员为:{{showEmployeeName}}</a>
                </li>
                <li class="nav-item">
                    <router-link to="/admin" class="nav-link" v-if="showEmployeeName">管理中心</router-link>
                  </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link" v-if="!showEmployeeName">注册</router-link>
                    <button class="btn btn-danger" v-if="showEmployeeName" @click="logOut">退出登录</button>
                  </li>
              </ul>
              <div class="collapse" id="search-collapse">
                  <div class="w card-body">
                    <form class="search">
                        <input class="form-control searchInput fl" v-model="carName" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-primary searchButton fl" @click="searchCar">Search</button>
                    </form>
                  </div>
              </div>
        </div>
    </header>
    
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import generous from '../../static/gengerous'
import axios from 'axios'
import mock from '../../static/mock'

export default {
  data (){
    return {
     emloyname:'',
     username:'',
     carName:'',
    }
  },
  computed:{
    showEmployeeName() {
      return localStorage.getItem('emloyname')
    },
    showUserName() {
      return localStorage.getItem('username')
    }
  },
  methods:{
    logOut(){
      localStorage.clear();
      this.$router.push('/login')
    },
    searchCar(){
      localStorage.setItem('carname',this.carName)
      this.$router.push({ path:'/searchcar'})
    }
  }
}
</script>
 <style>

 </style>
