<template>
	<div id="new" class="animated fadeInLeft">
		<el-container>
			<el-header>活动通知区</el-header>
		</el-container>
		<el-link :underline="false">
			<div v-for="item1 in newList" :key="item1.ID">
				<div v-for="item_img in item1" :key="item_img.ID">
					<!-- 定义src元素、自定义content属性 -->
					<el-image style="width: 100vw; height: 150px; margin-bottom: 20px;" :src="item_img.img" :data-content="item_img.content" @click="centerDia($event)"></el-image>
				</div>
			</div>
		</el-link>
		<el-dialog title="活动详情" :visible.sync="centerDialogVisible" width="90%" center append-to-body>
			<el-image style="width: 100%; height: 100%" :src="cityList_e.src"></el-image>
			<div>{{cityList_c}}</div>
		</el-dialog>
		<div id="pagination">
			<el-pagination background layout="total, prev, pager, next" :page-size="10" :total="total" 
			@current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerDialogVisible: false,
				cityList_e: [],
				cityList_c: [],
				newList: [],
				total: 0,
				pageSize: 0,
				currentPage: 1, //起始页
			}
		},
		created() {
			this.getMessage();
		},
		methods: {
			centerDia(e) {
				//获取元素
				this.cityList_e = e.target;
				//获取自定义元素
				this.cityList_c = e.target.dataset.content;
				this.centerDialogVisible = true;
			},
			handleCurrentChange(val){
				this.currentPage = val;
				this.getMessage();
			},
			getMessage(){
				let wt = plus.nativeUI.showWaiting();
				let url = this.$http + "/activitionList";
				let _token = localStorage.getItem("token");
				this.$axios.get(url, {
					params: {token: _token, pageNumber: this.currentPage, pageSize: 10}
				}).then((resp) => {
					this.total = resp.data.data.totalElements;
					plus.nativeUI.closeWaiting();
					this.newList = [];
					this.newList.push(resp.data.data.content);
					let resp_token = resp.data.token;
					localStorage.setItem("token", resp_token);
				}).catch((err) => {
					console.log("错误信息" + err);
				})
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
		#pagination{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15px;
		}
	}
</style>
