<template>
	<div id="uploadboke" v-else>
		<el-form ref="ruleForm" label-width="70px" class="demo-ruleForm">
			<div id="title">
				<i class="el-icon-arrow-left" @click="gofriends"></i>
				<el-button type="primary" @click="submitForm" style="width: 70px; height: 40px;">发布</el-button>
			</div>
			<el-input ref="textarea" type="textarea" class="textarea_content" :rows="3" placeholder="这一刻的感想..." v-model="textarea">
			</el-input>
			<div id="upload">
				<el-upload action="#" list-type="picture-card" :limit="limit" :multiple="true" :auto-upload="false" :on-exceed="handleExceed"
				 :on-success="imgSuccess" :before-upload="beforeAvatarUpload" :on-change='changeUpload'>
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
		data() {
			return {
				cityList1: [],
				cityList20: [],
				limit: 5,
				
				textarea: '',
				dialogImageUrl: '',
				dialogVisible: false,
				disabled_boke: false,
				imageUrl: ''
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.cityList1 = dat.slice(4, 5);
					this.cityList20 = dat.slice(0, 20);
				}
			})
		},
		methods: {
			//点击回到博客圈
			gofriends() {
				this.$router.go('/friends');
			},
			//发布图片时校验
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
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
		
			changeUpload: function(file, fileList) {
				console.log(file);
			},
		
			//发布博客
			submitForm() {
				var boke_content = this.textarea;
				console.log(boke_content);
				if (boke_content.trim() !== "") {
					this.$notify({
						title: '成功',
						message: '发布成功',
						type: 'success',
					});
					this.textarea = "";
					this.bock = true;
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
			}
	
			#upload {
				width: 90%;
				margin: 0 auto;
				margin-top: 20px;
				padding: 10px;
				box-shadow: 0px 0px 8px 3px rgba(169, 169, 169, 0.3);
			}
		}
	}
</style>
