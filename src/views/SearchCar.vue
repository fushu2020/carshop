<template>
<div>
<Header></Header>
<section>
<div class="list w">
    <el-row>
            <el-divider content-position="left" class="divider">所有轿车</el-divider>
  <el-col :span="8" v-for="(list,index) in carList" :key="index" :offset="index > 0 ? 2 : 0" class="list-card">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img :src="list.mainUrl" class="image" @click="toDetail(list.id)">
      <div style="padding: 14px;">
        <span >{{list.name}}</span>
        <div class="bottom clearfix">
          <time class="time price">{{list.sellingPrice}}万</time>
          <el-button type="text" class="button" @click="toDetail(list.id)">详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
<div class="block">
  <el-pagination
  @current-change="currentPage"
    layout="prev, pager, next"
    :total=totalPages>
  </el-pagination>
</div>
</div>

</section>
<Footer></Footer>
</div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import gengerous from '../../static/gengerous'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    components: {
        Header,
        Footer
    },
    data () {
        return {
            currentDate: new Date(),
            carList:{
              id:'',
              name:'',
              sellingPrice:'',
              images:''
            },
            totalPages:'',
            pageNum:'',
            carName:''
        }
    },
    created(){
      this.getList();
    },
    methods: {
      toDetail (id) {//获取该车id并跳转到此车详情页
          localStorage.setItem('carid',id)
          this.$router.push({path: '/detail'})
        },
      getList(){
        let service = gengerous.url
        axios.get(service+'/car/selectCarByCarName?carName='+localStorage.getItem('carname'),{}).then(res=>{
          console.log(res.data);
          this.carList=res.data.data.dataList
        })
      },
      test(){
          let service = gengerous.url
          console.log(service+'/car/selectCarByName?carName='+localStorage.getItem('carname'))
      },
      currentPage(val){
      this.pageNum = val;
      this.getEmployee();
    },

    }
}
</script>

<style scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .list{
      margin-top: 100px;
  }
  .el-col-8{
      width: 20%;
      margin: 10px 60px 10px 0;
  }
  .list-card:hover{
            border-color: black;
            -webkit-transform: translateY(-10px);
            -ms-transform: translateY(-10px);
            transform: translateY(-10px);
            -webkit-box-shadow: 0 0 10px #999;
            box-shadow: 0 0 10px #999;
            -webkit-transition: all .5s ease-out;
            transition: all .5s ease-out;
  }
  .price{
    color: red;
  }
  .card{
    height: 300px;
  }
</style>
