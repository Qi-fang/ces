<template>
	<div id="myboke">
		<el-main id="myboke_header" v-if="!ub">
			<div class="title" @click="gofriends">
				<i class="el-icon-arrow-left"></i>
				<span class="myboke">我的博客</span>
			</div>
			<div v-for="item_bg in cityList1" :key="item_bg.ID">
				<el-image :src="item_bg.bg"></el-image>
			</div>
			<el-row class="demo-avatar demo-basic">
				<ul>
					<li v-for="item in cityList1" :key="item.ID">
						<div class="myboke_cname">{{item.cname}}</div>
						<el-avatar :size="50" :src="item.background"></el-avatar>
					</li>
				</ul>
			</el-row>
		</el-main>
		<!-- 发布博客 -->
		<div id="myboke_content" v-if="!ub">
			<div id="live">
				<span class="date">&nbsp;今天&nbsp;</span>
				<div class="live">
					<i class="el-icon-camera-solid xji" @click="show"></i>
				</div>
			</div>
			<ul>
				<li id='list' v-for="item in cityList20" class="infinite-list-item">
					<div class="day">{{item.date.slice(5, 10)}}</div>
					<div id="friends_picture">
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
						<el-image class="friends_picture" :src="item.friends_picture"></el-image>
					</div>
					<div class="friends">
						<p class='friends_title' style='width: 85%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>
							{{item.friends_title}}
						</p>
						<div class='friends_content' style='width: 95%; overflow: hidden; text-overflow: ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;'>
							{{item.friends_content}}
						</div>
					</div>
				</li>
				<br />
			</ul>
		</div>
		<uploadboke v-if="ub"></uploadboke>
	</div>
</template>

<script>
	import uploadboke from '../commons/uploadboke.vue'
	export default {
		components: {uploadboke},
		data() {
			return {
				cityList1: [],
				cityList20: [],
				ub: false
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
			gofriends() {
				this.ub = "false";
				this.$router.replace('/friends');
			},
			show() {
				this.ub = true;
				// this.$router.replace('/friends/boke');
			},
			myboke() {
				this.$router.replace('/personal/myboke');
			},
		}
	}
</script>

<style lang="scss" scoped>
	ul, li, #myboke_header {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	
	#myboke {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		#myboke_header{
			background: white;
			position: relative;
			.title{
				position: absolute;
				margin: 10px 0 0 10px;
				z-index: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					float: left;
					left: 10px;
					color: white;
					font-size: 25px;
				}
				.myboke{
					color: white;
				}
			}
						
			.el-row {
				position: absolute;
				float: right;
				right: 0;
				bottom: 0;
				color: white;
				display: flex;
				justify-content: center;
				.myboke_cname {
					position: absolute;
					left: -30px;
				}
			}
		}
		
		#myboke_content{
			background: white;
			#live{
				display: flex;
				align-items: center;
				.date{
					font-size: 30px;
				}
				.live{
					width: 80px;
					height: 80px;
					background: #909399;
					display: flex;
					justify-content: center;
					align-items: center;
					.xji{
						color: white;
						font-size: 50px;
					}
				}
			}
			#list {
				display: flex;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;
				.day{
					width: 14%;
				}
				#friends_picture {
					width: 20%;
					height: 100px;
					overflow: hidden;
					
					.friends_picture {
						width: 50px;
						height: 50px;
					}
				}
				.friends {
					width: 62%;
				}
			}
		}
	}
</style>
