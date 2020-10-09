<template>
  <div>
    <Admin></Admin>
    <div class="w">
      <!-- 车型 model车型，name车名，stock库存 -->
      <el-tabs v-model="activeName" class="center" >
        <el-tab-pane label="车型" name="first">
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
          <div style="margin: 20px"></div>
          <el-form 
            :label-position="labelPosition"
            label-width="80px"
            :model="AddForm"
            :rules="Add"
            ref="AddForm"
          >
            <el-form-item label="车型" prop="model">
              <el-select v-model="AddForm.model">
                  <el-option v-for="(model,index) in modelList" :key="index"  :value="model.model">{{model.model}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车名" prop="name">
              <el-input v-model="AddForm.name"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="stock">
              <el-input v-model="AddForm.stock"></el-input>
            </el-form-item>
            
          </el-form>
        </el-tab-pane>

        <!-- 轮胎 frontWheelSize前轮胎规格 rearWheelSize后轮胎规格-->
        <el-tab-pane label="轮胎规格" name="second">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            :model="AddForm"
            :rules="Add"
            ref="AddForm"
          >
            <el-form-item label="前轮胎规格" prop="frontWheelSize">
              <el-input v-model="AddForm.frontWheelSize">
              </el-input>
            </el-form-item>
            <el-form-item label="后轮胎规格" prop="rearWheelSize">
              <el-input v-model="AddForm.rearWheelSize"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 燃料 fuel燃料类型，fuelLabel燃料标号 oilSupply供油方式 environmentId排放标准-->
        <el-tab-pane label="燃料" name="third">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            :model="AddForm"
            :rules="Add"
            ref="AddForm"
          >
            <el-form-item label="燃料类型" prop="fuel">
                  <el-input v-model="AddForm.fuel"></el-input>
            </el-form-item>
            <el-form-item label="燃料标号" prop="fuelLabel">
              <el-input v-model="AddForm.fuelLabel"></el-input>
            </el-form-item>
            <el-form-item label="供油方式" prop="oilSupply">
              <el-input v-model="AddForm.oilSupply"></el-input>
            </el-form-item>
            <el-form-item label="排放标准" prop="environmentId">
              <el-input v-model="AddForm.environmentId"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 引擎 cylinder气缸数 displacement排量 driveBrake驱车制动类型 driveType驱动类型 
    forwordHanger前悬挂类型 frontBrake前制动类型 rearBrake后制动类型 rearHanger后悬挂类型
    intake进气形式 maxPower最大马力 maxTorque最大扭矩 powerType助力类型-->
        <el-tab-pane label="引擎" name="fourth">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            :model="AddForm"
            :rules="Add"
            ref="AddForm"
          >
            <el-form-item label="气缸数" prop="cylinder">
              <el-input v-model="AddForm.cylinder"></el-input>
            </el-form-item>
            <el-form-item label="排量" prop="displacement">
              <el-input v-model="AddForm.displacement"></el-input>
            </el-form-item>
            <el-form-item label="驱动类型" prop="driveType">
              <el-input v-model="AddForm.driveType"></el-input>
            </el-form-item>
            <el-form-item label="驱车制动类型" prop="driveBrake">
              <el-input v-model="AddForm.driveBrake"></el-input>
            </el-form-item>
            <el-form-item label="前悬挂类型" prop="cylinder">
              <el-input v-model="AddForm.cylinder"></el-input>
            </el-form-item>
            <el-form-item label="后悬挂类型" prop="displacement">
              <el-input v-model="AddForm.displacement"></el-input>
            </el-form-item>
            <el-form-item label="前制动类型" prop="driveType">
              <el-input v-model="AddForm.driveType"></el-input>
            </el-form-item>
            <el-form-item label="后制动类型" prop="driveBrake">
              <el-input v-model="AddForm.driveBrake"></el-input>
            </el-form-item>
            <el-form-item label="进气形式" prop="intake">
              <el-input v-model="AddForm.intake"></el-input>
            </el-form-item>
            <el-form-item label="最大马力" prop="maxPower">
              <el-input v-model="AddForm.maxPower"></el-input>
            </el-form-item>
            <el-form-item label="最大扭矩" prop="maxTorque">
              <el-input v-model="AddForm.maxTorque"></el-input>
            </el-form-item>
            <el-form-item label="助力类型" prop="powerType">
              <el-input v-model="AddForm.powerType"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 金额 producerPrice生产价格 sellingPrice销售价格-->
        <el-tab-pane label="金额" name="fifth">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            :model="AddForm"
            :rules="Add"
            ref="AddForm"
          >
            <el-form-item label="生产价格" prop="producerPrice">
              <el-input v-model="AddForm.producerPrice"></el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="sellingPrice">
              <el-input v-model="AddForm.sellingPrice"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 图片 url图片路径 isMain是否为主图-->
        <el-tab-pane label="图片" name="sixth">
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            :model="AddForm"
            :rules="Add"
            ref="AddForm"
          >
            <el-form-item label="是否为主图" prop="isMain">
              <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="图片路径" prop="url">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div>
            <el-button class="btn btn-secondary" @click="resetForm">重置</el-button>
            <el-button class="btn btn-success" >提交</el-button>
            </div>
    </div>
  </div>
</template>

<script>
import Admin from "../components/Admin";
import generous from '../../static/gengerous'
import axios from 'axios';

export default {
  components: {
    Admin,
  },
  data() {
    return {
        radio: "1",
      labelPosition: "right",
      AddForm: {
        name: "",
        model: "",
        stock: "",
        frontWheelSize: "",
        rearWheelSize: "",
        fuel: "",
        fuelLabel: "",
        oilSupply: "",
        environmentId: "",
        cylinder: "",
        displacement: "",
        driveBrake: "",
        driveType: "",
        forwordHanger: "",
        frontBrake: "",
        rearBrake: "",
        rearHanger: "",
        intake: "",
        maxPower: "",
        maxTorque: "",
        powerType: "",
        producerPrice: "",
        sellingPrice: "",
      },
      modelList:[],
      fileList: [],
    };
  },
  created(){
      this.getmodelList();
  },
  methods: {
      getmodelList(){
        let service = generous.url;
        axios.get(service+'/car/modelList',{}).then(res=>{
            // console.log(res.data.data);
            this.modelList = res.data.data;
            console.log(this.modelList);
        });
      },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetForm(){
        this.$router.go(0)
      }
  },
};
</script>
<style scoped>
.w {
  margin: 50px auto;
}
.center{
    width: 500px;
    margin: 0 auto;
}
</style>