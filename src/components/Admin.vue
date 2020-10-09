<template>
<div>
<el-menu :default-active="activeIndex2" class="el-menu-demo"  mode="horizontal"  
@select="handleClick"  background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b">
  <el-menu-item index="1">后台管理中心</el-menu-item>
  <el-menu-item index="2" @click="toCustomer_admin">员工中心</el-menu-item>
  <el-menu-item index="3" @click="toOrdering_admin">订单中心</el-menu-item>
  <el-menu-item index="4" @click="toStatistics">统计管理</el-menu-item>
  <el-menu-item index="5" @click="toCar_admin">车管理</el-menu-item>
  <router-link to="/" class="btn btn-danger">退出</router-link>
</el-menu>

<!-- 面包屑 显示点击路径 -->
<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/Admin/' }">后台管理中心</el-breadcrumb-item>
  <el-breadcrumb-item>员工中心</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb> -->
  

</div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      toCustomer_admin() {
        this.$router.push({path: '/customer_admin'})
      },
      toCar_admin(){
        this.$router.push({path:'/car_admin'})
      },
      toOrdering_admin(){
        this.$router.push({path:'/ordering_admin'})
      },
      toStatistics(){
        this.$router.push({path:'/statistics'})
      }
    },
  };


 
</script>

<style scoped>


  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .btn {
    margin-top: 11px;
  }
</style>