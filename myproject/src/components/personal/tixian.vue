<template>
	<div id="tixian">
		<div id="title">
			<div class="left" @click="gopersonal">
				<i class="el-icon-arrow-left fanhui"></i>
				<span class="myboke">返回</span>
			</div>
			<div class="title" v-if="!tx_hide">提现</div>
			<div class="title" v-if="tx_hide">提现记录</div>
			<div class="right" @click="getMyMoneyTrans" v-if="tx_show">提现记录</div>
			<div class="right" @click="getMyMoneyTrans" v-if="!tx_show">提现</div>
		</div>
		<div id="tx_center" v-if="tx_show">
			<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="90px" class="demo-ruleForm2">
				<div class="block" v-for="(fit, index) in cityList1" :key="index">
					<div class="demonstration">账户余额: {{ convertm }} 元</div>
				</div>
				<el-form-item label="提现金额:" prop="txcharge" style="margin: 20px 0;">
					<el-input id="txcharge" ref="txcharge" v-model="ruleForm2.txcharge" placeholder="请输入转入金额" clearable></el-input>
				</el-form-item>
				<el-form-item label="交易密码:" prop="transaction">
					<el-input id="transaction" ref="transaction" v-model="ruleForm2.transaction" placeholder="请输入交易密码" clearable
					 show-password></el-input>
				</el-form-item>
				<el-form-item label="银行卡号" prop="region" style="margin: 20px 0;">
					<el-select v-model="ruleForm2.region" placeholder="请选择银行卡号" v-for="(fitl, index) in list" :key="index" @change="label_value($event)">
						<el-option label="xxxx" :value="fitl1.id" ref="region" v-for="(fitl1, key) in fitl" :key="key">{{fitl1.bankno}}</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="ann" type="primary" @click="converttransaction('ruleForm2', $event)">提 现</el-button>
			</span>
		</div>
		<div v-for="(fit1, index) in newList" :key="index">
			<div class="bankcards" style="display: flex; justify-content: space-between;" v-for="fit in fit1" v-if="!tx_show">
				<span>{{fit.transDate}}:{{fit.bankname}}</span>
				<span>{{fit.transMoney}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				cityList1: [],
				list: [],
				newList: [],
				tx_show: true,
				tx_hide: false,
				convertm: 0,
				ruleForm2: {
					txcharge: '',
					transaction: '',
					state: "",
					region: ""
				},
				rules: {
					txcharge: [{
							required: true,
							message: '请输入充值金额',
							trigger: 'blur'
						},
						{
							pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
							message: '充值金额有误',
							trigger: 'blur'
						}
					],
					transaction: [{
							required: true,
							message: '请输入交易密码',
							trigger: 'blur'
						},
						{
							pattern: /^[0-9]{6}$/,
							message: '请输入6位数的交易密码',
							trigger: 'blur'
						}
					],
					region: [{
							required: true,
							message: '请输入银行卡号'
						},
						{
							pattern: /^[0-9]+$/,
							message: '请正确输入银行卡号',
							trigger: 'blur'
						}
					],
				},
			}
		},
		created() {
			let url = this.$http + "/getMyBankcards";
			let url1 = this.$http + "/getMyInfo";
			let _token = localStorage.getItem("token");
			this.$axios.get(url, {
				params: {
					token: _token
				}
			}).then((resp) => {
				// this.$store.commit('adduser', resp.data.data);
				// this.$store.commit("czhi", ee);
				// this.$refs[ruleForm2].resetFields();
				// 数组
				// let bcilength = resp.data.data;
				// sessionStorage.setItem("bcilength", JSON.stringify(bcilength));
				this.list.push(resp.data.data);
			}).catch((err) => {
				console.log("错误信息" + err);
			})
			this.$axios.get(url1, {
				params: {
					token: _token
				}
			}).then((res1) => {
				this.convertm = res1.data.data.moneyLast;
				this.cityList1.push(res1.data.data);
				let m = res1.data.data.moneyLast;
				sessionStorage.setItem("m", m);
			}).catch((e) => {
				console.log("错误信息" + e);
			})
		},
		methods: {
			gopersonal() {
				this.$router.replace('/personal');
			},

			//提现记录
			getMyMoneyTrans() {
				let wt = plus.nativeUI.showWaiting();
				this.tx_show = !this.tx_show;
				this.tx_hide = !this.tx_hide;
				let _token = localStorage.getItem("token");
				let _transType = 1;
				let url = this.$http + "/getMyMoneyTrans";
				this.$axios.get(url, {
					params: {
						token: _token,
						transType: _transType, pageNumber: 1, pageSize: 20
					}
				}).then(res => {
					plus.nativeUI.closeWaiting();
					if(Number(res.data.code !== -1)){
						let n = localStorage.getItem("n");
						let res_token = res.data.token;
						localStorage.setItem("token", res_token);
						if (n !== res.data.data.number) {
							let n = res.data.data.number;
							localStorage.setItem("n", n);
							this.newList.push(res.data.data.content);
						}
					} else {
						this.$notify({
							title: '提示',
							message: res.data.message,
							type: 'warning'
						});
					}
				}).catch((e) => {
					console.log("错误信息" + e);
				})
			},
			
			label_value(event){
				let label_value = event;
				localStorage.setItem("label_value", label_value);
				console.log(event);
			},
			
			//提现
			converttransaction(ruleForm2) {
				// 密码加密
				let sha256 = require("js-sha256").sha256;
				this.pw = sha256(this.$refs.transaction.value);

				//提交
				this.$refs[ruleForm2].validate((valid) => {
					if (valid) {
						let url = this.$http + "/postTransRecord";
						let _moneyPasswd = this.pw;
						let _transMoney = this.ruleForm2.recharge;
						let _transType = 1;
						let _bankCards_id = localStorage.getItem("label_value");
						let _token = localStorage.getItem("token");
						let _data = {
							moneyPasswd: _moneyPasswd,
							transMoney: _transMoney,
							transType: _transType,
							bankCards_id: _bankCards_id,
							token: _token
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((res) => {
							let _code = Number(res.data.code);
							let res_token = res.data.token;
							localStorage.setItem("token", res_token);
							if (_code !== -1) {
								this.$notify({
									title: '成功',
									message: res.data.message,
									type: 'success'
								});
								let ee = Number(this.ruleForm2.recharge);
								this.convertm = this.convertm - ee;
								// this.$store.commit("czhi", ee);
								// this.$refs[ruleForm2].resetFields();
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
						}).catch((err) => {
							console.log("错误信息" + err);
						})
					}
				});
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

	#tixian {
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

		#tx_center {
			position: absolute;
			width: 90%;
			height: 280px;
			background: white;
			box-shadow: 0px 0px 8px 3px rgba(169, 169, 169, 0.3);
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.demonstration {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 20px;
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

	.ann {
		width: 70px;
		height: 40px;
	}

	.my-autocomplete {
		li {
			line-height: normal;
			padding: 7px;

			.name {
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.addr {
				font-size: 12px;
				color: #b4b4b4;
			}

			.highlighted .addr {
				color: #ddd;
			}
		}
	}
</style>
