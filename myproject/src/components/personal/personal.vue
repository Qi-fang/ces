<template>
	<div id="personal" class="animated fadeInLeft">
		<el-container>
			<el-header>个人中心</el-header>
		</el-container>
		<el-row class="demo-avatar demo-basic">
			<el-col :span="12">
				<!-- <el-upload class="avatar-uploader" action="#" :show-file-list="false" @click="changeheadImg"> -->
					<div class="demo-basic--circle" @click="changeheadImg">
						<div class="block" v-for="item_background in personalList" :key="item_background.account">
							<el-avatar :size="50" :src="url" v-if="url"></el-avatar>
							<img src="../../assets/logo.png" style="width: 80px; height: 80px; border-radius: 50px;" v-if="!url" />
						</div>
					</div>
				<!-- </el-upload> -->
				<ul>
					<li style="display: flex; flex-direction: column; justify-content: center; align-items: center;" v-for="item in personalList" :key="item.account">
						<div class="sub-title">{{item.account}}</div>
						<div class="sub-title">{{item.nickname}}</div>
					</li>
				</ul>
			</el-col>
		</el-row>

		<el-tag type="success" class="check_in" @click="sign_in"><i class="el-icon-check"></i> 签到</el-tag>
		<el-calendar id="date" v-model="value" v-if="date">
		  <template slot="dateCell" slot-scope="{date, data}">
		    <p :class="data.isSelected ? 'is-selected' : ''">
				{{ data.day.split('-').slice(2).join('-') }} 
				<div v-for="(fir, index) in isS" :key="index">
					{{ data.day.split('-').slice(2).join('-') == fir[0] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[1] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[2] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[3] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[4] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[5] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[6] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[7] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[8] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[9] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[10] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[11] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[12] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[13] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[14] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[15] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[16] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[17] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[18] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[19] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[20] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[21] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[22] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[23] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[24] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[25] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[26] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[27] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[28] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[29] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[30] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[31] ? '✔️' : ''}}
				</div>
		    </p>
		  </template>
		</el-calendar>
		<i class="el-icon-circle-close close" v-if="date" @click="close"></i>
		<el-footer>
			<input class="btn" type="button" v-model="count" />
			<i v-if="show" class="el-icon-view el-icon--right" @click="show_money"></i>
			<i v-else class="el-icon-minus" @click="hidden_money"></i>
		</el-footer>
		<modify></modify>
		<router-view></router-view>
	</div>
</template>

