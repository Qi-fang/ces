<template>
	<div id="modify">
		<button class="btn" type="info" plain @click="myboke">
			<span>我的博客圈</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		
		<button class="btn" type="info" plain @click="grxx">
			<span>个人信息</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		
		<button class="btn" type="info" plain @click="txjl">
			<span>提现记录</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		<button class="btn" type="info" plain @click="dhjl">
			<span>兑换记录</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		<button class="btn" type="info" plain @click="bbgx">
			<span>版本更新</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		
		<button class="btn" type="info" plain @click="dialogVisible = true">
			<span>退出登录</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="60%" append-to-body>
			<span>退出登录</span>
			<span slot="footer" class="dialog-footer">
				<el-button class="ann" @click="dialogVisible = false">取 消</el-button>
				<el-button class="ann" type="primary" @click="dialogVisible = false, modify_logout()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				outerVisible: false,
				dialogVisible: false,
				dialogFormVisible: false,
				form: {
					new_username: '',
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				outerVisible_fp: false,
				innerVisible: false,
				timer: null,
				count: '获取',
				ruleForm2: {
					phone: "",
					code: "",
				},
				ruleForm3: {
					new_password: '',
					confirm_password: ''
				},
			}
		},
		methods: {
			myboke() {
				this.$router.replace('/personal/myboke');
			},
			grxx() {
				this.$router.replace('/personal/category');
			},
			txjl() {
				console.log("txjl");
			},
			dhjl() {
				console.log("dhjl");
			},
			bbgx() {
				console.log("bbgx");
			},
			//退出登录
			modify_logout() {
				this.$router.replace('/login');
				localStorage.setItem("token", "");
			},
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#modify {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		.btn {
			width: 90%;
			height: 40px;
			position: relative;
			margin-bottom: 10px;
			line-height: 10px;
			border: none;
			border-radius: 5px;
			// background: rgb(157, 218, 129);
			background: rgb(202, 235, 186);
			color: white;

			span {
				position: absolute;
				float: left;
				left: 10px;
				top: 15px;
			}

			i {
				position: absolute;
				float: right;
				right: 10px;
				top: 15px;
			}
		}
	}
	.ann {
		width: 70px;
		height: 40px;
	}
</style>
