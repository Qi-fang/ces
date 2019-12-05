<template>
	<div id="app">
		<router-link :data-index="1" ref="elMain1" :style="elMain1" to="/recommend">
			<div id="div">
				<i class="el-icon-user le"></i>
				<i class="el-icon-user cen"></i>
				<i class="el-icon-user ri"></i>
			</div>推荐
		</router-link>
		<router-link :data-index="2" ref="elMain2" :style="elMain2" to="/new">
			<i class="el-icon-present"></i>活动
		</router-link>
		<router-link :data-index="3" ref="elMain3" :style="elMain3" to="/convert">
			<i class="el-icon-money"></i>兑换
		</router-link>
		<router-link :data-index="4" ref="elMain4" :style="elMain4" to="/friends">
			<i class="el-icon-chat-dot-square"></i>博客
		</router-link>
		<router-link :data-index="5" ref="elMain5" :style="elMain5" to="/personal">
			<i class="el-icon-user"></i>我的
		</router-link>
		
		<router-view v-if="isShow" />
	</div>
</template>

<script>
	export default {
		provide () {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				dat: [],
				elMain1: {
					color: ""
				},
				elMain2: {
					color: ""
				},
				elMain3: {
					color: ""
				},
				elMain4: {
					color: ""
				},
				elMain5: {
					color: ""
				},
				isShow: true,
			};
		},
		methods: {
			reload () {
				this.isShow = false;
				this.$nextTick(function () {
					this.isShow = true;
				})
			}
		},
		watch:{
			'$route.path': function(newVal, oldVal){
				if(newVal === '/new'){
					this.elMain1.color = "";
					this.elMain2.color = "#ff6700";
					this.elMain3.color = "";
					this.elMain4.color = "";
					this.elMain5.color = "";
				}else if(newVal === '/convert'){
					this.elMain1.color = "";
					this.elMain2.color = "";
					this.elMain3.color = "#ff6700";
					this.elMain4.color = "";
					this.elMain5.color = "";
				}else if(newVal === '/friends' || newVal === '/personal/myboke' || newVal === '/friends/pl'){
					this.elMain1.color = "";
					this.elMain2.color = "";
					this.elMain3.color = "";
					this.elMain4.color = "#ff6700";
					this.elMain5.color = "";
				}else if(newVal === '/personal' || newVal === '/personal/category' || newVal === '/personal/mybankcards'
				 || newVal === '/personal/tixian' || newVal === '/personal/duihuan' || newVal === '/personal/renz'){
					this.elMain1.color = "";
					this.elMain2.color = "";
					this.elMain3.color = "";
					this.elMain4.color = "";
					this.elMain5.color = "#ff6700";
				}else{
					this.elMain1.color = "#ff6700";
					this.elMain2.color = "";
					this.elMain3.color = "";
					this.elMain4.color = "";
					this.elMain5.color = "";
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	#app {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		a {
			text-decoration: none;
			color: black;
			flex: 1;
			border-top: 1px solid #eee;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 50px;
		}

		.router-link {
			line-height: 50px;
			text-align: center;
		}
		#div{
			position: relative;
			.cen{
				position: absolute;
				left: 8px;
			}
		}
	}
</style>
