<template>
	<div id="modify">
		<div class="title">
			<i class="el-icon-arrow-left" @click="gopersonal"></i>
			<span class="myboke">我的博客</span>
		</div>
		<div id="btn_modify">
			<el-button class="btn" type="info" plain @click="dialogFormVisible = true">
				<span>更改昵称</span>
				<i class="el-icon-arrow-right"></i>
			</el-button>
			<el-dialog title="更改昵称" :visible.sync="dialogFormVisible" width="85%" append-to-body>
				<el-form :model="form" :rules="rules" ref="form">
					<el-form-item class="new_name" label="新的昵称：" prop="new_username">
						<el-input class="new_name_input new_username" ref="new_username" v-model="form.new_username" autocomplete="off" clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button class="ann" @click="dialogFormVisible = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="modify_name('form')">提 交</el-button>
				</div>
			</el-dialog>

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
						<input id="phone_btn" class="ann" type="button" v-model="count" @click="btnCheck1()">
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button class="ann" @click="outerVisible = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="forget1('ruleForm2')">确 定</el-button>
				</span>
			</el-dialog>

			<el-button class="btn" type="info" plain @click="modify_password">
				<span>找回密码</span>
				<i class="el-icon-arrow-right"></i>
			</el-button>

			<!-- =============================华丽的分割线================================= -->
			<el-dialog class="dialog1" title="找回密码" :visible.sync="outerVisible_fp" width="85%" append-to-body
			 :close-on-click-modal="false" :show-close="false">
				<!-- 设置新密码 -->
				<el-dialog class="dialog2" width="85%" title="修改密码" :visible.sync="innerVisible" append-to-body>
					<el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="90px" class="demo-ruleForm3">
						<el-form-item label="新密码:" prop="new_password">
							<el-input id="new_password" ref="new_password" v-model="ruleForm3.new_password" placeholder="请输入新密码" clearable
							 show-password></el-input>
						</el-form-item>
						<el-form-item style="margin-top: 15px;" label="确认密码:" prop="confirm_password">
							<el-input id="confirm_password" ref="confirm_password" v-model="ruleForm3.confirm_password" placeholder="请输入确认密码"
							 clearable show-password></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button class="ann" type="warning" @click="resetForm('ruleForm3')">重 置</el-button>
						<el-button class="ann" type="primary" @click="set('ruleForm3')">修 改</el-button>
					</span>
				</el-dialog>

				<!-- 找回密码 -->
				<div class="sub-title">找回密码方式一：</div>
				<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="70px" class="demo-ruleForm2">
					<el-form-item label="手机号:" prop="phone2">
						<el-input id="phone2" ref="phone2" v-model="ruleForm2.phone2" placeholder="请输入手机号码" clearable></el-input>
					</el-form-item>
					<el-form-item id="code2" label="验证码:" prop="code2">
						<el-input class="code2" ref="code2" v-model="ruleForm2.code2" placeholder="验证码"></el-input>
						<input id="phone_btn" class="ann" type="button" v-model="count" @click="btnCheck2()">
					</el-form-item>
				</el-form>

				<div class="sub-title">找回密码方式二：</div>
				<el-button style="width: 126px; height: 40px;" type="info" @click="">自拍头像找回</el-button>
				<span slot="footer" class="dialog-footer">
					<el-button class="ann" @click="outerVisible_fp= false, close_fp()">取 消</el-button>
					<el-button class="ann" type="primary" @click="forget2('ruleForm2')">确 定</el-button>
				</span>
			</el-dialog>

			<el-button class="btn" type="info" plain @click="dialogVisible = true">
				<span>退出登录</span>
				<i class="el-icon-arrow-right"></i>
			</el-button>
			<el-dialog title="提示" :visible.sync="dialogVisible" width="60%" append-to-body>
				<span>退出登录</span>
				<span slot="footer" class="dialog-footer">
					<el-button class="ann" @click="dialogVisible = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="dialogVisible = false, modify_logout()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	// import forgotpassword from '../commons/forgotpassword.vue'
	export default {
		// components: {
		// 	forgotpassword
		// },
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm3.new_password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				outerVisible: false,
				dialogVisible: false,
				dialogFormVisible: false,
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
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
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
					phone2: [{
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
					code2: [{
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
						validator: validatePass,
						trigger: 'blur'
					}],
				},
				outerVisible_fp: false,
				innerVisible: false,
				timer: null,
				count: '获取',
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
				//提交
				this.$refs[form].validate((valid) => {
					if (valid) {
						console.log(this.$refs.new_username.value);
						this.dialogFormVisible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			
			//修改密码
			modify_password() {
				this.outerVisible_fp = true;
			},

			//退出登录
			modify_logout() {
				this.$router.replace('/login');
				localStorage.setItem("token", "");
			},


			// ================华丽的分割线====================
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//验证码按钮倒计时
			btnCheck1() {
				const TIME_COUNT = 60;
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
			},

			btnCheck2() {
				const TIME_COUNT = 60;
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
			},

			close_fp() {
				this.outerVisible_fp = false;
			},

			//忘记密码
			forget1(formName2) {
				//提交
				this.$refs[formName2].validate((valid) => {
					if (valid) {
						console.log(this.$refs.phone1.value);
						console.log(this.$refs.code1.value);
						this.outerVisible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			//忘记密码
			forget2(formName2) {
				//提交
				this.$refs[formName2].validate((valid) => {
					if (valid) {
						console.log(this.$refs.phone2.value);
						console.log(this.$refs.code2.value);
			
						//判断验证码是否正确 进入修改密码页
						this.innerVisible = true;
			
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},

			//修改密码
			set(formName3) {
				// 密码加密
				let sha256 = require("js-sha256").sha256;
				this.n_pw = sha256(this.$refs.new_password.value);

				//提交
				this.$refs[formName3].validate((valid) => {
					if (valid) {
						console.log(this.n_pw);
						this.$notify({
							title: '成功',
							message: '密码修改成功',
							type: 'success'
						});

						//密码修改成功后退出修改密码页 并提示修改密码完成
						this.innerVisible = false;
						this.outerVisible_fp = false;

					} else {
						console.log('error submit!!');
						return false;
					}
				})
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

	#modify {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 50px;
		left: 0;
		background: white;

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
			width: 100%;
			height: 100%;
			margin-top: 50px;

			.btn {
				width: 90%;
				height: 40px;
				position: relative;
				margin-bottom: 10px;

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

	#code1,
	#code2 {
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
