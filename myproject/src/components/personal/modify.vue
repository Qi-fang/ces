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
			<span>提现</span>
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
			
			// 提现
			txjl() {
				this.$router.replace('/personal/tixian');
			},
			
			// 兑换记录
			dhjl() {
				this.$router.replace('/personal/duihuan');
			},
			
			// 版本更新
			bbgx() {
				// this.$camera.getCamera(1).then(function (position) {
				//    alert("调用摄像头");
				// });
				// this.$gallery.pick((path) => {
				// 	console.log(path);
				// }).then((position) => {
				//    alert("调用相册");
				// });
				// this.$runtime.openWeb(url).then((position) => {
				//    alert("调用内置浏览器");
				// });
				let url = this.$http + "/getAppVer";
				this.$axios.get(url).then((resp) => {
					let _code = Number(resp.data.code);
					let res_token = resp.data.token;
					localStorage.setItem("token", res_token);
					if(_code !== -1){
						this.$notify({
							title: '成功',
							message: "已是最新版本",
							type: 'success'
						});
						return true;
					} else {
						console.log('error submit!!');
						this.$message({
							title: '提示',
							message: resp.data.message,
							type: 'warning'
						});
						return false;
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},
			
			// 退出登录
			modify_logout() {
				this.$router.replace('/login');
				// localStorage.setItem("token", "");
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
