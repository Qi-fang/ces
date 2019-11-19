<template>
	<div id="uploadboke" v-else>
		<el-form :model="form" ref="ruleForm" label-width="70px" class="demo-ruleForm">
			<div id="title">
				<i class="el-icon-arrow-left" @click="gofriends"></i>
				<el-button type="primary" @click="submitForm" style="width: 70px; height: 40px;">发布</el-button>
			</div>
			<el-input ref="text" class="textarea_content" placeholder="标题" v-model="text"></el-input>
			<el-input ref="textarea" type="textarea" class="textarea_content" :rows="3" placeholder="这一刻的感想..." v-model="textarea">
			</el-input>
			<div id="upload">
				<el-upload ref="upload" action="http://182.61.161.239:27070/restApi/postBlog" list-type="picture-card" :auto-upload='false' :limit="limit" :multiple="true" :on-exceed="handleExceed"
				 :http-request="uploadFile" :file-list="fileList" :on-success="imgSuccess" :before-upload="beforeAvatarUpload" :on-change='changeUpload'>
					<i slot="default" class="el-icon-plus avatar-uploader-icon"></i>
					<div class="upload" slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<!-- 放大图片 -->
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<!-- 删除选中的图片 -->
							<span v-if="!disabled_boke" class="el-upload-list__item-delete" @click="handleRemove(file, $event)">
								<i class="el-icon-delete"></i>
							</span>
						</span>
					</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" width="90%" append-to-body>
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default {
		inject:['reload'],
		data() {
			return {
				limit: 5,
				text: '',
				textarea: '',
				dialogImageUrl: '',
				dialogVisible: false,
				disabled_boke: false,
				imageUrl: '',
				form: {
					file: [],
				},
				fileList: [],
			}
		},
		methods: {
			//点击回到博客圈
			gofriends() {
				this.$router.go('/friends');
			},
			//发布图片时校验
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				// const isLt1M = file.size / 1024 / 1024 < 1;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				// if (!isLt1M) {
				// 	this.$message.error('上传头像图片大小不能超过 1MB!');
				// }
				// return isJPG && isLt1M;
				return isJPG;
			},
			//最多发布5张图片
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 5 张照片`);
			},
			//放大图片
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
		
			//移除图片
			handleRemove(file, e) {
				let img_parentElement = document.getElementsByClassName("is-ready");
				let length = img_parentElement.length;
				for (let i = 0; i < length; i++) {
					let a = img_parentElement[i];
					a.index = i;
					a.onclick = function() {
						let index = this.index;
						window.localStorage.setItem('index', index);
					}
				}
				this.$confirm('确定要移除这张图片吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let indx = localStorage.getItem("index");
					let delete_upload_img = document.getElementsByClassName("is-ready")[indx];
					delete_upload_img.remove(file.name);
					this.limit++;
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			
			uploadFile(){
				this.formDate.append('files', this.form.file);
			},
			changeUpload(file, fileList) {
				switch (fileList.length) {
					case 1:
						this.form.file.push(fileList[0].raw);
						break;
					case 2:
						this.form.file.push(fileList[1].raw);
						break;
					case 3:
						this.form.file.push(fileList[2].raw);
						break;
					case 4:
						this.form.file.push(fileList[3].raw);
						break;
					case 5:
						this.form.file.push(fileList[4].raw);
						break;
					default:
						console.log(6);
						break;
				}
				let length = fileList.length
				localStorage.setItem("length", length);
			},
			
			//发布博客
			submitForm() {
				let formdata = new FormData();
				let _title = this.$refs.text.value;
				let _content = this.textarea;
				let _token = localStorage.getItem("token");
				let postBlogurl = this.$http + "/postBlog";
				let config = {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
				formdata.append("title", _title);
				formdata.append("content", _content);
				formdata.append("token", _token);
				
				for(var j = 0; j < localStorage.getItem("length"); j++){
					formdata.append('files', this.form.file[j]);
				}
				// formdata.append("files", this.form.file);
				if (_content.trim() !== "") {
					// this.$refs.upload.submit();
					this.$axios.post(postBlogurl, formdata, config)
					.then((res) => {
						let _code = Number(res.data.code);
						let res_token = res.data.token;
						localStorage.setItem("token", res_token);
						if(_code !== -1){
							this.$notify({
								title: '成功',
								message: '发布成功',
								type: 'success',
							});
							this.text = "";
							this.textarea = "";
							this.bock = true;
							this.reload();
							// this.$router.replace('/friends');
						}else{
							this.$notify({
								title: '提示',
								message: '发布失败',
								type: 'warning'
							});
						}
					}).catch((err) => {
						console.log("错误信息" + err);
					})
				} else {
					this.$notify({
						title: '警告',
						message: '请输入想要发布的内容',
						type: 'warning'
					});
				}
			},
			
			// 这里可以获得上传成功的相关信息
			imgSuccess(res, file, fileList) {
				this.imageUrl = URL.createObjectURL(file.raw);
				console.log(res);
				console.log(file);
				console.log(fileList);
			}
		},
	}
</script>
<style lang="scss" scoped>
	ul, li {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#uploadboke {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 3;
		background: white;
		
		.demo-ruleForm {
			display: flex;
			flex-direction: column;
	
			#title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 5px;
			}
	
			.textarea_content {
				width: 90%;
				margin: 0 auto;
				margin-top: 15px;
			}
	
		}
	}
	#upload {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
		padding: 10px;
		box-shadow: 0px 0px 8px 3px rgba(169, 169, 169, 0.3);
	}
</style>
