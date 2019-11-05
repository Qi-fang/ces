<template>
	<div id="app" @click="xuanz($event, index)">
		<router-link index="1" ref="elMain1" to="/recommend" :class="{blue: i === index}">
			<i class="iconfont icon-yaoqinghaoyou"></i>推荐
		</router-link>
		<router-link index="2" ref="elMain2" to="/new">
			<i class="el-icon-present"></i>活动
		</router-link>
		<router-link index="3" ref="elMain3" to="/convert">
			<i class="iconfont icon-duihuan"></i>兑换
		</router-link>
		<router-link index="4" ref="elMain4" to="/friends">
			<i class="el-icon-chat-dot-square"></i>博客
		</router-link>
		<router-link index="5" ref="elMain5" to="/personal">
			<i class="el-icon-user"></i>我的
		</router-link>
		
		<router-view />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dat: [],
				i: 1,
				elMain1: {
					color: "#ff6700"
				},
			};
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					let token = dat[0].token;
					// console.log(token);
				}
			})
		},
		methods: {
			xuanz(e, index){
				
				this.i = index;
				
				let change_color = e.target;
				console.log(change_color);
				switch (parseInt(change_color)) {
					case 1:
						this.elMain1.color = "#ff6700";
						break;
					case 2:
						this.elMain1.color = "#ff6700";
						break;
					case 3:
						this.elMain1.color = "#ff6700";
						break;
					case 4:
						this.elMain1.color = "#ff6700";
						break;
					case 5:
						this.elMain1.color = "#ff6700";
						break;
					default:
						console.log(6);
						break;
				}
			}
		}
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
		.blue{
			color: #ff6700;
		}
	}
</style>
