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
				<el-button class="forgot_password" type="text" @click="outerVisible = true; ov()">忘记密码</el-button>
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
						<el-form-item label="用户名:" prop="username">
							<el-input class="username" ref="username" v-model="ruleForm2.username" placeholder="请输入账号" clearable></el-input>
						</el-form-item>
					</el-form>
					
					<div class="sub-title">找回密码方式二：</div>
					<el-button type="info" :disabled="disa" @click="tx" v-if="logdisa">头像找回</el-button>
					<el-button type="info" :disabled="!disa" v-if="!logdisa">未认证</el-button>
					
					<span slot="footer" class="dialog-footer">
						<el-button @click="outerVisible = false">取 消</el-button>
						<el-button type="primary" @click="forget('ruleForm2')">确 定</el-button>
					</span>
				</el-dialog>
			</div>
		</div>
		<template v-if="txzh">
			<div id="temp">
				<div class="temp">
					<div class="sub-title">头像认证找回密码<i class="el-icon-circle-close close" @click="close"></i></div>
					<el-form :model="ruleForm4" :rules="rules" ref="ruleForm4" label-width="70px" class="demo-ruleForm4">
						<el-form-item label="用户名:" prop="username">
							<el-input class="username" ref="username" v-model="ruleForm4.username" placeholder="请输入账号" clearable></el-input>
						</el-form-item>
					</el-form>
					<el-button class="ann" type="primary" @click="faceValid('ruleForm4')">头像认证</el-button>
				</div>
			</div>
		</template>
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
				txzh: false,
				count: '获取',
				timer: null,
				ruleForm1: {
					username: '',
					password: "",
				},
				ruleForm2: {
					username: '',
				},
				ruleForm4: {
					username: '',
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
					disa: false,
					logdisa: true,
				}
			}
		},
		methods: {
			//登录
			submitForm(formName) {
				let wt = plus.nativeUI.showWaiting();
				// 密码加密
				// let sha256 = require("js-sha256").sha256;
				// this.pw = sha256(this.$refs.password.value);
				
				//提交
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let _username = this.$refs.username.value;
						let _passwd = this.$refs.password.value;
						// let _passwd = this.pw;
						localStorage.setItem("_account", _username);
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
							plus.nativeUI.closeWaiting();
							let _code = Number(res.data.code);
							if(_code !== -1){
								this.$router.replace('/recommend');
								this.$notify({
									title: '成功',
									message: '欢迎回来',
									type: 'success'
								});
								let newtoken = res.data.token;
								localStorage.setItem("token", newtoken);
							} else {
								console.log('error submit!!');
								this.$message({
									title: '提示',
									message: res.data.message,
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

			//忘记密码
			forget(formName2){
				//提交
				this.$refs[formName2].validate((valid) => {
					if (valid) {
						let _account = this.$refs.username.value;
						let url = this.$http + "/getSmsValidCodeByAccount";
						let _data = {
							account: _account,
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
				let wt = plus.nativeUI.showWaiting();
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
							plus.nativeUI.closeWaiting();
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
			
			// 进入头像找回界面
			tx(){
				this.txzh = true;
				this.outerVisible = false;
			},
			
			close(){
				this.txzh = false;
				this.outerVisible = true;
			},
			
			ov(){
				let _v = localStorage.getItem("validStatus");
				if(_v('face') > -1){
					this.disa = true;
					this.logdisa = false;
				}
			},
			
			// 头像认证找回密码
			faceValid(formName4){
				this.$refs[formName4].validate((valid) => {
					if (valid) {
						//调用原生系统弹出按钮选择框
						let page = null;
						page={ 
							imgUp:function(){ 
								plus.nativeUI.actionSheet(
									{cancel:"取消",buttons:[ 
									{title:"拍照"}
								]}, function(e){
									//1 是拍照  2 从相册中选择 
									switch(e.index){ 
										case 1:
										getImage();
										break; 
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
									resizeImage(path);
								}, function(e){
									console.log("读取拍照文件错误："+e.message);
								});
							}, function(e){
								console.log("读取拍照文件错误："+e.message);
							}, {filename:'_doc/camera/',index:1});
						}
						
						//再对图片进行压缩为270*270，再上传到服务器  
						function resizeImage(src) {  
						  let _dst = new Date().getTime();
						  plus.zip.compressImage(  
							{  
							  src: src,
							  dst: '_doc/' + _dst + '.jpg',
							  overwrite: true,
							  width: '800px', //这里指定了宽度，同样可以修改  
							  width: '600px', //这里指定了高度
							  format: 'jpg',  
							  quality: 100  //图片质量不再修改，以免失真  
							},  
							function(e) {  
							  plus.nativeUI.closeWaiting();  
							  uploadImg(e.target);  //上传图片, e.target存的是本地路径！  
							},  
							function(err) {  
							  plus.nativeUI.alert('未知错误！',function() {  
								// mui.back();  
							  });  
							}  
						  );  
						}
						let _this = this;
						function uploadImg(src) {
							let url = _this.$http + "/faceValid";
							let _account = _this.$refs.username.value;
							let _data = {
								file: src,
								account: _account
							}
							let data = _this.$qs.stringify(_data);
							let config = {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							}
							_this.$axios.post(url, data, config).then((res) => {
								let _code = Number(res.data.code);
								if(_code !== -1){
									_this.$notify({
										title: '提示',
										message: '认证成功',
										type: 'success'
									});
									let newtoken = res.data.token;
									localStorage.setItem("token", newtoken);
									this.innerVisible = true;
								}else{
									_this.$notify({
										title: '提示',
										message: '认证失败，请重新认证',
										type: 'warning'
									});
								}
							}).catch((err) => {
								console.log("错误信息" + err);
							})
							
							function stateChanged(upload, status) {
								if (upload.state == 4 && upload.status == 200 ) {
									plus.uploader.clear();  //清除上传
								}
							}
						}
						// 弹出系统选择按钮框
						page.imgUp();
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
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
		#temp{
			position: absolute;
			background: white;
			width: 100vw;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 100;
			.temp{
				position: relative;
				width: 85%;
				height: 180px;
				box-shadow: 0px 0px 8px 3px rgba(169, 169, 169, 0.3);
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				.close{
					position: absolute;
					right: 10px;
					top: 10px;
					color: #ff6700;
				}
				.demo-ruleForm4{
					width: 85%;
				}
			}
		}
	}

	.dialog1, .dialog2 {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
