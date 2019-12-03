<template>
	<div id="friends" class="animated fadeInLeft">
		<el-container v-if="bock" ref="scroll">
			<el-header>博客圈</el-header>
			<el-main>
				<!-- 发布博客 -->
				<i class="el-icon-camera-solid el-icon--right" @click="show"></i>

				<div v-for="item_bg in cityList1" :key="item_bg.ID">
					<el-image :src="item_bg.bg"></el-image>
				</div>
				<el-row class="demo-avatar demo-basic">
					<ul>
						<li v-for="item in cityList1" :key="item.ID">
							<div class="sub-title">{{item.cname}}</div>
						</li>
					</ul>
					<div class="demo-basic--circle">
						<div class="block" v-for="item_background in cityList1" :key="item_background.ID" @click="myboke">
							<el-avatar :size="50" :src="item_background.background"></el-avatar>
						</div>
					</div>
				</el-row>
			</el-main>
			<ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
				<li id='list' v-for="item in filteredItems" class="infinite-list-item">
					<div class="demo-basic--circle">
						<div class="block" v-for="item_background in cityList1" :key="item_background.ID" @click="myboke">
							<el-avatar :size="50" :src="item.background"></el-avatar>
						</div>
					</div>
					<p class='cname' style='overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>
						{{item.cname}}<br />
						{{item.date.slice(14)}}
					</p>
					<div class="friends">
						<p class='friends_title' style='width: 85%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>
							{{item.friends_title}}
						</p>
						<div class='friends_content' style='width: 95%; overflow: hidden; text-overflow: ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;'>
							{{item.friends_content}}
						</div>
					</div>
					<div id="friends_picture">
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" style="visibility: hidden;" :src="item.friends_picture"></el-image>
					</div>
				</li>
				<br />
			</ul>
			<p v-if="loading">加载中...</p>
			<p v-if="noMore">没有更多了</p>
		</el-container>

		<div id="boke" v-else>
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

		<!-- <router-view /> -->
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				cityList1: [],
				cityList20: [],
				bock: true,
				count: 10,
				loading: false,
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
		computed: {
			...mapGetters([
				"home_list_top" //vuex中的存放的滚动条的位置
			]),
			noMore() {
				return this.count >= 20;
			},
			disabled() {
				return this.loading || this.noMore;
			},
			filteredItems() {
				return this.cityList20.slice(0, this.count);
			}
		},
		methods: {
			// 上拉加载更多
			load() {
				this.loading = true
				setTimeout(() => {
					this.count += 5;
					this.loading = false
				}, 2000)
			},

			//点击进入发布动态
			show() {
				this.bock = false;
				// this.$router.replace('/friends/boke');
			},
			//点击查看动态
			myboke() {
				this.$router.replace('/personal/myboke');
			},
			recordScrollPosition(e) {
				this.$store.dispatch("setHomeListTop", e.target.scrollTop); //实时存入到vuex中
			},
			//点击回到博客圈
			gofriends() {
				this.bock = true;
				// this.$router.replace('/friends');
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
				// this.fileList = fileList;
				// this.$nextTick(
				// 	() => {
				// 		let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children;
				// 		for (let i = 0; i < upload_list_li.length; i++) {
				// 			let li_a = upload_list_li[i];
				// 			let imgElement = document.createElement("img");
				// 			imgElement.setAttribute('src', fileList[i].url);
				// 			imgElement.setAttribute('style', "width: 50px; height: 50px");
				// 			if (li_a.lastElementChild.nodeName !== 'IMG') {
				// 				li_a.appendChild(imgElement);
				// 			}
				// 		}
				// 	});
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
		//this.$refs.scroll拿到滚动的dom，即scrollContainer，this.home_list_top是存入到vuex里的值
		activated() {
			let that = this;
			this.$refs.scroll.scrollTop = this.home_list_top;
			this.$refs.scroll.addEventListener("scroll", that.recordScrollPosition); //添加绑定事件
		},
		//keep-alive 的页面跳转时，移除scroll事件
		deactivated() {
			let that = this;
			this.$refs.scroll.removeEventListener("scroll", that.recordScrollPosition); //清除绑定的scroll事件
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#friends {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 50px;
		left: 0;
		overflow-y: scroll;

		.el-container {
			.el-header {
				background-color: DeepSkyBlue;
				color: white;
				text-align: center;
				line-height: 60px;
			}

			.el-main {
				position: relative;

				i {
					position: absolute;
					float: right;
					right: 10px;
					top: 10px;
					color: white;
					font-size: 25px;
					z-index: 2;
				}

				.el-row {
					position: absolute;
					float: right;
					right: 0;
					bottom: 0;
					color: white;
					display: flex;
					justify-content: center;
				}
			}

			#list {
				width: 100%;
				position: relative;

				.cname {
					position: absolute;
					left: 60px;
					top: 0;
				}

				.friends {
					margin: 0 5%;
				}

				#friends_picture {
					width: 90%;
					margin: 0 auto;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.friends_picture {
						margin: 5px 0;
					}
				}
			}
		}

		#boke {
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
	}
</style>
