<template>
	<div id="convert" class="animated fadeInLeft">
		<el-container>
			<el-header>钱包余额转换区</el-header>
		</el-container>
		<!-- <div class="block" v-for="fit in fits" :key="fit">
			<span class="demonstration">{{ fit }}</span>
		</div> -->
		<el-link :underline="false" v-for="item in cityList5" :key="item.ID">
			<el-button class="convertbtn" type="primary" size="mini" style="margin-top: 10px;" @click="bindusername">绑定网站账号</el-button>
			<el-button class="convertbtn" type="primary" size="mini" @click="bindmoney">余额转入</el-button>
			<el-button class="convertbtn" type="primary" size="mini">进入网站</el-button>
			<el-button class="convertbtn" type="primary" size="mini" style="margin-top: 5px;">下载App</el-button>
			<el-image style="width: 100%; height: 150px" :src="item.image" @click="centerDia($event)"></el-image>
		</el-link>
		<el-dialog title="活动详情" :visible.sync="centerDialogVisible" width="90%" center append-to-body>
			<el-image style="width: 100%; height: 100%" :src="cityList_e"></el-image>
		</el-dialog>
		<el-dialog title="绑定账号" :visible.sync="buDialogVisible" width="90%" center append-to-body>
			<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="90px" class="demo-ruleForm1">
				<el-form-item label="绑定账号:" prop="website_username">
					<el-input id="website_username" ref="website_username" v-model="ruleForm1.website_username" placeholder="请输入要绑定的账号" clearable></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="convertbind('ruleForm1')">绑 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="充值" :visible.sync="bmDialogVisible" width="90%" center append-to-body>
			<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="90px" class="demo-ruleForm2">
				<div class="block" v-for="fit in cityList1">
					<!-- <div class="demonstration">账户余额: {{ fit.token }} 元</div> -->
					<div class="demonstration">账户余额: {{ $store.state.chongz }} 元</div>
				</div>
				<el-form-item label="转入金额:" prop="recharge">
					<el-input id="recharge" ref="recharge" v-model="ruleForm2.recharge" placeholder="请输入转入金额" clearable></el-input>
				</el-form-item>
				<el-form-item label="交易密码:" prop="transaction">
					<el-input id="transaction" ref="transaction" v-model="ruleForm2.transaction" placeholder="请输入交易密码" clearable show-password></el-input>
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
				bmDialogVisible: false,
				cityList1: "",
				ruleForm1: {
					website_username: '',
				},
				ruleForm2: {
					balance: '',
					recharge: '',
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
				cityList5: [],
				fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.cityList1 = dat.slice(4, 5);
					this.cityList5 = dat.slice(0, 5);
				}
			})
		},
		methods: {
			centerDia(e) {
				this.cityList_e = e.target.src;
				this.centerDialogVisible = true;
			},
			bindusername(){
				this.buDialogVisible = true;
			},
			bindmoney(){
				this.bmDialogVisible = true;
			},
			
			//绑定账号
			convertbind(ruleForm1){
				//提交
				this.$refs[ruleForm1].validate((valid) => {
					if (valid) {
						this.$notify({
							title: '成功',
							message: '绑定账号成功',
							type: 'success'
						});
						this.$refs[ruleForm1].resetFields();
					} else {
						console.log('error submit!!');
						this.$message({
							message: '绑定账号失败',
							type: 'warning'
						});
						return false;
					}
				});
			},
			
			//充值
			converttransaction(ruleForm2){
				// 密码加密
				let sha256 = require("js-sha256").sha256;
				this.pw = sha256(this.$refs.transaction.value);
				
				//提交
				this.$refs[ruleForm2].validate((valid) => {
					if (valid) {
						console.log(this.pw);
						this.$notify({
							title: '成功',
							message: '充值成功',
							type: 'success'
						});
						let ee = Number(this.ruleForm2.recharge);
						this.$store.commit("czhi", ee);
						this.$refs[ruleForm2].resetFields();
						return true;
					} else {
						console.log('error submit!!');
						this.$message({
							message: '充值失败',
							type: 'warning'
						});
						return false;
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
		.convertbtn{
			margin: 0 10px 0 0;
		}
	}
	.block{
		width: 150px;
		height: 50px;
		margin: 0 auto;
		font-size: 18px;
	}
</style>
