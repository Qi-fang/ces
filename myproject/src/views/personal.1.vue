<template>
	<transition name="fade">
		<div id="personal">
			个人中心
			<button @click="clickMe">获取城市</button>
			<ul class="city_container">
				<li class="city_item" v-for="item in cityList" :key="item.id" @click="getCityInfo(item.city)">
					<a href="javascript:void(0)" :style="{color: item.color}">{{item.city}}</a>
				</li>
			</ul>
			<img :src="img" alt="">
			<!-- <el-button class="check_in" @click="sign_in" icon="el-icon-check" size="small">签到</el-button> -->
			<!-- <el-steps :active="active" finish-status="success">
				<el-step title="第1天"></el-step>
				<el-step title="第2天"></el-step>
				<el-step title="第3天"></el-step>
				<el-step title="第4天"></el-step>
				<el-step title="第5天"></el-step>
				<el-step title="第6天"></el-step>
				<el-step title="第7天"></el-step>
			</el-steps> -->
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				active: 0,
				cityList: [],
				img: ''
			}
		},
		methods: {
			sign_in() {
				// if (this.active++ > 6) this.active = 0;
				this.date = true;
				console.log(new Date());
				this.$notify({
					title: '成功',
					message: '签到成功',
					type: 'success'
				});
			},
			clickMe() {
				// 这里请求的地址要和mock中定义的请求地址一致
				this.$axios.get('http://localhost:8081/test/city').then(res => {
					console.log("get", res)
					if (res.data) {
						this.cityList = res.data.cityList
					}
				})
			},
// for(var i of imgs) {
// 	for(var n in i){
// 		console.log(i[n]);
// 	}
// }
			getCityInfo(name) {
				this.$axios.post('http://localhost:8081/test/cityInfo', {
					name: name
				}).then(res => {
					console.log("post", res)
					if (res.data) {
						this.img = res.data.img
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active{
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.fade-enter, .fade-leave-to{
		transform: translateX(300px);
		opacity: 0;
	}
	#personal{
		position: absolute;
		right: 0;
		top: 0;
		bottom: 50px;
		left: 0;
		background: lightseagreen;
	}
</style>
