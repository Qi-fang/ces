<template>
	<div id="register">
		<div class="register">
			<header>账号注册</header>
			<router-link id="login" to="/login">
				返回
			</router-link>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
				<el-form-item label="账号:" prop="r_account">
					<el-input class="r_account" ref="r_account" v-model="ruleForm.r_account" placeholder="请输入账号" clearable></el-input>
				</el-form-item>
				<el-form-item label="昵称:" prop="r_nickname">
					<el-input class="r_nickname" ref="r_nickname" v-model="ruleForm.r_nickname" placeholder="请输入昵称" clearable></el-input>
				</el-form-item>
				<el-form-item label="登录密码:" prop="password">
					<el-input class="password" ref="password" v-model="ruleForm.password" placeholder="请输入登录密码" clearable show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码:" prop="r_cp">
					<el-input class="r_cp" ref="r_cp" v-model="ruleForm.r_cp" placeholder="请再次输入登录密码" clearable show-password></el-input>
				</el-form-item>
				<el-form-item label="支付密码:" prop="pword">
					<el-input class="pword" ref="pword" v-model="ruleForm.pword" placeholder="请输入支付密码" clearable show-password></el-input>
				</el-form-item>
				<el-form-item label="真实姓名:" prop="name">
					<el-input class="name" ref="name" v-model="ruleForm.name" placeholder="请输入真实姓名" clearable></el-input>
				</el-form-item>
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
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					r_account: "",
					r_nickname: '',
					password: "",
					pword: "",
					r_cp: "",
					name: '',
				},
				rules: {
					r_account: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
						{min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
					],
					r_nickname: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
						{min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入登录密码', trigger: 'blur'},
						{pattern: /^[A-Za-z0-9]{6,14}$/, min: 6, max: 12, message: '长度在 6 到 12 个数字或英文字符', trigger: 'blur'}
					],
					r_cp: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}],
					pword: [
						{required: true, message: '请输入支付密码', trigger: 'blur'},
						{pattern: /^[0-9]{6}$/, message: '请输入6位数支付密码', trigger: 'blur'}
					],
					name: [
						{required: true, message: '请输入真实姓名', trigger: 'blur'},
						{min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
					],
				}
			}
		},
		methods: {
			submitForm(formName) {
				let wt = plus.nativeUI.showWaiting();
				// 密码加密
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let _account = this.$refs.r_account.value;
						sessionStorage.setItem("_account", _account);
						let _nickname = this.$refs.r_nickname.value;
						let _passwd = this.$refs.password.value;
						let _moneyPasswd = this.$refs.pword.value;
						let _realname = this.$refs.name.value;
						localStorage.setItem("realname", _realname);
						let _code = "0";
						
						let url = this.$http + "/reg";
						let _data = {
							account: _account,
							passwd: _passwd,
							moneyPasswd: _moneyPasswd,
							nickname: _nickname,
							realname: _realname,
							code: _code
						};
						let data = this.$qs.stringify(_data);
						let url1 = this.$http + "/login";
						let _data1 = {
							username: _account,
							passwd: _passwd
						};
						let data1 = this.$qs.stringify(_data1);
						let config = {
						    headers: {
						        'Content-Type': 'application/x-www-form-urlencoded'
						    }
						}
						this.$axios.post(url, data, config).then((res) => {
							this.$axios.post(url1, data1, config).then((res1) => {
								plus.nativeUI.closeWaiting();
								const token = res1.data.token;
								let _code = Number(res1.data.code);
								window.localStorage.setItem('token', token);
								if(_code !== -1){
									this.$router.replace('/recommend');
									this.$notify({
										title: '成功',
										message: '欢迎莅临',
										type: 'success'
									});
								}else{
									this.$notify({
										title: '提示',
										message: '登录失败，请重新登录',
										type: 'warning'
									});
								}
							}).catch((err)=>{
								console.log("错误信息" + err);
							})
						})
						.catch((err)=>{
							console.log("错误信息" + err);
						})
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
			
			//重置
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
			height: 485px;
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
			.r_account, .r_nickname, .password, .r_cp, .name, .pword {
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
