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
				fits: ['fill', 'contain', 'cover', 'none', 'scale-down']
			}
		},
		created() {
			let url = this.$http + "/activitionList";
			let _token = localStorage.getItem("token");
			this.$axios.get(url, {
				params: {token: _token, pageNumber: 1, pageSize: 10}
			}).then((resp) => {
				this.newList.push(resp.data.data.content);
				let resp_token = resp.data.token;
				localStorage.setItem("token", resp_token);
			}).catch((err) => {
				console.log("错误信息" + err);
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
