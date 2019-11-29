<template>
	<div id="renz">
		<div id="title">
			<div class="left" @click="gopersonal">
				<i class="el-icon-arrow-left fanhui"></i>
				<span class="myboke">返回</span>
			</div>
		</div>
		
		<div id="btn_modify">	
			<!-- 头像认证 -->
			<button class="btn" type="info" plain @click="faceReg" :disabled="dis" ref="cdis" :style="cdis">
				<span class="span">头像认证<span v-if="dis">已完成</span></span>
				<i class="el-icon-arrow-right"></i>
			</button>
			<el-dialog class="dialog" title="头像认证" :visible.sync="ov" width="85%" append-to-body>
				<el-button class="ann" @click="txdj">头像登记</el-button>
				<el-button class="ann" type="primary" @click="txrz">头像认证</el-button>
			</el-dialog>
			
			<!-- 更改手机号码 -->
			<button class="btn" type="info" plain @click="outerVisible = true" :disabled="disa" ref="cdisa" :style="cdisa">
				<span class="span">手机号码认证<span v-if="disa">已完成</span></span>
				<i class="el-icon-arrow-right"></i>
			</button>
			<el-dialog class="dialog1" title="手机号码认证" :visible.sync="outerVisible" width="85%" append-to-body>
				<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="70px" class="demo-ruleForm2">
					<el-form-item label="手机号:" prop="phone1">
						<el-input id="phone1" ref="phone1" v-model="ruleForm2.phone1" placeholder="请输入手机号码" clearable></el-input>
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
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				outerVisible: false,
				count: '获取',
				ov: false,
				dis: false,
				disa: false,
				rules: {
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
				ruleForm2: {
					phone1: "",
					code1: ""
				},
				cdis: {
					color: ""
				},
				cdisa: {
					color: ""
				},
			}
		},
		created() {
			let url = this.$http + "/getMyInfo";
			let _token = localStorage.getItem("token");
			this.$axios.get(url, {
				params:{token: _token}
			}).then((resp) => {
				let _validStatus = String(resp.data.data.validStatus);
				if(_validStatus.indexOf('tel') > -1){
					this.disa = true;
					this.cdisa.background = "#909399";
				}
				if(_validStatus.indexOf('face') > -1){
					this.dis = true;
					this.cdis.background = "#909399";
				}
			}).catch((err) => {
				console.log("错误信息" + err);
			})
		},
		methods: {
			gopersonal() {
				this.$router.replace('/personal');
			},
			
			// 进入头像认证
			faceReg(){
				this.ov = true;
			},
			
			// 头像登记
			txdj(){
				//调用原生系统弹出按钮选择框
				let page = null;
				page={ 
					imgUp:function(){ 
						plus.nativeUI.actionSheet(
							{cancel:"取消",buttons:[ 
							{title:"拍照"}, 
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
				
				//再对图片进行压缩为1920*1080，再上传到服务器  
				function resizeImage(src) {  
					let _dst = new Date().getTime();
					plus.zip.compressImage({  
						  src: src,
						  dst: '_doc/' + _dst + '.jpg',
						  overwrite: true,
						  width: '480px', //这里指定了宽度，同样可以修改  
						  height: '640px', //这里指定了高度
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
					let url = _this.$http + "/faceReg";
					let _token = localStorage.getItem("token");
					var task = plus.uploader.createUpload(url, {  
						method: 'post',   
						blocksize: 204800,  
						timeout: 10
					}, function(upload, status) {
						if (status == 200 ) {  
							let resp = upload.responseText.slice(8, 9);
						  if(resp == 0){
						  	alert("登记成功");
						  } else {
						  	alert("登记失败，请重新拍照上传");
						  }
						}
						plus.uploader.clear();  //清除上传  
					});  
					task.addFile(src, {key: 'file'});
					task.addData('token', _token);
					task.start();
				}
				// 弹出系统选择按钮框  
				page.imgUp();
			},
			
			// 头像认证
			txrz(){
				//调用原生系统弹出按钮选择框
				let page = null;
				page={ 
					imgUp:function(){ 
						plus.nativeUI.actionSheet(
							{cancel:"取消",buttons:[ 
							{title:"拍照"}, 
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
				
				//再对图片进行压缩为1920*1080，再上传到服务器  
				function resizeImage(src) {  
					let _dst = new Date().getTime();
					plus.zip.compressImage({  
						  src: src,
						  dst: '_doc/' + _dst + '.jpg',
						  overwrite: true,
						  width: '480px', //这里指定了宽度，同样可以修改  
						  height: '640px', //这里指定了高度
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
					let url1 = _this.$http + "/faceValid";
					let _account = localStorage.getItem("_account");
					var task1 = plus.uploader.createUpload(url1, {
						method: 'post',   
						blocksize: 204800,  
						timeout: 10
					}, function(upload, status) {
						if (status == 200 ) { 
							let resp = upload.responseText.slice(8, 9);
						  if(resp == 0){
							  alert("认证成功");
						  } else {
							  alert("验证失败，请重新拍照上传");
						  }
						}
						plus.uploader.clear();  //清除上传  
					}); 
					task1.addFile(src, {key: 'file'});
					task1.addData('account', _account);
					task1.start();
				}
				// 弹出系统选择按钮框  
				page.imgUp();
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
			
			// 更改手机号
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
								this.disa = true;
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
		},
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#renz {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;

		#title {
			width: 100%;
			height: 50px;
			background: DeepSkyBlue;
			z-index: 2;
			color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				margin: 0 0 0 10px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				i {
					float: left;
					left: 10px;
					font-size: 25px;
				}
			}

			.right {
				margin-right: 10px;
				color: #909399;
				font-size: 13px;
			}
		}
		
		#btn_modify {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			margin-top: 15px;
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
			
				.span {
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
			.dialog {
				height: 60px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
	#code1 {
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
	.ann {
		width: 70px;
		height: 40px;
	}
</style>
