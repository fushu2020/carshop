<template>
    <div>
        <Header></Header>
        <section>
            <div class="w">
                <el-page-header @back="goBack" content="详情页面">
                </el-page-header>
                <div>
                    <img :src="this.tableDataFirst.images[0].imageUrl" class="image">
                </div>
            </div>
            <el-row style="margin-bottom:100px">
              <a @click="toOrdering(tableDataFirst.name,tableDataFirst.sellingPrice)" class="btn btn-success">购买</a>
            </el-row>
            <div class="w table">
                <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本参数" name="first" class="tab">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>属性</th>
              <th>值</th>
            </tr>
          </thead>
	<tbody>
		<tr>
			<td>车型</td>
			<td>{{this.tableDataFirst.name}} </td>
		</tr>
		<tr>
			<td>商标</td>
			<td>{{ this.tableDataFirst.brand }}</td>
		</tr>
    <tr>
			<td>价格</td>
			<td>{{ this.tableDataFirst.sellingPrice }}万</td>
		</tr>
		<tr>
			<td>上市时间</td>
			<td>{{ this.tableDataFirst.createTime }}</td>
		</tr>
    <tr>
			<td>排放标准</td>
			<td>{{ this.tableDataFirst.enviromentLevel }}</td>
		</tr>
    <tr>
			<td>燃料类型</td>
			<td>{{ this.tableDataFirst.energyType }}</td>
		</tr>
    
	</tbody>
</table>
    </el-tab-pane>
    <el-tab-pane label="底盘及制动" name="second" class="tab">
        <!-- <el-table
                stripe
                :data="tableDataSecond"
                style="width: 100%">
                <el-table-column
                    prop="data"
                    label="参数"
                    width="200">
               </el-table-column>
                  <el-table-column
                 prop="value"
                 label="值"
                 width="300">
                  </el-table-column>
               </el-table> -->
               <table class="table table-hover">
          <thead>
            <tr>
              <th>属性</th>
              <th>值</th>
            </tr>
          </thead>
	<tbody>
		<tr>
			<td>前制动类型</td>
			<td>{{this.tableDataFirst.frontBrake}} </td>
		</tr>
		<tr>
			<td>后制动类型</td>
			<td>{{ this.tableDataFirst.rearBrake }}</td>
		</tr>
    <tr>
			<td>驱车制动类型</td>
			<td>{{ this.tableDataFirst.driveBrake }}</td>
		</tr>
		<tr>
			<td>后悬挂类型</td>
			<td>{{ this.tableDataFirst.rearHanger }}</td>
		</tr>
    <tr>
			<td>前悬挂类型</td>
			<td>{{ this.tableDataFirst.forwordHanger }}</td>
		</tr>
    <tr>
			<td>前轮胎规格</td>
			<td>{{ this.tableDataFirst.frontWheelSize }}</td>
		</tr>
    <tr>
			<td>后轮胎规格</td>
			<td>{{ this.tableDataFirst.rearWheelSize }}</td>
		</tr>
    <tr>
			<td>助力类型</td>
			<td>{{ this.tableDataFirst.powerType }}</td>
		</tr>
    <tr>
			<td>驱动方式</td>
			<td>{{ this.tableDataFirst.driveType }}</td>
		</tr>
	</tbody>
</table>
    </el-tab-pane>
    <el-tab-pane label="发动机" name="third" class="tab">
               <table class="table table-hover">
          <thead>
            <tr>
              <th>属性</th>
              <th>值</th>
            </tr>
          </thead>
	<tbody>
		<tr>
			<td>气缸数</td>
			<td>{{this.tableDataFirst.cylinder}} </td>
		</tr>
		<tr>
			<td>最大马力</td>
			<td>{{ this.tableDataFirst.maxPower }}</td>
		</tr>
    <tr>
			<td>进气形式</td>
			<td>{{ this.tableDataFirst.intake }}</td>
		</tr>
		<tr>
			<td>最大扭矩</td>
			<td>{{ this.tableDataFirst.maxTorque }}</td>
		</tr>
    <tr>
			<td>燃料类型</td>
			<td>{{ this.tableDataFirst.fuel }}</td>
		</tr>
    <tr>
			<td>排放标准</td>
			<td>{{ this.tableDataFirst.enviromentLevel }}</td>
		</tr>
    <tr>
			<td>燃油标号</td>
			<td>{{ this.tableDataFirst.fuelLabel }}</td>
		</tr>
    <tr>
			<td>排量</td>
			<td>{{ this.tableDataFirst.displacement }}</td>
		</tr>
    <tr>
			<td>供油方式</td>
			<td>{{ this.tableDataFirst.oilSupply }}</td>
		</tr>
	</tbody>
</table>
    </el-tab-pane>
    
  </el-tabs>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import gengerous from '../../static/gengerous'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'

export default {
    components: {
        Header,
        Footer
    },
    data () {
        return {
            activeName: 'first',
           tableDataFirst: [],
          }
    },
    created(){
      this.getCar()
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      getCar(){
        let service = gengerous.url
        let carid = localStorage.getItem('carid')
        axios.get(service+'/car/selectOne?carId='+carid,{}).then(res=>{
          console.log(res.data);
          this.tableDataFirst=res.data.data
        })
      },
      toOrdering(name,price){
        localStorage.setItem('carname',name);
        localStorage.setItem('carprice',price);
        this.$router.push({path: '/ordering'})
      }
    }
}
</script>

<style scoped>
.image{
    margin: 20px auto;
    width: 800px;
    box-shadow: 0 0 10px #999;
    border-radius: 10px;
}
.table{
    width: 500px;
}
.tab{
    width: auto;
}
</style>
