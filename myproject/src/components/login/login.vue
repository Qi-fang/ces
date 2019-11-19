<template>
	<div id="login">
		<div class="login">
			<header>用户登录</header>
			<router-link id="register" to="/register" style="font-size: 13px;">
				注册
			</router-link>
			<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="70px" class="demo-ruleForm1">
				<el-form-item label="用户名:" prop="username">
					<el-input class="username" ref="username" v-model="ruleForm1.username" placeholder="请输入账号" clearable></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input class="password" ref="password" v-model="ruleForm1.password" placeholder="请输入密码" clearable show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="resetForm('ruleForm1')">重置</el-button>
					<el-button type="primary" @click="submitForm('ruleForm1')">登录</el-button>
				</el-form-item>
			</el-form>
			<div>
				<!-- <el-link href="" type="primary">账号找回</el-link> -->
				<el-button class="forgot_password" type="text" @click="outerVisible = true">忘记密码</el-button>
				<el-button class="faceValid" type="text" @click="faceValid">头像登录</el-button>
				<el-dialog class="dialog1" title="找回密码" :visible.sync="outerVisible" width="85%">

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
					<el-button type="info" @click="fv">自拍头像找回</el-button>
					<span slot="footer" class="dialog-footer">
						<el-button @click="outerVisible = false">取 消</el-button>
						<el-button type="primary" @click="forget('ruleForm2')">确 定</el-button>
					</span>
				</el-dialog>
			</div>
		</div>
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
				outerVisible: false,
				innerVisible: false,
				count: '获取',
				timer: null,
				ruleForm1: {
					username: '',
					password: "",
				},
				ruleForm2: {
					phone: "",
					code: "",
				},
				ruleForm3: {
					new_password: '',
					confirm_password: ''
				},
				rules: {
					username: [{
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
					password: [{
							required: true,
							message: '请输入密码',
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
			//登录
			submitForm(formName) {
				// 密码加密
				let sha256 = require("js-sha256").sha256;
				this.pw = sha256(this.$refs.password.value);

				//提交
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let _username = this.$refs.username.value;
						let _passwd = this.pw;
						
						let url = this.$http + '/login';
						let _data = {
							username: _username,
							passwd: _passwd,
						};
						let data = this.$qs.stringify(_data);
						let config = {
						    headers: {
						        'Content-Type': 'application/x-www-form-urlencoded'
						    }
						}
						this.$axios.post(url, data, config).then((res) => {
							const _token = res.data.token;
							if(_token !== null){
								window.localStorage.setItem('token', _token);
								this.$router.replace('/recommend');
								this.$notify({
									title: '成功',
									message: '欢迎回来',
									type: 'success'
								});
							} else {
								console.log('error submit!!');
								this.$message({
									message: '登录失败，请重新登录',
									type: 'warning'
								});
								return false;
							}
						}).catch((err)=>{
							console.log("错误信息" + err);
						});
					}
				});
			},
			
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			//验证码按钮倒计时
			btnCheck() {
				const TIME_COUNT = 60;
				let url = this.$http + "/getSmsValidCode";
				let _tel = this.$refs.phone.value;
				this.$axios.get(url, {
					params:{tel: _tel}
				}).then((resp) => {
					let _code = Number(resp.data.code);
					if(_code !== -1){
						this.$notify({
							title: '提示',
							message: '信息发送成功',
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
					}else{
						this.$notify({
							title: '提示',
							message: '该手机号没有注册过',
							type: 'warning'
						});
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},
			
			//忘记密码
			forget(formName2){
				//提交
				this.$refs[formName2].validate((valid) => {
					if (valid) {
						let _tel = this.$refs.phone.value;
						let _code = this.$refs.code.value;
						let url = this.$http + "/smsValidCode";
						let _data = {
							tel: _tel,
							code: _code
						}
						let data = this.$qs.stringify(_data);
						let config = {
						    headers: {
						        'Content-Type': 'application/x-www-form-urlencoded'
						    }
						}
						this.$axios.post(url, data, config).then((resp1) => {
							let _code = Number(resp1.data.code);
							if(_code !== -1){
								//判断验证码是否正确 进入修改密码页
								this.innerVisible = true;
							}else{
								this.$notify({
									title: '提示',
									message: '输入信息有误',
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
			
			//修改密码
			set(formName3){
				// 密码加密
				let sha256 = require("js-sha256").sha256;
				this.n_pw = sha256(this.$refs.new_password.value);
				
				//提交
				this.$refs[formName3].validate((valid) => {
					if (valid) {
						let _newpasswd = this.n_pw;
						let _token = localStorage.getItem("token");
						let url = this.$http + "/changePasswd";
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
							console.log(response);
							let _code = Number(response.data.code);
							if(_code !== -1){
								this.$notify({
									title: '成功',
									message: '密码修改成功',
									type: 'success'
								});
								
								//密码修改成功后退出修改密码页 并提示修改密码完成
								this.innerVisible = false;
								this.outerVisible = false;
								this.$refs[formName3].resetFields();
							}else{
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
			
			//头像登录
			faceValid(){
				let that = this;
				//调用原生系统弹出按钮选择框
				let page = null;
				page={ 
					imgUp:function(){ 
						plus.nativeUI.actionSheet(
							{cancel:"取消",buttons:[ 
							{title:"拍照"}, 
							// {title:"从相册中选择"} 
						]}, function(e){
							//1 是拍照  2 从相册中选择 
							switch(e.index){ 
								case 1:
								getImage();
								break; 
								// case 2:
								// appendByGallery();
								// break; 
								default:
								break;    
							} 
						}); 
					} 
				}
				// 拍照函数
				function getImage(){
					let cmr = plus.camera.getCamera();
					cmr.captureImage(function(p){
						plus.io.resolveLocalFileSystemURL(p, function(entry){
							var path = entry.toLocalURL();
							//文件传转base64方法
							that.imgPreviewnew(path, _typedata);
						}, function(e){
							console.log("读取拍照文件错误："+e.message);
						});
					}, function(e){
						console.log("读取拍照文件错误："+e.message);
					}, {filename:'_doc/camera/',index:1});
				}
							
				//选择相片文件
				function appendByGallery(){
					plus.gallery.pick(function(path){
						//文件传转base64方法
						that.imgPreviewnew(path, _typedata);
					});
				}
				// 弹出系统选择按钮框  
				page.imgUp();
				
				
				let _file = 1;
				let _token = localStorage.getItem("token");
				let url = this.$http + "/faceValid";
				let _data = {
					file: _file,
					token: _token
				}
				let data = this.$qs.stringify(_data);
				let config = {
				    headers: {
				        'Content-Type': 'application/x-www-form-urlencoded'
				    }
				}
				this.$axios.post(url, data, config).then((res) => {
					let _code = Number(res.data.code);
					if(_code !== -1){
						this.$notify({
							title: '提示',
							message: '欢迎回来',
							type: 'success'
						});
						let newtoken = res;
						console.log(newtoken);
						// localStorage.setItem("token", newtoken);
						this.$router.replace('/recommend');
					}else{
						this.$notify({
							title: '提示',
							message: '登录失败，请重新登录',
							type: 'warning'
						});
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},
			
			fv(){
				let that = this;
				//调用原生系统弹出按钮选择框
				let page = null;
				page={ 
					imgUp:function(){ 
						plus.nativeUI.actionSheet(
							{cancel:"取消",buttons:[ 
							{title:"拍照"}, 
							// {title:"从相册中选择"} 
						]}, function(e){
							//1 是拍照  2 从相册中选择 
							switch(e.index){ 
								case 1:
								getImage();
								break; 
								// case 2:
								// appendByGallery();
								// break; 
								default:
								break;    
							} 
						}); 
					} 
				}
				// 拍照函数
				function getImage(){
					let cmr = plus.camera.getCamera();
					cmr.captureImage(function(p){
						plus.io.resolveLocalFileSystemURL(p, function(entry){
							var path = entry.toLocalURL();
							//文件传转base64方法
							that.imgPreviewnew(path, _typedata);
						}, function(e){
							console.log("读取拍照文件错误："+e.message);
						});
					}, function(e){
						console.log("读取拍照文件错误："+e.message);
					}, {filename:'_doc/camera/',index:1});
				}
							
				//选择相片文件
				function appendByGallery(){
					plus.gallery.pick(function(path){
						//文件传转base64方法
						that.imgPreviewnew(path, _typedata);
					});
				}
				// 弹出系统选择按钮框  
				page.imgUp();
			}
		},
	}
</script>

<style lang="scss" scoped>
	#login {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: white;
		
		.login {
			width: 90%;
			max-width: 500px;
			height: 260px;
			box-shadow: 0px 0px 8px 3px rgba(169, 169, 169, 0.3);
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			position: relative;

			a {
				color: limegreen;
				text-decoration: none;
				margin: 0 10px;
			}

			header {
				font-size: 25px;
				margin: 10px 0;
			}

			#register {
				position: absolute;
				top: 10px;
				right: 10px;
			}

			.username, .password {
				max-width: 300px;
				width: 95%;
			}

			.forgot_password {
				position: absolute;
				right: 2vw;
				bottom: 30px;
			}
			
			.faceValid{
				position: absolute;
				left: .6vw;
				bottom: 30px;
			}
			
			.sub-title {
				margin-bottom: 15px;
			}

			#code {
				position: relative;
			}

			#btn {
				position: absolute;
				right: 0;
				width: 70px;
				height: 40px;
				background: #909399;
				border: none;
				color: white;
				border-radius: 5px;
			}
			#btn:focus{
				outline: none;
			}
			#btn:active{
				background: #409EFF;
			}
		}
	}

	.dialog1, .dialog2 {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
