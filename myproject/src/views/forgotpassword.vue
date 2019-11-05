<template>
	<div id="forgotpassword">
		<!-- <el-link href="" type="primary">账号找回</el-link> -->
		<el-dialog class="dialog1" title="找回密码" :visible.sync="outerVisible_fp" width="85%" append-to-body :close-on-click-modal="false" :show-close="false">
	
			<!-- 设置新密码 -->
			<el-dialog class="dialog2" width="85%" title="修改密码" :visible.sync="innerVisible" append-to-body>
				<el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="90px" class="demo-ruleForm3">
					<el-form-item label="新密码:" prop="new_password">
						<el-input id="new_password" ref="new_password" v-model="ruleForm3.new_password" placeholder="请输入新密码" clearable show-password></el-input>
					</el-form-item>
					<el-form-item label="确认密码:" prop="confirm_password">
						<el-input id="confirm_password" ref="confirm_password" v-model="ruleForm3.confirm_password" placeholder="请输入确认密码"
						 clearable show-password></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="warning" @click="resetForm('ruleForm3')">重 置</el-button>
					<el-button type="primary" @click="set('ruleForm3')">修 改</el-button>
				</span>
			</el-dialog>
	
			<!-- 找回密码 -->
			<div class="sub-title">找回密码方式一：</div>
			<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="70px" class="demo-ruleForm2">
				<el-form-item label="手机号:" prop="phone">
					<el-input id="phone" ref="phone" v-model="ruleForm2.phone" placeholder="请输入手机号码" clearable></el-input>
				</el-form-item>
				<el-form-item id="code" label="验证码:" prop="code">
					<el-input class="code" ref="code" v-model="ruleForm2.code" placeholder="验证码"></el-input>
					<input id="btn" type="button" v-model="count" @click="btnCheck()">
					<!-- <el-input type="button" id="btn" ref="btn" value="获取" @click.native="btnCheck()">{{count}}</el-input> -->
				</el-form-item>
			</el-form>
	
			<div class="sub-title">找回密码方式二：</div>
			<el-button type="info" @click="">自拍头像找回</el-button>
			<span slot="footer" class="dialog-footer">
				<el-button @click="outerVisible_fp= false, close_fp()">取 消</el-button>
				<el-button type="primary" @click="forget('ruleForm2')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
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
				outerVisible_fp: true,
				innerVisible: false,
				count: '获取',
				timer: null,
				ruleForm2: {
					phone: "",
					code: "",
				},
				ruleForm3: {
					new_password: '',
					confirm_password: ''
				},
				rules: {
					phone: [{
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
					code: [{
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
				}
			}
		},
		methods: {
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		
			//验证码按钮倒计时
			btnCheck() {
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
			
			close_fp(){
				this.fp = false;
			},
			
			//忘记密码
			forget(formName2){
				//提交
				this.$refs[formName2].validate((valid) => {
					if (valid) {
						console.log(this.$refs.phone.value);
						console.log(this.$refs.code.value);
						
						//判断验证码是否正确 进入修改密码页
						this.innerVisible = true;
						
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			
			//修改密码
			set(formName3){
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
						this.outerVisible_fp= false;
						
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
	ul, li {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.dialog1,
	.dialog2 {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