<script>
	import modify from '../personal/modify.vue'
	let _token = localStorage.getItem("token");
	export default {
		components: {
			modify
		},
		inject:['reload'],
		data() {
			return {
				date: false,
				show: true,
				isS: [],
				active: 0,
				personalList: [],
				value: new Date(),
				imageUrl: '',
				input: '',
				count: '钱包余额',
				url: "../../assets/logo.png",
			}
		},
		created() {
			let wt = plus.nativeUI.showWaiting();
			let url = this.$http + "/getMyInfo";
			this.$axios.get(url, {
				params: {token: _token}
			}).then((res) => {
				plus.nativeUI.closeWaiting();
				this.personalList.push(res.data.data);
				let _v = res.data.data.validStatus;
				let nickname = res.data.data.nickname;
				let real_name = res.data.data.realname;
				let head_url = res.data.data.headImg;
				localStorage.setItem("nickname", nickname);
				localStorage.setItem("realname", real_name);
				localStorage.setItem("headurl", head_url);
				localStorage.setItem("validStatus", _v);
				if(res.data.data.headImg != "null"){
					this.url = res.data.data.headImg;
				} else {
					return this.url = "../../assets/logo.png";
				}
			}).catch((err) => {
				console.log("错误信息" + err);
			})
		},
		methods: {
			sign_in() {
				let _validStatus = localStorage.getItem("validStatus");
				if(String(_validStatus).indexOf('tel') > -1 || String(_validStatus).indexOf('face') > -1){
					let wt = plus.nativeUI.showWaiting();
					this.date = true;
					let url = this.$http + "/getMyCheckRecord";
					let postCheckInurl = this.$http + "/postCheckIn";
					let now = new Date();
					let year = now.getFullYear();
					let month = now.getMonth() + 1;
					let _month = year + "-" + month;
					let _data = {
						token: _token
					}
					let data = this.$qs.stringify(_data);
					let config = {
					    headers: {
					        'Content-Type': 'application/x-www-form-urlencoded'
					    }
					}
					this.$axios.post(postCheckInurl, data, config).then((resp) => {
						plus.nativeUI.closeWaiting();
						let _code = Number(resp.data.code);
						let res_token = resp.data.token;
						localStorage.setItem("token", res_token);
						if(_code !== -1){
							this.$notify({
								title: '成功',
								message: '签到成功',
								type: 'success'
							});
						}else{
							this.$notify({
								title: '提示',
								message: '今日已签到',
								type: 'warning'
							});
						}
					}).catch((err) => {
						console.log("错误信息" + err);
					})
					this.$axios.get(url, {
						params: {token: _token, month: _month}
					}).then((res) => {
						let _code = Number(res.data.code);
						if(_code !== -1){
							let getMyCheckRecord = res.data.data;
							let reg1 = /^\(/g;
							let reg2 = /\)$/g;
							let reg3 = /\)\(/g;
							let gmcr1 = getMyCheckRecord.replace(reg1, '');
							let gmcr2 = gmcr1.replace(reg2, '');
							let gmcr3 = gmcr2.replace(reg3, ',');
							
							var stringResult = gmcr3.split(',');
							this.isS.push(stringResult);
						}else{
							this.$notify({
								title: '提示',
								message: '查询失败',
								type: 'warning'
							});
						}
					}).catch((err) => {
						console.log("错误信息" + err);
					})
				}else{
					this.$notify({
						title: '提示',
						message: '请先进行认证',
						type: 'warning'
					});
				}
			},
			show_money() {
				this.show = false;
				let personal_money = this.personalList[0].moneyLast;
				this.count = personal_money;
			},
			hidden_money() {
				this.show = true;
				this.count = "钱包余额";
			},
			set_message() {
				this.$router.replace('/personal/modify');
			},
			close(){
				this.date = false;
				this.reload();
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				return isJPG;
			},
			
			// 更换头像
			changeheadImg(){
				//调用原生系统弹出按钮选择框
				let page = null;
				page={ 
					imgUp:function(){ 
						plus.nativeUI.actionSheet(
							{cancel:"取消",buttons:[ 
							{title:"拍照"},
							{title:"从相册中选择"} 
						]}, function(e){
							//1 是拍照  2 从相册中选择 
							switch(e.index){ 
								case 1:
								getImage();
								break;
								case 2:
								appendByGallery();
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
				
				//选择相片文件
				function appendByGallery(){
					plus.gallery.pick(function(path){
						plus.io.resolveLocalFileSystemURL(path, function(entry) {
							var p = entry.toLocalURL();
							resizeImage(p);
						}, function(e) {
							plus.nativeUI.toast("读取拍照文件错误：" + e.message);
						});
					});
				}
				
				//再对图片进行压缩为300*300，再上传到服务器  
				function resizeImage(src) {  
				  let _dst = new Date().getTime();
				  plus.zip.compressImage(  
					{  
					  src: src,
					  dst: '_doc/' + _dst + '.jpg',
					  overwrite: true,
					  width: '300px', //这里指定了宽度，同样可以修改  
					  height: '300px', //这里指定了高度
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
					let url = _this.$http + "/changeMyInfo";
					let _nickname = localStorage.getItem("nickname");
					let _realname = localStorage.getItem("realname");
					var task = plus.uploader.createUpload(url, {
						method: 'post',   
						blocksize: 204800,  
						timeout: 10
					}, function(upload, status) {
						if (status == 200 ) {  
							let resp = upload.responseText.slice(8, 9);
						  if(resp == 0){
						  	alert("上传成功");
						  } else {
						  	alert("上传失败，请重新拍照上传");
						  }
						}
						plus.uploader.clear();  //清除上传  
					});
					task.addFile(src, {key: 'file'});
					task.addData('token', _token);
					task.addData('nickname', _nickname);
					task.addData('realname', _realname);
					task.start();
				}
				// 弹出系统选择按钮框
				page.imgUp();
			}
		}
	}
</script>

<style lang="scss" scoped>
	ul,
	li {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#personal {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 50px;
		left: 0;
		overflow-y: scroll;

		.el-header {
			background-color: DeepSkyBlue;
			color: white;
			text-align: center;
			line-height: 60px;
		}

		.check_in {
			position: absolute;
			top: 14px;
			right: 14px;
		}

		.el-row {
			display: flex;
			justify-content: center;
			align-items: center;

			.el-col {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		
		.is-selected {
			color: #1989FA;
		}
		.close{
			position: absolute;
			top: 640px;
			left: 47%;
			z-index: 2;
			font-size: 30px;
			color: #67C23A;
		}
		.el-footer {
			text-align: center;
			line-height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			.btn {
				width: 120px;
				height: 40px;
				background: #909399;
				border: none;
				color: white;
				border-radius: 5px;
				font-size: 14px;
			}
			.el-icon-minus{
				margin-left: 5px;
			}
		}
		#btn {
			width: 260px;
			margin: 10px auto;
		}

		#date {
			position: absolute;
			top: 0;
			left: 0;
			background: white;
			z-index: 2;
		}
	}
</style>
