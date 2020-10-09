 <template>
  <div>
    <Admin></Admin>
    <div class="w">
      <el-table :data="tableData" style="width: 100%" stripe>
        <!-- 姓名，年龄，性别，手机，头像，角色 -->
        <!-- <el-table-column prop="img" label="头像" width="150"></el-table-column> -->
        <el-table-column
          prop="employeeName"
          label="姓名"
          width="180"
        ></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="180"></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
        ></el-table-column>
        <el-table-column prop="role" label="角色" width="180"></el-table-column>

        <!-- <el-table-column label="序号">
            <template slot-scope="scope">
              {{ scope.$index }} 
            </template>
          </el-table-column> -->

        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#EditModel"
              @click="getOne(scope.$index)"
              >编辑</el-button
            >
            <el-button
              type="button"
              class="btn btn-danger"
              @click="deleteOne(scope.$index,tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="currentPage"
      layout="prev, pager, next"
      :total="totalPages"
    ></el-pagination>

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
            <h5 class="modal-title" id="EditModelLabel">编辑</h5>
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
            <!-- 编辑弹窗表单 -->
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="姓名" prop="employeeName">
                <el-input v-model="item.employeeName" id="employeeName" readonly="true">
                  {{item.employeeName}}</el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="item.age" id="age">{{ item.age }}</el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="item.sex" id="sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="item.phone" id="phone">{{
                  item.phone
                }}</el-input>
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-radio-group v-model="item.role" id="role">
                  <el-radio label="销售员" name="role"></el-radio>
                  <el-radio label="订单跟踪员" name="role"></el-radio>
                  <el-radio label="财务统计员" name="role"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm',item.employeeName,item.id,item.age,item.sex,item.phone,item.role)"
                  data-dismiss="modal"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import Admin from "../components/Admin";
import Footer from "../components/Footer";
import generous from "../../static/gengerous";
import axios from "axios";
import gengerous from '../../static/gengerous';
export default {
  components: {
    Admin,
  },

  data() {
    return {
      tableData: [],
      totalPages: 1,
      pageNum: 1,
      item: {},
      ruleForm: {
        name: "",
        role: [],
        sex: "",
        age: "",
        phone: "",
      },
    };
  },
  created() {
    this.getEmployee();
  },
  methods: {
    getEmployee() {
      let service = generous.url;
      axios
        .get(
          service + "/employee/findAll?pageSize=7&pageNum=" + this.pageNum,
          {}
        )
        .then((res) => {
          this.tableData = res.data.data.dataList;
          this.totalPages = res.data.data.pages * 10;
          this.pageNum = res.data.data.pageNum;
          console.log(res.data.data.dataList);
        });
    },
    currentPage(val) {
      this.pageNum = val;
      this.getEmployee();
    },
    submitForm(formName,name,id,age,sex,phone,role) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let service = generous.url;
          localStorage.setItem('customerid',id)
          localStorage.setItem('customername',name)
          localStorage.setItem('customerage',age)
          localStorage.setItem('customersex',sex)
          localStorage.setItem('customerphone',phone)
          localStorage.setItem('customerrole',role)
          let employee={
            "id": localStorage.getItem('customerid'),
          "employeeName": localStorage.getItem('customername'),
          "age": localStorage.getItem('customerage'),
          "sex": localStorage.getItem('customersex'),
          "phone": localStorage.getItem('customerphone'),
          }
          axios.put(service+'/employee/update?id='+id,employee).then(res=>{
            console.log(res)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getOne(element) {
      let index = element;
      console.log(element);
      this.item = JSON.parse(JSON.stringify(this.tableData[index]));
      console.log(this.item);
    },

    deleteOne(index,rows) {
      let id=this.tableData[index].id
      if (confirm("确认删除吗？")) {
        let service = gengerous.url
        console.log(id)
        // localStorage.setItem('deleteid'.id)
        axios.delete(service+'/employee/delete?employeeId='+id,{}).then(res=>{
          if(res.status === 200){
            rows.splice(index,1)
          }
          console.log(res.status)
        })
      }
    },
  },
};
</script>
<style scoped>
.w {
  margin: 50px auto;
}
</style>