<template>
	<div id="duihuan">
		<div id="title">
			<div class="left" @click="gopersonal">
				<i class="el-icon-arrow-left fanhui"></i>
				<span class="myboke">返回</span>
			</div>
			<div class="title">兑换记录</div>
			<div class="right" style="visibility: hidden;">提现</div>
		</div>
		<div v-for="fit1 in newList">
			<div class="bankcards" style="display: flex; justify-content: space-between;" v-for="fit in fit1">
				<span>{{fit.transDate}}:{{fit.bankname}}</span>
				<span>{{fit.transType == 0 ? "兑换 " : (fit.transType == 2 ? "推荐奖励 " : "签到奖励 ")}}: {{fit.transMoney}} 元</span>
			</div>
		</div>
		<div id="pagination">
			<el-pagination background layout="prev, pager, next" :page-size="8" :total="total" pager-count="3" 
			@current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	let _token = localStorage.getItem("token");
	export default {
		data() {
			return {
				newList: [],
				total: 0,
				tl: 0,
				t2: 0,
				t3: 0,
				currentPage: 1, //起始页
			}
		},
		created() {
			let wt = plus.nativeUI.showWaiting();
			this.getMessage();
		},
		methods: {
			gopersonal() {
				this.$router.replace('/personal');
			},
			handleCurrentChange(val){
				this.currentPage = val;
				this.newList = [];
				this.getMessage();
			},
			getMessage(){
				let url = this.$http + "/getMyMoneyTrans";
				for(let tt = 0; tt < 4; tt++){
					if(tt == 1){
						continue;
					}
					this.$axios.get(url, {
						params: {token: _token, transType: tt, pageNumber: this.currentPage, pageSize: 8}
					}).then((res) => {
						plus.nativeUI.closeWaiting();
						let _code = Number(res.data.code);
						let res_token = res.data.token;
						localStorage.setItem("token", res_token);
						if(_code !== -1){
							if(tt == 0){
								this.tl = res.data.data.totalElements
							}
							if(tt == 2){
								this.t2 = res.data.data.totalElements
							}
							if(tt == 3){
								this.t3 = res.data.data.totalElements
							}
							this.total = (this.tl + this.t2 + this.t3);
							this.newList.push(res.data.data.content);
							return true;
						} else {
							console.log('error submit!!');
							this.$message({
								title: '提示',
								message: res.data.message,
								type: 'warning'
							});
							return false;
						}
					}).catch((e) => {
						plus.nativeUI.closeWaiting();
						console.log("错误信息" + e);
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#duihuan {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;

		#title {
			width: 100%;
			height: 50px;
			background: DeepSkyBlue;
			z-index: 2;
			color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				margin: 0 0 0 10px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				i {
					float: left;
					left: 10px;
					font-size: 25px;
				}
			}

			.right {
				margin-right: 10px;
				color: #909399;
				font-size: 13px;
			}
		}

		.bankcards {
			width: 85%;
			height: 100px;
			background: linear-gradient(to right, #808080 0%, #DCDCDC 100%);
			margin: 20px auto;
			color: white;
		}
		#pagination{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15px;
		}
	}
</style>
