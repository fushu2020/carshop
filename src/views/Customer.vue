<template>
<div>
    <Header></Header>
    <div class="w">
        <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="手机号码" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="地址" prop="address">
      <el-input v-model="ruleForm.address"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex">
    <el-radio-group v-model="ruleForm.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="VIP等级" prop="vip">
    <el-select v-model="ruleForm.vip" placeholder="请选择客户VIP等级">
      <el-option label="VIP1" value="VIP1"></el-option>
      <el-option label="VIP2" value="VIP2"></el-option>
      <el-option label="VIP3" value="VIP3"></el-option>
      <el-option label="VIP4" value="VIP4"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item prop="date1" label="登记日期">
<div class="block">
    <el-date-picker
      v-model="ruleForm.value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</section>
    </div>
    <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import generous from '../../static/gengerous'
import axios from 'axios'
import Cookies from 'js-cookie'

  export default {
      components: {
          Header,
          Footer
      },
    data () {
      return {
          pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        ruleForm: {
          name: '',
          phone: '',
          email:'',
          vip: '',
          address:'',
          delivery: false,
          type: [],
          value1: '',
          sex: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          vip: [
            { required: true, message: '请选择会员级别', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let service = generous.url
            let vip;
            if(this.ruleForm.vip=="VIP1"){
              vip=1;
            }else if(this.ruleForm.vip=="VIP2"){
              vip=2;
            }else if(this.ruleForm.vip=="VIP3"){
              vip=3;
            }
            else{
              vip=4
            };
            let user = {
              "username": this.ruleForm.name,
              "phone": this.ruleForm.phone,
              "email": this.ruleForm.email,
              "address": this.ruleForm.address,
              "sex": this.ruleForm.sex,
              "vip": this.ruleForm.vip
            };
            axios.post(service+'/user/add',user).then(res=>{
          console.log(res.data);
          localStorage.setItem('username',this.ruleForm.name)
          localStorage.setItem('userphone',this.ruleForm.phone)
          localStorage.setItem('useraddress',this.ruleForm.address)
          localStorage.setItem('usersex',this.ruleForm.sex)
          localStorage.setItem('uservip',this.ruleForm.vip)
          localStorage.setItem('userid',res.data.data.userId)
          this.$message({
          message: '记录成功',
          type: 'success'
          })
          this.$router.push('/')
        })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
section{
    width: 500px;
    margin: 100px auto;
}
</style>
