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
				<span>头像认证<span v-if="dis">已完成</span></span>
				<i class="el-icon-arrow-right" v-if="!dis"></i>
				<i class="el-icon-check" v-if="dis"></i>
			</button>
			<el-dialog class="dialog" title="头像认证" :visible.sync="ov" width="85%" append-to-body>
				<el-button class="ann" @click="txdj">头像登记</el-button>
				<el-button class="ann" type="primary" @click="txrz">头像认证</el-button>
			</el-dialog>
			
			<!-- 实名认证 -->
			<button class="btn" type="info" plain @click="renzname = true" :disabled="disa" ref="cdisa" :style="cdisa">
				<span>真实姓名<span v-if="disa">已完成</span></span>
				<i class="el-icon-arrow-right" v-if="!disa"></i>
				<i class="el-icon-check" v-if="disa"></i>
			</button>
			<el-dialog title="实名认证" :visible.sync="renzname" width="85%" append-to-body>
				<el-form :model="nameform" :rules="rules" ref="nameform">
					<el-form-item class="new_name" label="真实姓名：" prop="name">
						<el-input class="new_name_input name" ref="name" v-model="nameform.name" autocomplete="off"
						 clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button class="ann" @click="renzname = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="renz_name('nameform')">提 交</el-button>
				</div>
			</el-dialog>
			
			<!-- 支付密码设置 -->
			<button class="btn" type="info" plain @click="renzpword = true" :disabled="cdisb" ref="cdis" :style="cdisb">
				<span>支付密码设置<span v-if="disb">已完成</span></span>
				<i class="el-icon-arrow-right" v-if="!disb"></i>
				<i class="el-icon-check" v-if="disb"></i>
			</button>
			<el-dialog title="支付密码设置" :visible.sync="renzpword" width="85%" append-to-body>
				<el-form :model="pwordform" :rules="rules" ref="pwordform">
					<el-form-item label="支付密码:" prop="pword">
						<el-input class="newnameinput" id="pword" ref="pword" v-model="pwordform.pword" placeholder="请输入支付密码"
						 clearable show-pword></el-input>
					</el-form-item>
					<el-form-item id="code" label="确认密码:" prop="confirm_pword">
						<el-input class="newnameinput" id="confirm_pword" ref="confirm_pword" v-model="pwordform.confirm_pword" placeholder="请输入确认密码"
						 clearable show-pword></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button class="ann" @click="renzpword = false">取 消</el-button>
					<el-button class="ann" type="primary" @click="renz_pword('pwordform')">提 交</el-button>
				</div>
			</el-dialog>
			
			<!-- 我的银行卡 -->
			<button class="btn" type="info" plain @click="mbcs">
				<span>我的银行卡</span>
				<i class="el-icon-arrow-right" v-if="!disc"></i>
				<i class="el-icon-check" v-if="disc"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.pwordform.pword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				count: '获取',
				ov: false,
				dis: false,
				disa: false,
				disb: false,
				disc: false,
				renzpword: false,
				renzname: false,
				cdis: {
					color: ""
				},
				cdisa: {
					color: ""
				},
				cdisb: {
					color: ""
				},
				pwordform: {
					pword: '',
					confirm_pword: '',
				},
				nameform: {
					name: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 5 个字符',
							trigger: 'blur'
						}
					],
					pword: [{
							required: true,
							message: '请输入支付密码',
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
					confirm_pword: [{
						required: true,
						validator: validatePass1,
						trigger: 'blur'
					}],
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
				let _realname = resp.data.data.realname;
				if(_realname){
					this.disa = true;
					this.cdisa.background = "#909399";
					localStorage.setItem("realname", _realname);
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
			
			// 设置支付密码
			renz_pword(pwordform){
				let wt = plus.nativeUI.showWaiting();
				//提交
				this.$refs[pwordform].validate((valid) => {
					if (valid) {
						let _newpasswd = this.$refs.pword.value;
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
									message: response.data.message,
									type: 'success'
								});
								this.$refs[pwordform].resetFields();
								this.renzpword = false;
							} else {
								this.$notify({
									title: '提示',
									message: response.data.message,
									type: 'warning'
								});
							}
						}).catch((error) => {
							console.log("错误信息" + error);
						})
					} else {
						plus.nativeUI.closeWaiting();
						console.log('error submit!!');
						return false;
					}
				})
			},
			
			// 实名认证
			renz_name(nameform){
				let wt = plus.nativeUI.showWaiting();
				//提交
				this.$refs[nameform].validate((valid) => {
					if (valid) {
						this.dialogFormVisible = false;
						this.$refs[nameform].resetFields();
						let url = this.$http + "/changeMyInfo"
						let _realname = this.$refs.name.value;
						let _nickname = localStorage.getItem("nickname");
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
									message: res.data.message,
									type: 'success'
								});
								this.renzname = false;
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
					} else {
						plus.nativeUI.closeWaiting();
						console.log('error submit!!');
						return false;
					}
				})
			},
			
			//我的银行卡
			mbcs() {
				this.$router.replace('/personal/mybankcards');
			}
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
	
	#code{
		position: relative;
		margin-top: 20px;
	}
	
	.new_name {
		margin-left: 30px;
	}
	
	.new_name_input {
		width: 120px;
	}
	
	.newnameinput {
		width: 160px;
	}
	
	.ann {
		width: 70px;
		height: 40px;
	}
</style>
