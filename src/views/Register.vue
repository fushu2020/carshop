<template>
    <div>
        <Header></Header>
        <section>
            <div class="form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="account">
                    <el-input type="text" prop="account" v-model="ruleForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                <el-radio label="销售员"></el-radio>
               <el-radio label="跟单员"></el-radio>
                <el-radio label="财务"></el-radio>
             </el-radio-group>
           </el-form-item>
                <el-form-item>
                    <el-button class="btn btn-primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button class="btn btn-outline-primary" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>
<script ></script>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import generous from '../../static/gengerous'
import axios from 'axios'
export default {
    components: {
        Header,
        Footer
    },
    data () {
        let account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          account: '',
          pass: '',
          checkPass: '',
          resource: ''
        },
        rules: {
          account: [
              { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /^(?!(\d+)$)[a-zA-Z\d_]{4,20}$/,
            message: '账号长度4-20，可包括数字、字母、下划线',
            trigger: 'blur'
          },
          { validator: account, trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let service = generous.url
            let role;
            if(this.ruleForm.resource=="销售员"){
              role=1;
            }else if(this.ruleForm.resource=="跟单员"){
              role=2;
            }else{
              role=3
            }
            let user = {
               "employeeName": this.ruleForm.account,
               "password": this.ruleForm.pass,
               "repassword": this.ruleForm.checkPass,
               "role": role
        }
        axios.post(service+'/employee/register',user).then(res=>{
          console.log(res.data);
          this.$message({
          message: '注册成功',
          type: 'success'
          })
          this.$router.push('/login')
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
.from{
    height: auto;
    width: 300px;
}
.demo-ruleForm{
    width: 500px;
    margin: 100px auto;
}
</style>
