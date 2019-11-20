<template>
	<div id="convert" class="animated fadeInLeft">
		<el-container>
			<el-header>钱包余额转换区</el-header>
		</el-container>
		<el-link :underline="false" v-for="item1 in newList" :key="item1.ID">
			<el-link v-for="item in item1" :key="item.ID">
				<el-button class="convertbtn" type="primary" size="mini" style="margin-top: 10px;" @click="bindusername($event)">
					绑定网站账号
					<span style="display: none;">{{item.id}}</span>
				</el-button>
				<el-button class="convertbtn" type="primary" size="mini" @click="bindmoney">余额转入</el-button>
				<el-button class="convertbtn" type="primary" size="mini" @click="url($event)">
					进入网站
					<span style="display: none;">*{{item.url}}?</span>
				</el-button>
				<!-- <el-link class="item_url" type="primary" target="_blank" :href="item.url">进入网站</el-link> -->
				<el-image style="width: 100%; height: 150px" :src="item.img" @click="centerDia($event)"></el-image>
			</el-link>
		</el-link>

		<el-dialog title="活动详情" :visible.sync="centerDialogVisible" width="90%" center append-to-body>
			<el-image style="width: 100%; height: 100%" :src="cityList_e"></el-image>
			<div>{{convert_content}}</div>
			<span>兑换账号：</span>{{convert_account}}<br />
			<el-button class="convertbtn" type="primary" size="mini" style="margin-top: 5px;">下载App</el-button>
		</el-dialog>
		<el-dialog title="绑定账号" :visible.sync="buDialogVisible" width="90%" center append-to-body>
			<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="90px" class="demo-ruleForm1">
				<el-form-item label="绑定账号:" prop="website_username">
					<el-input id="website_username" ref="website_username" v-model="ruleForm1.website_username" placeholder="请输入要绑定的账号"
					 clearable></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="convertbind('ruleForm1')">绑 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="充值" :visible.sync="czDialogVisible" width="90%" center append-to-body>
			<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="90px" class="demo-ruleForm2">
				<div class="block" v-for="fit in cityList1">
					<div class="demonstration">账户余额: {{ convertm }} 元</div>
				</div>
				<el-form-item label="转入金额:" prop="recharge">
					<el-input id="recharge" ref="recharge" v-model="ruleForm2.recharge" placeholder="请输入转入金额" clearable></el-input>
				</el-form-item>
				<el-form-item label="交易密码:" prop="transaction">
					<el-input id="transaction" ref="transaction" v-model="ruleForm2.transaction" placeholder="请输入交易密码" clearable
					 show-password></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="converttransaction('ruleForm2', $event)">充 值</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerDialogVisible: false,
				buDialogVisible: false,
				czDialogVisible: false,
				txDialogVisible: false,
				cityList1: [],
				convert_account: "暂无",
				convert_content: "暂无",
				ruleForm1: {
					website_username: '',
				},
				ruleForm2: {
					recharge: '',
					txcharge: '',
					transaction: ''
				},
				rules: {
					website_username: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							pattern: /^[A-Za-z0-9]{6,15}$/,
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					],
					recharge: [{
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
				},
				cityList_e: [],
				newList: [],
				convertm: 0,
			}
		},
		created() {
			let wt = plus.nativeUI.showWaiting();
			let _token = localStorage.getItem("token");
			let url = this.$http + "/webSiteRecordList";
			let url1 = this.$http + "/getMyInfo";
			this.$axios.get(url, {
				params: {
					token: _token,
					pageNumber: 1,
					pageSize: 10
				}
			}).then((res) => {
				this.newList.push(res.data.data.content);
				let res_token = res.data.token;
				localStorage.setItem("token", res_token);
			}).catch((e) => {
				console.log("错误信息" + e);
			})
			this.$axios.get(url1, {
				params: {
					token: _token
				}
			}).then((res1) => {
				plus.nativeUI.closeWaiting();
				this.convertm = res1.data.data.moneyLast;
				let res1_token = res1.data.token;
				localStorage.setItem("token", res1_token);
				this.cityList1.push(res1.data.data);
				let m = res1.data.data.moneyLast;
				sessionStorage.setItem("m", m);
			}).catch((e) => {
				console.log("错误信息" + e);
			})
		},
		methods: {
			//查看兑换账号
			centerDia(e) {
				let wt = plus.nativeUI.showWaiting();
				this.cityList_e = e.target.src;
				this.centerDialogVisible = true;
				let _token = localStorage.getItem("token");
				let cscsid = Number(e.target.innerHTML.slice(64));
				sessionStorage.setItem("cscsid", cscsid);
				let _webSiteId = sessionStorage.getItem("cscsid");
				sessionStorage.setItem("cscsid", "");
				let url = this.$http + "/getTransAccount";
				let urlr = this.$http + "/webSiteRecordList";
				this.$axios.get(url, {
					params: {
						token: _token,
						webSiteId: _webSiteId
					}
				}).then((res) => {
					plus.nativeUI.closeWaiting();
					let res_token = res.data.token;
					localStorage.setItem("token", res_token);
					if (res.data.data.account) {
						this.convert_account = res.data.data.account;
					}
				}).catch((e) => {
					console.log("错误信息" + e);
				})
				this.$axios.get(urlr, {
					params: {
						token: _token,
						pageNumber: 1,
						pageSize: 10
					}
				}).then((res) => {
					this.newList.push(res.data.data.content);
					let res_token = res.data.token;
					localStorage.setItem("token", res_token);
					this.convert_content = res.data.data.content[cscsid].content;
				}).catch((e) => {
					console.log("错误信息" + e);
				})

			},

			bindusername(e) {
				let scsid = Number(e.target.innerHTML.slice(64, 65));
				sessionStorage.setItem("scsid", scsid);
				this.buDialogVisible = true;
			},
			bindmoney() {
				this.czDialogVisible = true;
			},

			//调用硬件的浏览器
			url(e) {
				let ui = e.target.innerHTML;
				let url_item = ui.slice(ui.indexOf("*") + 1, ui.indexOf("?"));
				console.log(url_item);
				//调用原生系统弹出按钮选择框
				let page = null;
				page = {
					imgUp: function() {
						plus.runtime.openURL(url_item);
					}
				}
				// 弹出系统选择按钮框
				page.imgUp();
			},

			//绑定账号
			convertbind(ruleForm1) {
				let wt = plus.nativeUI.showWaiting();
				//提交
				this.$refs[ruleForm1].validate((valid) => {
					if (valid) {
						let url = this.$http + "/bindTransAccount";
						let _account = this.$refs.website_username.value;
						let _webSiteRecord_id = sessionStorage.getItem("scsid");
						// sessionStorage.setItem("scsid", "");
						let _token = localStorage.getItem("token");
						let _data = {
							account: _account,
							webSiteRecord_id: _webSiteRecord_id,
							token: _token
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((resp) => {
							plus.nativeUI.closeWaiting();
							let _code = Number(resp.data.code);
							if (_code !== -1) {
								let resp_token = resp.data.token;
								localStorage.setItem("token", resp_token);
								this.$refs[ruleForm1].resetFields();
								this.$notify({
									title: '成功',
									message: resp.data.message,
									type: 'success',
								});
							} else {
								this.$notify({
									title: '提示',
									message: resp.data.message,
									type: 'warning'
								});
							}
						}).catch((err) => {
							console.log("错误信息" + err);
						})
					}
				});
			},

			//充值
			converttransaction(ruleForm2) {
				let wt = plus.nativeUI.showWaiting();
				// 密码加密
				let sha256 = require("js-sha256").sha256;
				this.pw = sha256(this.$refs.transaction.value);

				//提交
				this.$refs[ruleForm2].validate((valid) => {
					if (valid) {
						let url = this.$http + "/postTransRecord";
						let _moneyPasswd = this.pw;
						let _transMoney = this.ruleForm2.recharge;
						let _transType = 0;
						let _webSiteRecord_id = sessionStorage.getItem("scsid");
						let _token = localStorage.getItem("token");
						let _data = {
							moneyPasswd: _moneyPasswd,
							transMoney: _transMoney,
							transType: _transType,
							webSiteRecord_id: _webSiteRecord_id,
							token: _token
						}
						let data = this.$qs.stringify(_data);
						let config = {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}
						this.$axios.post(url, data, config).then((res) => {
							plus.nativeUI.closeWaiting();
							let _code = Number(res.data.code);
							if (_code !== -1) {
								this.$notify({
									title: '成功',
									message: res.data.message,
									type: 'success'
								});
								let ee = Number(this.ruleForm2.recharge);
								this.convertm = ee + this.convertm;
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

		.item_url {
			width: 80px;
			height: 28px;
			color: white;
			background: #409EFF;
			border-radius: 3px;
		}

		.convertbtn,
		.item_url {
			margin: 0 10px 0 0;
		}
	}

	.block {
		width: 150px;
		height: 50px;
		margin: 0 auto;
		font-size: 18px;
	}
</style>
