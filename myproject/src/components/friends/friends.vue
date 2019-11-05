<template>
	<div id="friends" class="animated fadeInLeft">
		<!-- 博客圈 -->
		<el-container v-if="bock" ref="scroll">
			<el-header>博客圈</el-header>
			<el-main>
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
					<div class='pldz'>
						<i class="iconfont icon-Group-" @click="more($event)"> {{item.friends_message}} </i>&nbsp;&nbsp;
						<!-- <i class="iconfont icon-dianzan" @click="dianz($event)"> {{item.friends_number}} 赞</i> -->
						<i class="iconfont icon-dianzan" @click="dianz($event)"> {{$store.state.dznb}} 赞</i>
					</div>
					<div class="pl">
						<p>{{item.ID}} : {{item.message_content}} </p>
						<p>{{item.ID}} : {{item.message_content}} </p>
						<p>{{item.ID}} : {{item.message_content}} </p>
						<div class="more" @click="more_pl($event)">
							查看更多评论
							<div id="ifm">{{item.friends_message}}</div>
						</div>
					</div>
				</li>
				<br />
			</ul>
			<p v-if="loading">加载中...</p>
			<p v-if="noMore">没有更多了</p>
		</el-container>

		<div id="pl" v-if="unbock">
			<!-- 查看评论 -->
			<div id="block" v-for="fit in cityList1">
				<i class="el-icon-arrow-left returnf" @click="returnfriends">返回博客圈</i>
				<div id="more_pl" v-for="index in message_number">
					<el-avatar class="more_plel" :size="50" :src="fit.background"></el-avatar>
					<div class="more_div">
						<p class="more_pl">
							{{fit.ID}} :
							<span class='pldz_more'>
								<i class="iconfont icon-Group-"></i>&nbsp;&nbsp;
								<i class="iconfont icon-dianzan" @click="dianz($event)">{{$store.state.dznb}}</i>
							</span>
						</p>
						{{fit.message_content}}
						<br />
						{{fit.date.slice(14)}}
					</div>
				</div>
				<div id='pl_more'>
					<div class="pl_more">
						<i class="iconfont icon-Group-" @click="more($event)"></i>
						<i class="iconfont icon-dianzan" @click="dianz($event)"></i>
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
		data() {
			return {
				cityList1: [],
				cityList20: [],
				bock: true,
				unbock: false,
				ub: false,
				count: 10,
				loading: false,
				friends_dianz: [],
				more_message: false,
				message_number: 0,
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

			// 点赞
			// dianz(e){
			// 	this.friends_dianz = e.target.innerText.slice(0, 3);
			// 	this.friends_dianz++;
			// },
			...mapMutations({
				dianz: "dianzan",
			}),
			// 更多评论
			more(e) {
				this.friends_more = e.target.innerText;
				this.more_message = true;
				this.bock = false;
				this.unbock = true;
				// this.$router.replace('/friends/pl');
				// if(this.friends_more > 10){
				// 	this.message_number = 10;
				// }else{
				// 	this.message_number = Number(this.friends_more);
				// }
				this.message_number = Number(this.friends_more);
			},
			
			more_pl(e) {
				this.fmp = e.target.innerText.slice(7);
				this.more_message = true;
				this.bock = false;
				this.unbock = true;
				this.message_number = Number(this.fmp);
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
			recordScrollPosition(e) {
				this.$store.dispatch("setHomeListTop", e.target.scrollTop); //实时存入到vuex中
			},

			//点击回到博客圈
			returnfriends() {
				this.more_message = false;
				this.bock = true;
				this.unbock = false;
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

				#more_pl {
					display: flex;
					justify-content: space-around;
					width: 98%;
					margin-bottom: 30px;

					.more_plel {
						width: 20vw;
					}

					.more_div {
						width: 75vw;

						.more_pl {
							display: flex;
							justify-content: space-between;
						}
					}
				}

				#pl_more {
					width: 100%;
					background: Gainsboro;
					position: fixed;
					bottom: 0;

					.pl_more {
						height: 30px;
						display: flex;
						justify-content: center;
						align-items: center;

						i {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	}
</style>
