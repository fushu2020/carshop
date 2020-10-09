 <template>
  <div>
    <Admin></Admin>
    <div class="w">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="车名" width="300">
        </el-table-column>
        <el-table-column prop="producerPrice" label="生产价格" width="120">
        </el-table-column>
        <el-table-column prop="sellingPrice" label="销售价格" width="120">
        </el-table-column>
        <el-table-column prop="brand" label="商标" width="120">
        </el-table-column>
        <el-table-column prop="enviromentLevel" label="排放标准" width="120">
        </el-table-column>
        <el-table-column prop="stock" label="存量" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="生产时间" width="299">
        </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toAdd_car_admin"
              >添加</el-button
            >
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              size="small"
              type="text"
              data-toggle="modal"
              data-target="#EditModel"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="text"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination @current-change="currentPage" layout="prev, pager, next" :total=totalPages></el-pagination>
    </div>

    <!-- EditModal -->
    <div
      class="modal fade"
      id="EditModel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="EditModelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditModelLabel">提示</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <el-form
              ref="form"
              :model="tableData"
              label-width="100px"
              size="mini"
            >
              <el-form-item label="车名：">
                <el-input v-model="tableData[0].name">{{
                  tableData.name
                }}</el-input>
              </el-form-item>
              <el-form-item label="生产价格：">
                <el-input v-model="tableData[0].producerPrice"></el-input>
              </el-form-item>
              <el-form-item label="销售价格：">
                <el-input v-model="tableData[0].sellingPrice"></el-input>
              </el-form-item>
              <el-form-item label="商标：">
                <el-input v-model="tableData[0].brand"></el-input>
              </el-form-item>
              <el-form-item label="能源类型：">
                <el-input v-model="tableData[0].powerType"></el-input>
              </el-form-item>
              <el-form-item label="存量：">
                <el-input v-model="tableData[0].stock"></el-input>
              </el-form-item>
              <el-form-item size="large"> </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <el-button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              >关闭</el-button
            >
            <el-button type="button" class="btn btn-success" @click="onSubmit"
              >保存</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- DelModal -->
    <!-- <div
      class="modal fade"
      id="DelModel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="DelModelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="DelModelLabel">提示</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea v-model="tableData[0].name"></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

  <script>
import Admin from "../components/Admin";
import axios from 'axios'
import gengerous from '../../static/gengerous'
export default {
  components: {
    Admin,
  },
  data() {
    return {
      totalPages: 1,
      pageNum: 1,
      tableData: [],
    };
  },
  created(){
    this.getCar();
    this.getPage()
  },
  methods: {
    getCar(){
      let service = gengerous.url
        axios.get(service+'/car/findAll',{}).then(res=>{
          console.log(res.data);
          this.tableData=res.data.data.dataList;
          console.log(this.tableData)
        })
    },
    toAdd_car_admin() {
      this.$router.push({ path: "/add_car_admin" });
    },
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
    rows.splice(index, 1);
  },
  getPage(){//获取分页
        let service = gengerous.url
      axios.get(service+'/car/findAll?pageSize=12&pageNum=' + this.pageNum,{}).then(res=>{
        console.log(res.data)
        this.tableData=res.data.data.dataList;
        this.totalPages = res.data.data.pages * 10;
        this.pageNum = res.data.data.pageNum;
      });
      },
      currentPage(val){
      this.pageNum = val;
      this.getPage()
    },
  },
  
};

</script>

<style scoped>
.w {
  margin-top: 50px;
}
</style>