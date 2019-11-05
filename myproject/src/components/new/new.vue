<template>
	<div id="new" class="animated fadeInLeft">
		<el-container>
			<el-header>活动通知区</el-header>
		</el-container>
		<!-- <div class="block" v-for="fit in fits" :key="fit">
			<span class="demonstration">{{ fit }}</span>
		</div> -->
		<el-link :underline="false">
			<div v-for="item_img in cityList5" :key="item_img.ID">
				<!-- 定义src元素、自定义content属性 -->
				<el-image style="width: 100vw; height: 150px; margin-bottom: 20px;" :src="item_img.img" :data-content="item_img.new_content" @click="centerDia($event)"></el-image>
			</div>
		</el-link>
		<el-dialog title="活动详情" :visible.sync="centerDialogVisible" width="90%" center append-to-body>
			<el-image style="width: 100%; height: 100%" :src="cityList_e.src"></el-image>
			<div>{{cityList_c}}</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerDialogVisible: false,
				cityList_e: [],
				cityList_c: [],
				cityList1: [],
				cityList5: [],
				fits: ['fill', 'contain', 'cover', 'none', 'scale-down']
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					// const arr = [];
					// let imgs = res.data.cityList.slice(0, 5);
					// for(let i = 0; i < 5; i++){
					// 	arr.push(imgs[i].img);
					// }
					// console.log(arr);
					let dat = res.data.cityList;
					this.cityList1 = dat.slice(0, 1);
					this.cityList5 = dat.slice(0, 5);
				}
			})
		},
		methods: {
			centerDia(e) {
				//获取元素
				this.cityList_e = e.target;
				//获取自定义元素
				this.cityList_c = e.target.dataset.content;
				this.centerDialogVisible = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#new {
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
	}
</style>
