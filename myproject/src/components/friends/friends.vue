<template>
	<div id="friends" class="animated fadeInLeft">
		<!-- 博客圈 -->
		<el-container v-if="bock" ref="scroll">
			<el-header>博客圈</el-header>
			<i class="el-icon-camera-solid el-icon--right boke" @click="show"></i>

			<ul class="list" v-for="fit1 in cityList1">
				<li id='list' v-for="fit in fit1">
					<!-- <div @click="myboke"> -->
					<el-avatar :size="50" :src="url"></el-avatar>
					<!-- </div> -->
					<p class='cname' style='overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>
						{{fit.publisher.nickname}}<br />
						<span style="color: #A9A9A9; font-size: 12px;">
							发布时间: {{fit.publishTime.slice(5, 10)}}日
							{{fit.publishTime.slice(11, 13)}}点
						</span>
					</p>
					<div class="friends">
						<p class='friends_title' style='width: 85%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>
							{{fit.title}}
						</p>
						<div class='friends_content' style='width: 95%; overflow: hidden; text-overflow: ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;'>
							{{fit.content}}
						</div>
					</div>
					<div id="friends_picture">
						<el-image class="friends_picture" 
						v-if="String(fit.imgs).indexOf('.jpg') > 0 ? true : false" :src="
						String(fit.imgs).indexOf(',') ? String(fit.imgs).slice(0, 56) : fit.imgs
						"></el-image>
						<el-image class="friends_picture" 
						v-if="String(fit.imgs).indexOf('.jpg', 60) > 0 ? true : false" :src="
						String(fit.imgs).indexOf(',') ? String(fit.imgs).slice(57, 113) : fit.imgs
						"></el-image>
						<el-image class="friends_picture"
						v-if="String(fit.imgs).indexOf('.jpg', 120) > 0 ? true : false" :src="
						String(fit.imgs).indexOf(',') ? String(fit.imgs).slice(114, 170) : fit.imgs
						"></el-image>
						<el-image class="friends_picture"
						 v-if="String(fit.imgs).indexOf('.jpg', 180) > 0 ? true : false" :src="
						String(fit.imgs).indexOf(',') ? String(fit.imgs).slice(171, 227) : fit.imgs
						"></el-image>
						<el-image class="friends_picture"
						 v-if="String(fit.imgs).indexOf('.jpg', 230) > 0 ? true : false" :src="
						String(fit.imgs).indexOf(',') ? String(fit.imgs).slice(228, 284) : fit.imgs
						"></el-image>
					</div>
					<div class='pldz'>
						<i class="el-icon-chat-line-round" @click="more($event)"> {{fit.commentsNumber}}<span style="color: white;">?{{fit.id}}</span></i>&nbsp;&nbsp;
						<i class="el-icon-thumb" @click="dianz($event)"> {{fit.likeNumber}} <span style="color: white;">?{{fit.id}}</span></i>
					</div>
				</li>
			</ul>
		</el-container>

		<div id="pl" v-if="unbock">
			<!-- 查看评论 -->
			<div id="block">
				<i class="el-icon-arrow-left returnf" @click="returnfriends">返回博客圈</i>
				<div v-for="fit1 in blogCommentsList">
					<div class="more_div" v-for="fit in fit1">
						<p class="more_pl">
							{{fit.publisher.nickname}} :
							<!-- <span class='pldz_more'>
								<i class="iconfont icon-Group-" @click="more_pl($event)">{{fit.commentsNumber}}</i>&nbsp;&nbsp;
								<i class="iconfont icon-dianzan" @click="dianz($event)">{{fit.likeNumber}} 赞</i>
							</span> -->
						</p>
						<p class="more_pl">
							{{fit.content}}
							<span style="color: #A9A9A9; font-size: 12px;">
								发布时间: {{fit.publishTime.slice(5, 10)}}日
								{{fit.publishTime.slice(11, 13)}}点
							</span>
						</p>
					</div>
				</div>

				<div id='pl_more'>
					<!-- 评论 -->
					<el-form class="demo-form-inline fpl" v-if="fpl">
						<el-input v-model="user" ref="user" placeholder="评论"></el-input>
						<el-button class="ann" type="primary" @click="onSubmit">发送</el-button>
					</el-form>
					<div class="pl_more">
						<i class="el-icon-chat-line-round" @click="more_pl($event)"></i>
						<i class="el-icon-thumb" @click="dianz1($event)"></i>
					</div>
				</div>
			</div>
		</div>
		<uploadboke v-if="ub"></uploadboke>
		<router-view />
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import uploadboke from '../commons/uploadboke.vue'
	export default {
		components: {
			uploadboke
		},
		inject: ['reload'],
		data() {
			return {
				cityList1: [],
				bock: true,
				unbock: false,
				ub: false,
				count: 10,
				loading: false,
				friends_dianz: [],
				more_message: false,
				user: '',
				text: '',
				fpl: false,
				blogCommentsList: [],
				url: "https://avatars3.githubusercontent.com/u/5277268?s=460&v=4",
			}
		},
		created() {
			let wt = plus.nativeUI.showWaiting();
			let _token = localStorage.getItem("token");
			let blogListurl = this.$http + "/blogList";
			this.$axios.get(blogListurl, {
				params: {
					token: _token,
					pageNumber: 1,
					pageSize: 20
				}
			}).then((res) => {
				plus.nativeUI.closeWaiting();
				this.cityList1.push(res.data.data.content);
			}).catch((e) => {
				console.log("错误信息" + e);
			})
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

			//点赞
			dianz(e) {
				let wt = plus.nativeUI.showWaiting();
				let postBlogLikeurl = this.$http + "/postBlogLike";
				let subid = e.target.innerText;
				let _blog_id = subid.substring(subid.lastIndexOf("?") + 1);
				let _token = localStorage.getItem("token");
				let _data = {
					blog_id: _blog_id,
					token: _token
				}
				let data = this.$qs.stringify(_data);
				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				this.$axios.post(postBlogLikeurl, data, config).then((resp) => {
					plus.nativeUI.closeWaiting();
					if (Number(resp.data.code) === -1) {
						this.$notify({
							title: '提示',
							message: resp.data.message,
							type: 'warning'
						});
					} else {
						this.reload();
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},
			//点赞1
			dianz1(e) {
				let wt = plus.nativeUI.showWaiting();
				let postBlogLikeurl = this.$http + "/postBlogLike";
				let _blog_id = sessionStorage.getItem("plid");
				let _token = localStorage.getItem("token");
				let _data = {
					blog_id: _blog_id,
					token: _token
				}
				let data = this.$qs.stringify(_data);
				let config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				this.$axios.post(postBlogLikeurl, data, config).then((resp) => {
					plus.nativeUI.closeWaiting();
					if (Number(resp.data.code) === -1) {
						this.$notify({
							title: '提示',
							message: resp.data.message,
							type: 'warning'
						});
					} else {
						this.reload();
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},

			// 更多评论
			more(e) {
				let wt = plus.nativeUI.showWaiting();
				let _token = localStorage.getItem("token");
				let subid = e.target.innerText;
				let _blogId = subid.substring(subid.lastIndexOf("?") + 1);
				let blogCommentsListurl = this.$http + "/blogCommentsList";
				this.$axios.get(blogCommentsListurl, {
					params: {
						token: _token,
						blogId: _blogId
					}
				}).then((res) => {
					plus.nativeUI.closeWaiting();
					let _code = Number(res.data.code);
					if (_code !== -1) {
						let pls = e.target.innerText;
						this.friends_more = Number(pls.substring(0, pls.lastIndexOf("?")));
						this.more_message = true;
						this.bock = false;
						this.unbock = true;
						let _plid = _blogId;
						sessionStorage.setItem("plid", _plid);
						this.blogCommentsList.push(res.data.data);
					} else {
						this.$notify({
							title: '提示',
							message: '获取评论异常',
							type: 'warning'
						});
					}
				}).catch((e) => {
					console.log("错误信息" + e);
				})
			},

			// 评论
			onSubmit() {
				let wt = plus.nativeUI.showWaiting();
				let _blog_id = sessionStorage.getItem("plid");
				let _content = this.user;
				let _token = localStorage.getItem("token");
				let url = this.$http + "/postBlogComments";
				let _data = {
					content: _content,
					blog_id: _blog_id,
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
					if (_code !== -1) {
						this.$notify({
							title: '提示',
							message: res.data.message,
							type: 'success'
						});
						this.fpl = false;
						this.user = "";
					} else {
						this.$notify({
							title: '提示',
							message: res.data.message,
							type: 'warning'
						});
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},

			more_pl(e) {
				this.fpl = !this.fpl;
			},

			//点击进入发布动态
			show() {
				this.bock = false;
				this.ub = true;
				// this.$router.replace('/friends/boke');
			},

			//点击查看动态
			myboke() {
				this.$router.replace('/personal/myboke');
			},
			returnfriends() {
				this.more_message = false;
				this.bock = true;
				this.unbock = false;
				this.reload();
			},

			//点击查看动态
			recordScrollPosition(e) {
				this.$store.dispatch("setHomeListTop", e.target.scrollTop); //实时存入到vuex中
			},
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

			.boke {
				position: absolute;
				float: right;
				right: 10px;
				top: 17.5px;
				color: white;
				font-size: 25px;
				z-index: 2;
			}

			#list {
				width: 100%;
				position: relative;
				margin-bottom: 20px;

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

					.friends_picture {
						margin: 10px 10px;
						width: 25vw;
						height: 25vw;
					}
				}

				.pldz {
					width: 90vw;
					display: flex;
					justify-content: flex-end;
					margin: 0 auto;
				}

				.pl {
					width: 90vw;
					height: 80px;
					overflow: hidden;
					margin: 0 auto;
					border: 1px solid Gainsboro;
					color: #999;
					margin-top: 10px;
					margin-bottom: 10px;
					position: relative;
					padding: 5px;

					.more {
						position: absolute;
						width: 100%;
						height: 20px;
						text-align: center;
						bottom: 0;
						color: #ff6700;
						background: white;
					}
				}
			}
		}

		#pl {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			left: 0;
			overflow-y: scroll;

			#block {
				position: absolute;
				width: 100%;
				min-height: 100%;
				background: white;
				z-index: 1000;
				display: flex;
				flex-direction: column;

				.returnf {
					background: #E4E4E4;
					width: 100%;
					height: 40px;
					color: white;
					line-height: 40px;
				}

				.more_div {
					width: 90vw;
					margin: 0 auto;
					margin-bottom: 35px;

					.more_pl {
						display: flex;
						justify-content: space-between;
						width: 100%;
					}
				}

				#pl_more {
					width: 100%;
					background: Gainsboro;
					position: fixed;
					bottom: 0;

					.fpl {
						background: white;
					}

					.pl_more {
						height: 35px;
						display: flex;
						justify-content: center;
						align-items: center;

						i {
							flex: 1;
							font-size: 20px;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	}

	.ann {
		width: 70px;
		height: 40px;
		position: absolute;
		right: 0;
	}
</style>
