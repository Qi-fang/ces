<template>
	<div id="convert" class="animated fadeInLeft">
		<el-container>
			<el-header>钱包余额转换区</el-header>
		</el-container>
		<!-- <div class="block" v-for="fit in fits" :key="fit">
			<span class="demonstration">{{ fit }}</span>
		</div> -->
		<el-link :underline="false" v-for="item in cityList5" :key="item.ID">
			<el-button type="primary" size="mini" style="margin-top: 10px;">绑定网站账号</el-button>
			<el-button type="primary" size="mini">余额转入</el-button>
			<el-image style="width: 100%; height: 100%" :src="item.image" @click="centerDia($event)"></el-image>
		</el-link>
		<el-dialog title="活动详情" :visible.sync="centerDialogVisible" width="90%" center append-to-body>
			<el-image style="width: 100%; height: 100%" :src="cityList_e"></el-image>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerDialogVisible: false,
				cityList_e: [],
				cityList5: [],
				fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.cityList5 = dat.slice(0, 5);
				}
			})
		},
		methods: {
			centerDia(e) {
				this.cityList_e = e.target.src;
				this.centerDialogVisible = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#convert {
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
