<template>
	<div id="category">
		<div class="title" @click="gopersonal">
			<i class="el-icon-arrow-left"></i>
			<span class="myboke">个人中心</span>
		</div>

		<div id="btn_modify">
			<!-- 更改昵称 -->
			<button class="btn" type="info" plain @click="dialogFormVisible = true">
				<span>更改昵称</span>
				<i class="el-icon-arrow-right"></i>
			</button>
			<el-dialog title="更改昵称" :visible.sync="dialogFormVisible" width="85%" append-to-body>
				<el-form :model="form" :rules="rules" ref="form">
					<el-form-item class="new_name" label="新的昵称：" prop="new_username">
						<el-input class="new_name_input new_username" ref="new_username" v-model="form.new_username" autocomplete="off"
						 clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button class="ann" @click="dialogFormVisible = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="modify_name('form')">提 交</el-button>
				</div>
			</el-dialog>
			
			<!-- 更改手机号码 -->
			<el-button class="btn" type="info" plain @click="outerVisible = true">
				<span>更改手机号码</span>
				<i class="el-icon-arrow-right"></i>
			</el-button>
			<el-dialog class="dialog1" title="更改手机号码" :visible.sync="outerVisible" width="85%" append-to-body>
				<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="70px" class="demo-ruleForm2">
					<el-form-item label="手机号:" prop="phone1">
						<el-input id="phone1" ref="phone1" v-model="ruleForm2.phone1" placeholder="请输入新的手机号码" clearable></el-input>
					</el-form-item>
					<el-form-item id="code1" label="验证码:" prop="code1">
						<el-input class="code1" ref="code1" v-model="ruleForm2.code1" placeholder="验证码"></el-input>
						<input id="phone_btn" class="ann" type="button" v-model="count" @click="btnCheck1">
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button class="ann" @click="outerVisible = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="forget1('ruleForm2')">确 定</el-button>
				</span>
			</el-dialog>
			
			<!-- 设置新的支付密码 -->
			<button class="btn" type="info" plain @click="dfvc = true">
				<span>更改支付密码</span>
				<i class="el-icon-arrow-right"></i>
			</button>
			<el-dialog class="dialogc" width="85%" title="更改支付密码" :visible.sync="dfvc" append-to-body>
				<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="90px" class="demo-ruleForm1">
					<el-form-item label="新密码:" prop="new_transaction">
						<el-input id="new_transaction" ref="new_transaction" v-model="ruleForm1.new_transaction" placeholder="请输入新密码"
						 clearable show-password></el-input>
					</el-form-item>
					<el-form-item id="code" label="确认密码:" prop="confirm_transaction">
						<el-input id="confirm_transaction" ref="confirm_transaction" v-model="ruleForm1.confirm_transaction" placeholder="请输入确认密码"
						 clearable show-password></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button class="ann" type="warning" @click="resetForm('ruleForm1')">重 置</el-button>
					<el-button class="ann" type="primary" @click="setc('ruleForm1')">修 改</el-button>
				</span>
			</el-dialog>

			<!-- =============================华丽的分割线================================= -->
			<button class="btn" type="info" plain @click="modify_password">
				<span>修改登陆密码</span>
				<i class="el-icon-arrow-right"></i>
			</button>
			<el-dialog class="dialog1" width="85%" title="修改登陆密码" :visible.sync="outerVisible_fp" append-to-body>
				<el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="90px" class="demo-ruleForm3">
					<el-form-item label="新密码:" prop="new_password">
						<el-input id="new_password" ref="new_password" v-model="ruleForm3.new_password" placeholder="请输入新密码"
						 clearable show-password></el-input>
					</el-form-item>
					<el-form-item id="confirm_password" label="确认密码:" prop="confirm_password">
						<el-input id="confirm_password" ref="confirm_password" v-model="ruleForm3.confirm_password" placeholder="请输入确认密码"
						 clearable show-password></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button class="ann" type="warning" @click="resetForm('ruleForm3')">重 置</el-button>
					<el-button class="ann" type="primary" @click="set('ruleForm3')">修 改</el-button>
				</span>
			</el-dialog>

			<!-- 我的银行卡 -->
			<button class="btn" type="info" plain @click="mbcs">
				<span>我的银行卡</span>
				<i class="el-icon-arrow-right"></i>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm3.new_password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm1.new_transaction) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				outerVisible: false,
				dialogFormVisible: false,
				dfvc: false,
				form: {
					new_username: '',
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					new_username: [{
							required: true,
							message: '请输入新的昵称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 15,
							message: '长度在 1 到 15 个字符',
							trigger: 'blur'
						}
					],
					new_password: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							pattern: /^[A-Za-z0-9]{6,14}$/,
							min: 6,
							max: 12,
							message: '长度在 6 到 12 个数字或英文字符',
							trigger: 'blur'
						}
					],
					confirm_password: [{
						required: true,
						validator: validatePass1,
						trigger: 'blur'
					}],
					new_transaction: [{
							required: true,
							message: '请输入新的支付密码',
							trigger: 'blur'
						},
						{
							pattern: /^[0-9]{6}$/,
							message: '请输入6位数的支付密码',
							trigger: 'blur'
						}
					],
					confirm_transaction: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
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
				},
				outerVisible_fp: false,
				innerVisible: false,
				timer: null,
				count: '获取',
				ruleForm1: {
					new_transaction: "",
					confirm_transaction: "",
				},
				ruleForm2: {
					phone: "",
					code: "",
				},
				ruleForm3: {
					new_password: '',
					confirm_password: ''
				},
			}
		},
		methods: {
			//返回我的
			gopersonal() {
				this.$router.replace('/personal');
			},
			
			//修改用户名
			modify_name(form) {
				let wt = plus.nativeUI.showWaiting();
				//提交
				this.$refs[form].validate((valid) => {
					if (valid) {
						this.dialogFormVisible = false;
						this.$refs[form].resetFields();
						let url = this.$http + "/changeMyInfo"
						let _nickname = this.$refs.new_username.value;
						let _realname = localStorage.getItem("realname");
						let _token = localStorage.getItem("token");
						let _data = {
							nickname: _nickname,
							realname: _realname,
							token: _token
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((res) => {
							plus.nativeUI.closeWaiting();
							let _code = Number(res.data.code);
							let res_token = res.data.token;
							localStorage.setItem("token", res_token);
							if(_code !== -1){
								this.$notify({
									title: '成功',
									message: '昵称修改成功',
									type: 'success'
								});
							}else{
								this.$notify({
									title: '提示',
									message: '昵称修改失败',
									type: 'warning'
								});
							}
						}).catch((err) => {
							console.log("错误信息" + err);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			
			// ================华丽的分割线====================
			//验证码按钮倒计时
			btnCheck1() {
				let _tel = this.$refs.phone1.value;
				if (_tel == /^[1][3,4,5,7,8][0-9]{9}$/) {
					const TIME_COUNT = 60;
					let url = this.$http + "/getSmsValidCode";
					let _token = localStorage.getItem("token");
					this.$axios.get(url, {
						params:{tel: _tel, token: _token}
					}).then((resp) => {
						let _code = Number(resp.data.code);
						if (_code !== -1) {
							this.$notify({
								title: '成功',
								message: resp.data.message,
								type: 'success'
							});
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
						message: "请正确输入手机号码",
						type: 'warning'
					});
				}
			},
			
			//更改手机号
			forget1(formName2) {
				let wt = plus.nativeUI.showWaiting();
				//提交
				this.$refs[formName2].validate((valid) => {
					if (valid) {
						let url = this.$http + "/userSmsValidCode"
						let _tel = this.$refs.phone1.value;
						let _code = this.$refs.code1.value;
						let _token = localStorage.getItem("token");
						let _data = {
							tel: _tel,
							code: _code,
							token: _token
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((res) => {
							plus.nativeUI.closeWaiting();
							let _code = Number(res.data.code);
							let res_token = res.data.token;
							localStorage.setItem("token", res_token);
							if(_code !== -1){
								this.$notify({
									title: '提示',
									message: res.data.message,
									type: 'success'
								});
							}else{
								this.$notify({
									title: '提示',
									message: res.data.message,
									type: 'warning'
								});
							}
						}).catch((err) => {
							console.log("错误信息" + err);
						})
						this.outerVisible = false;
						this.$refs[formName2].resetFields();
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},

			//更改支付密码
			setc(formName1) {
				let wt = plus.nativeUI.showWaiting();
				//提交
				this.$refs[formName1].validate((valid) => {
					if (valid) {
						let _newpasswd = this.$refs.new_transaction.valuet;
						let _token = localStorage.getItem("token");
						let url = this.$http + "/changeMoneyPasswd";
						let _data = {
							newpasswd: _newpasswd,
							token: _token
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((response) => {
							plus.nativeUI.closeWaiting();
							let _code = Number(response.data.code);
							let res_token = response.data.token;
							localStorage.setItem("token", res_token);
							if (_code !== -1) {
								this.$notify({
									title: '成功',
									message: '密码修改成功',
									type: 'success'
								});
					
								//密码修改成功后退出修改密码页 并提示修改密码完成
								this.innerVisible = false;
								this.outerVisible = false;
								this.$refs[formName1].resetFields();
							} else {
								this.$notify({
									title: '提示',
									message: '输入信息有误',
									type: 'warning'
								});
								this.innerVisible = true;
							}
						}).catch((error) => {
							console.log("错误信息" + error);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},

			// ================华丽的分割线====================
			//修改登录密码
			modify_password() {
				this.outerVisible_fp = true;
			},

			//修改密码
			set(formName3) {
				//提交
				this.$refs[formName3].validate((valid) => {
					if (valid) {
						let _newpasswd = this.$refs.new_password.value;
						let _account = localStorage.getItem("_account");
						let url = this.$http + "/changePasswd";
						let _data = {
							newpasswd: _newpasswd,
							account: _account
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((response) => {
							let _code = Number(response.data.code);
							let res_token = response.data.token;
							localStorage.setItem("token", res_token);
							if (_code !== -1) {
								this.$notify({
									title: '成功',
									message: '密码修改成功',
									type: 'success'
								});

								//密码修改成功后退出修改密码页 并提示修改密码完成
								this.innerVisible = false;
								this.outerVisible = false;
								this.$refs[formName3].resetFields();
							} else {
								this.$notify({
									title: '提示',
									message: '输入信息有误',
									type: 'warning'
								});
								this.innerVisible = true;
							}
						}).catch((error) => {
							console.log("错误信息" + error);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},

			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			//我的银行卡
			mbcs() {
				this.$router.replace('/personal/mybankcards');
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#category {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background: white;
		overflow: hidden;

		.title {
			position: absolute;
			margin: 10px 0 0 10px;
			z-index: 2;
			display: flex;
			justify-content: center;
			align-items: center;

			i {
				float: left;
				left: 10px;
				font-size: 25px;
			}
		}

		#btn_modify {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			margin-top: 50px;
			.btn {
				width: 90%;
				height: 40px;
				position: relative;
				margin-bottom: 10px;
				line-height: 10px;
				border: none;
				border-radius: 5px;
				// background: rgb(157, 218, 129);
				background: #4d80e6;
				color: white;
			
				span {
					position: absolute;
					float: left;
					left: 10px;
					top: 15px;
				}
			
				i {
					position: absolute;
					float: right;
					right: 10px;
					top: 15px;
				}
			}
		}
	}

	#code, #code1, #confirm_password, #code2 {
		position: relative;
		margin-top: 20px;

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

	// =================华丽的分割线=========================
	.new_name {
		margin-left: 30px;
	}

	.new_name_input {
		width: 120px;
	}

	.sub-title {
		margin: 15px;
	}

	.ann {
		width: 70px;
		height: 40px;
	}
</style>
