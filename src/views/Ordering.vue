<template>
    <div>
        <Header></Header>
        <div class="w">
                <el-divider content-position="left" class="divider">订单信息</el-divider>
                <el-table
      :data="order_tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="车名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="300">
      </el-table-column>
      <el-table-column
        prop="employee"
        label="导购员">
      </el-table-column>
      <el-table-column
        prop="price"
        label="需付金额(万)">
      </el-table-column>
    </el-table>
    <el-divider content-position="left" class="divider">客户信息</el-divider>
    <el-table
      :data="customer_tableData"
      style="width: 100%">
      <el-table-column
        prop="customerName"
        label="订单人"
        width="250">
      </el-table-column>
      <el-table-column
        prop="takeName"
        label="收货人"
        width="300">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="address"
        label="收货地址">
      </el-table-column>
    </el-table>
    <el-row style="margin-top:50px">
        <a  class="btn btn-primary" @click="confirmOrder">确认订单</a>
        <a  class="btn btn-primary" @click="test" v-show="this.order_tableData[0].status=='未支付'">支付</a>
    </el-row>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import gengerous from '../../static/gengerous'
import axios from 'axios'
export default {
    components: {
        Header
    },
    data () {
        
        return {
          order_tableData: [{
            id: '123',
            name: localStorage.getItem('carname'),
            status: '未支付',
            employee: localStorage.getItem('emloyname'),
            price: localStorage.getItem('carprice')
          }],
          customer_tableData: [{
              customerName: localStorage.getItem('username'),
              takeName: localStorage.getItem('username'),
              phone: localStorage.getItem('userphone'),
              address: localStorage.getItem('useraddress')
          }]
        }
        const tableData={
            id: false,
            name: localStorage.getItem('carname'),
            status: id ? '已支付' :'未支付',
            employee: localStorage.getItem('emloyname'),
            price: localStorage.getItem('carprice')
        }
      },
      methods:{
        test(){
          console.log(this.order_tableData[0].status)
          if(this.order_tableData[0].status=='已支付'){
            this.order_tableData[0].status='未支付'
          }else{
            this.order_tableData[0].status='已支付'
          }
          // this.tableData.id=!this.tableData.id;
          // console.log(this.tableData.status)
        },
        confirmOrder(){
          let service = gengerous.url;
          let status;
          if(this.order_tableData[0].status=='已支付'){
            localStorage.setItem('paystatus','1')
          }else{
            localStorage.setItem('paystatus','0')
          }
          let order={
            "address": this.customer_tableData[0].address,
            "carId": localStorage.getItem('carid'),
            "deliverStatus": 0,
            "employeeId": localStorage.getItem('emloyid'),
            "money": this.order_tableData[0].price,
            "name": this.customer_tableData[0].customerName,
            "orderId": "string",
            "payStatus": localStorage.getItem('paystatus'),
            "phone": this.customer_tableData[0].phone,
            "userId": localStorage.getItem('userid')
          };
          console.log(order)
          axios.post(service+'/order/add',order).then(res =>{
            console.log(res.data)
        this.$router.push({path: '/ordering_admin'})
          })
        }
      }
}
</script>

<style scoped>
.w{
    margin-top: 150px;
}
.divider{
    margin-top: 50px;
}
</style>
