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
				<span>{{fit.transMoney}}</span>
			</div>
		</div>
		<div v-for="fit1 in newList2">
			<div class="bankcards" style="display: flex; justify-content: space-between;" v-for="fit in fit1">
				<span>{{fit.transDate}}:{{fit.bankname}}</span>
				<span>{{fit.transMoney}}</span>
			</div>
		</div>
		<div v-for="fit1 in newList3">
			<div class="bankcards" style="display: flex; justify-content: space-between;" v-for="fit in fit1">
				<span>{{fit.transDate}}:{{fit.bankname}}</span>
				<span>{{fit.transType == 0 ? "兑换 " : (fit.transType == 2 ? "推荐奖励 " : "签到奖励 ")}}:{{fit.transMoney}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				newList: [],
				newList2: [],
				newList3: [],
			}
		},
		created() {
			let _token = localStorage.getItem("token");
			let _transType = 0;
			let url = this.$http + "/getMyMoneyTrans";
			this.$axios.get(url, {
				params: {token: _token, transType: _transType, pageNumber: 1, pageSize: 20}
			}).then((res) => {
				let _code = Number(res.data.code);
				let res_token = res.data.token;
				localStorage.setItem("token", res_token);
				if(_code !== -1){
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
				console.log("错误信息" + e);
			})
			
			let _transType2 = 2;
			this.$axios.get(url, {
				params: {token: _token, transType: _transType2, pageNumber: 1, pageSize: 20}
			}).then((res) => {
				let _code = Number(res.data.code);
				if(_code !== -1){
					this.newList2.push(res.data.data.content);
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
				console.log("错误信息" + e);
			})
			
			let _transType3 = 3;
			this.$axios.get(url, {
				params: {token: _token, transType: _transType3, pageNumber: 1, pageSize: 20}
			}).then((res) => {
				let _code = Number(res.data.code);
				if(_code !== -1){
					this.newList3.push(res.data.data.content);
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
				console.log("错误信息" + e);
			})
		},
		methods: {
			gopersonal() {
				this.$router.replace('/personal');
			},
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
	}
</style>
