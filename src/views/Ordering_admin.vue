<template>
  <div>
    <Admin></Admin>
    <div class="w">
    <!-- 车型号，顾客，订单号，销售员名字，订单状态，金额 -->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="employeeName" label="销售员" width="150"></el-table-column>
      <el-table-column prop="carName" label="车名" width="150"></el-table-column>
      <el-table-column prop="name" label="客户" width="150"></el-table-column>
      <el-table-column prop="address" label="地址" width="150"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="money" label="金额(万)"></el-table-column>
      <el-table-column prop="deliverStatus" label="订单状态"></el-table-column>
    </el-table>
    <el-pagination @current-change="currentPage" layout="prev, pager, next" :total=totalPages></el-pagination>
    </div>
  </div>
</template>

<script>

import Admin from '../components/Admin'
import axios from 'axios'
import gengerous from '../../static/gengerous'

export default {
  components: {
    Admin
  },
  data () {
    return {
      totalPages: 1,
      pageNum: 1,
      tableData: [],
    };
  },
  created(){
    this.getOrder();
  },
  methods :{
    getOrder(){
      let service = gengerous.url
      axios.get(service+'/order/findAll?pageSize=7&pageNum=' + this.pageNum,{}).then(res=>{
        console.log(res.data)
        this.tableData=res.data.data.dataList;
        this.totalPages = res.data.data.pages * 10;
        this.pageNum = res.data.data.pageNum;
      })
    },
    currentPage(val){
      this.pageNum = val;
      this.getOrder()
    },
  }
};

</script>

<style scoped>
  .w{
    margin-top:50px ;
  }
</style>