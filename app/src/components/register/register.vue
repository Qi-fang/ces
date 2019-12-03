<template>
	<div id="register">
		<div class="register">
			<header>账号注册</header>
			<router-link id="login" to="/login">
				返回
			</router-link>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
				<el-form-item label="用户名:" prop="username">
					<el-input class="username" ref="username" v-model="ruleForm.username" placeholder="请输入账号" clearable></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input class="password" ref="password" v-model="ruleForm.password" placeholder="请输入密码" clearable show-password></el-input>
				</el-form-item>
				<el-form-item label="真实姓名:" prop="name">
					<el-input class="name" ref="name" v-model="ruleForm.name" placeholder="请输入真实姓名" clearable></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="phone">
					<el-input class="phone" ref="phone" v-model="ruleForm.phone" placeholder="请输入手机号码" clearable></el-input>
				</el-form-item>
				<el-button id="renz" type="info" @click="">头像认证</el-button>
				<span>&nbsp;&nbsp;&nbsp;可用于快捷登录、找回密码等</span>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: "",
					name: '',
					phone: "",
				},
				rules: {
					username: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
						{min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						{pattern: /^[A-Za-z0-9]{6,14}$/, min: 6, max: 12, message: '长度在 6 到 12 个数字或英文字符', trigger: 'blur'}
					],
					name: [
						{required: true, message: '请输入真实姓名', trigger: 'blur'},
						{min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
					],
					phone: [
						{required: true, message: '请输入手机号码', trigger: 'blur'},
						{pattern: /^1[3456789]\d{9}$/, message: '请输入长度为11位数的手机号码', trigger: 'blur'}
					],
				}
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.cityList1 = dat.slice(4, 5);
				}
			})
		},
		methods: {
			submitForm(formName) {
				let sha256 = require("js-sha256").sha256;
				this.pw = sha256(this.$refs.password.value);
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						console.log(this.$refs.username.value);
						console.log(this.pw);
						console.log(this.$refs.name.value);
						console.log(this.$refs.phone.value);
						// const token = response.data.token;
						const token = this.cityList1[0].token;
						window.localStorage.setItem('token', token);
						this.$router.replace('/recommend');
						this.$notify({
							title: '成功',
							message: '欢迎莅临',
							type: 'success'
						});
					} else {
						console.log('error submit!!');
						this.$message({
							message: '注册失败，请重新注册',
							type: 'warning'
						});
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="scss" scoped>
	#register {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: white;
		.register {
			width: 90%;
			max-width: 500px;
			height: 420px;
			box-shadow: 0px 0px 8px 3px rgba(169, 169, 169, 0.3);
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			position: relative;
			a {
				color: limegreen;
				text-decoration: none;
				display: inline-block;
				margin: 0 10px;
			}
			header {
				font-size: 25px;
				margin: 10px 0;
			}
			#login{
				position: absolute;
				top: 10px;
				left: 10px;
			}
			.username, .password, .name, .phone {
				max-width: 300px;
				width: 95%;
			}
			#renz{
				margin-bottom: 10px;
			}
			span{
				color: #909399;
				font-size: 13px;
			}
		}
	}
</style>
