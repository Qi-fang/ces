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
				
				<el-form-item label="手机号:" prop="phone1">
					<el-input id="phone1" class="code1" ref="phone1" v-model="ruleForm.phone1" placeholder="请输入手机号码" clearable></el-input>
				</el-form-item>
				<el-form-item id="code1" label="验证码:" prop="code1">
					<el-input class="code1" ref="code1" v-model="ruleForm.code1" placeholder="验证码"></el-input>
					<input id="phone_btn" class="ann" type="button" v-model="count" @click="btnCheck1">
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
				count: '获取',
				ruleForm: {
					r_account: "",
					r_nickname: '',
					password: "",
					pword: "",
					r_cp: "",
					name: '',
					phone1: "",
					code1: ""
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
					phone1: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							pattern: /^1[3456789]\d{9}$/,
							message: '请输入11位手机号',
							trigger: 'blur'
						}
					],
					code1: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							pattern: /^[0-9]{6}$/,
							message: '请输入6位数的验证码',
							trigger: 'blur'
						}
					],
				}
			}
		},
		methods: {
			// ================华丽的分割线====================
			//验证码按钮倒计时
			btnCheck1() {
				let _tel = this.$refs.phone1.value;
				let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (reg.test(_tel)) {
					const TIME_COUNT = 60;
					let url = this.$http + "/getSmsValidCode";
					this.$axios.get(url, {
						params:{tel: _tel}
					}).then((resp) => {
						let _code = Number(resp.data.code);
						if (_code !== -1) {
							this.$notify({
								title: '成功',
								message: resp.data.message,
								type: 'success'
							});
							if (!this.timer) {
								this.count = TIME_COUNT;
								this.timer = setInterval(() => {
									if (this.count > 1 && this.count <= TIME_COUNT) {
										this.count--;
									} else {
										clearInterval(this.timer);
										this.timer = null;
										this.count = "获取";
									}
								}, 1000)
							}
						} else {
							this.$notify({
								title: '提示',
								message: resp.data.message,
								type: 'warning'
							});
						}
					}).catch((err) => {
						console.log("错误信息" + err);
					})
				} else {
					this.$notify({
						title: '提示',
						message: "请正确输入手机号码",
						type: 'warning'
					});
				}
			},
			
			submitForm(formName) {
				let wt = plus.nativeUI.showWaiting();
				// 密码加密
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let _account = this.$refs.r_account.value;
						localStorage.setItem("_account", _account);
						let _passwd = this.$refs.password.value;
						let _nickname = this.$refs.r_nickname.value;
						let _phone1 = this.$refs.phone1.value;
						let _code1 = this.$refs.code1.value;
						let _code = "0";
						
						let smsValidCodeurl = this.$http + "/smsValidCode";
						let _datasmsValidCode = {
							account: _account,
							code: _code1,
						};
						let datasmsValidCode = this.$qs.stringify(_datasmsValidCode);
						let url = this.$http + "/reg";
						let _data = {
							account: _account,
							passwd: _passwd,
							tel: _phone1,
							nickname: _nickname,
							smsCode: _code1,
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
						this.$axios.post(smsValidCodeurl, datasmsValidCode, config).then((resp) => {
							plus.nativeUI.closeWaiting();
							let _code = Number(resp.data.code);
							if(_code !== -1){
								this.$axios.post(url, data, config).then((res) => {
									if(Number(res.data.code) !== -1){
										this.$axios.post(url1, data1, config).then((res1) => {
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
													message: res1.data.message,
													type: 'warning'
												});
											}
										}).catch((err)=>{
											console.log("错误信息" + err);
										})
									} else {
										this.$notify({
											title: '提示',
											message: res.data.message,
											type: 'warning'
										});
									}
								}).catch((err)=>{
									console.log("错误信息" + err);
								})
							}else{
								this.$notify({
									title: '提示',
									message: resp.data.message,
									type: 'warning'
								});
							}
						}).catch((err)=>{
							console.log("错误信息" + err);
						})
					} else {
						plus.nativeUI.closeWaiting();
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
			.r_account, .r_nickname, .password, .r_cp, .name, .pword, .code1{
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
	#code1 {
		position: relative;
		margin-top: 20px;
		width: 96%;
		#phone_btn {
			position: absolute;
			right: 0;
			width: 70px;
			height: 40px;
			background: #909399;
			border: none;
			color: white;
			border-radius: 5px;
		}
		
		#phone_btn:focus {
			outline: none;
		}
		
		#phone_btn:active {
			background: #409EFF;
		}
	}
	.ann {
		width: 70px;
		height: 40px;
	}
</style>
