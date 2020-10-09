<template>
    <div >
        <Header></Header>
        <section>
        <div class="login_box">
			<!-- logo盒子 -->
			<div style="margin: 0 auto;text-align: center;">
				<h1>Login</h1>
			</div>
			<!-- 返回首页 -->

			<!-- 表单盒子 -->
			<el-form class="login_form" >
				<!-- 用户名 -->
				<form style="width:250px;height:60px" prop="account">
						<input type="text"
						v-model="account"
						   prefix-icon="iconfont icon-user"
						   required
						   autocomplete="off"
						   style="
						background-color:#F2F2F2;
                         text-align:center;
                         padding-left: 2px;
                         padding-right: 2px;
                         padding-bottom: 1px;
                         width: 250px;
                         height: 50px;" />
					<label>
						<span style="top: 27px;bottom: 48px;right: 92px; width: 250px;height: 24px;text-align:center">
							Username
						</span>
					</label>
				</form>
				<form style="width:250px;height:60px" prop="pass">
					<input type="password"
						   required
						   autocomplete="off"
						   v-model="pass"
						   style="
						background-color:#F2F2F2;
                         text-align:center;
                         padding-left: 2px;
                         padding-right: 2px;
                         padding-bottom: 1px;
                         width: 250px;
                         height: 50px;"
						    show-password/>
					<label>
						<span style="top: 27px;bottom: 48px;right: 92px; width: 250px;height: 24px;text-align:center">
							Password
						</span>
					</label>
				</form>
				<!--<el-form-item prop="userName">
					<el-input v-model="userLogin_form.userName" prefix-icon="iconfont icon-user" placeholder="请输入用户名或邮箱" clearable></el-input>
				</el-form-item>-->
				<!-- 密码 -->
				<!--<el-form-item prop="userPsw">
					<el-input v-model="userLogin_form.userPsw" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码" show-password></el-input>
				</el-form-item>-->
				<!-- 按钮 -->
				<el-form-item class="btns">
					<el-button class="btn btn-primary" @click="userLog">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
        </section>
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
			account: '',
			pass: ''
		}
	},
	methods: {
		userLog () {
			
			console.log(this.account)
			console.log(this.pass)
			let user = {
               'employeeName': this.account,
               'password': this.pass
		}
			let service = generous.url
			// 向后台提交登录请求
			axios.post(service + '/employee/login', user).then(res => {
				if(res.status != 200){
					this.$message({
          			message: '登录失败',
					  type: 'error'
					}),
					this.$router.push('/login')
				}else{
				localStorage.setItem('emloyname',this.account)
				localStorage.setItem('emloyid',res.data.data.id)
		  this.$message({
          message: '登录成功',
          type: 'success'
		})
		this.$router.push('/')
		}
        })
		}
	}
}
</script>

<style scoped>
section{
    width: auto;
    height: 450px;
}
	.navbar {
		font-weight: bold;
		background:black;
		display: flex;
		justify-content: space-between;
		align-content: center;
		width: 100%;
		height: 70px;
		max-width: 1280px;
		margin: 0 auto;
		padding: 5px 20px 10px 20px;
		box-shadow: 0px 10px 20px 20px black;
	}
	.btn-primary{
		color:#fff;
		background-color:#007bff;
		border-color:#007bff;
	}
        .btn-primary:hover {
            color: #fff;
            background-color: #0069d9;
            border-color: #0069d9
        }
    form {
        width: 50%;
        margin: auto;
        position: relative;
        overflow: hidden;
    }

        form input {
            height: 2rem;
            width: 10rem;
            padding-top: 1rem;
            border: none;
            border-bottom: 0.1rem solid black;
            outline: none;
        }

        form label {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
        }

            form label::after {
                content: "";
                height: 3.2rem;
                width: 20rem;
                position: absolute;
                top: 0;
                left: 0;
                border-bottom: 0.2rem solid #0069d9;
                transform: translateX(-100%);
                transition: all 0.3s ease;
            }

            form label span {
                position: absolute;
                left: 0;
                transition: all 0.3s ease;
            }

        form input:focus + label span,
        form input:valid + label span {
            transform: translateY(-120%);
            font-size: 1.2rem;
            color: #0069d9;
        }

        form input:focus + label::after,
        form input:valid + label::after {
            transform: translateX(0);
        }
	.user_login {
		background-image:url(../assets/img/pic4.jpg);
		   background-size: cover;
		   width: 100%;
		   height: 100%;
	}
	.back{
		color: #C0CCDA;
		position: absolute;
		top: 15px;
		left: 20px;
	}
	.login_box {
		width: 450px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		background-color: #F2F2F2;
	}

	.logo_box {
		width: 130px;
		height: 130px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 1px solid #eee;
		box-shadow: 0 0 10px #ddd;
		border-radius: 50%;
		padding: 10px;
	}

	.logo_box img {
		width: 100%;
		height: 100%;
		background-color: #eee;
		border-radius: 50%;
	}

	.login_form {
		width: 100%;
		bottom: 0;
		padding: 20px;
	}

	.btns {
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}
	.backBtn {
		color: #C0CCDA;
		position: absolute;
		top: 15px;
		left: 20px;
	}
</style>
