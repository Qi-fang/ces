<template>
	<div id="modify">
		<button class="btn" type="info" plain @click="grxx">
			<span>个人信息</span>
			<i class="el-icon-arrow-right"></i>
		</button>
		
		<button class="btn" type="info" plain @click="renz">
			<span>用户认证</span>
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
		
		<el-dialog title="升级APP" :visible.sync="buDialogVisible" width="90%" center append-to-body>
			<div>是否升级APP</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="ann" type="primary" @click="quxiao('ruleForm1')">取 消</el-button>
				<el-button class="ann" type="primary" @click="sji('ruleForm1')">升 级</el-button>
			</span>
		</el-dialog>
		
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
				buDialogVisible: false,
				timer: null,
				count: '获取',
				ruleForm1: {},
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
				// this.$router.replace('/personal/myboke');
				this.$router.replace('/friends');
			},
			grxx() {
				this.$router.replace('/personal/category');
			},
			
			// 认证
			renz(){
				this.$router.replace("/personal/renz");
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
				let url = this.$http + "/getAppVer";
				this.$axios.get(url).then((resp) => {
					let bb = resp.data.data.content;
					localStorage.setItem("bb", bb);
					getVersion();
				}).catch((err) => {
					console.log("错误信息" + err);
				})
				let _this = this;
				function getVersion(){
					// 获取apk/ipa版本号
					let kbb = plus.runtime.version;
					if(kbb !== localStorage.getItem("bb")){
						_this.buDialogVisible = true;
					} else {
						this.$notify({
							title: '成功',
							message: "已是最新版本",
							type: 'success'
						});
						return true;
					}
				}
			},
			
			// 确定升级
			sji(){
				this.buDialogVisible = false;
				let url = this.$http + "/getAppDownloadUrl";
				this.$axios.get(url).then((resp) => {
					let urlDownl = resp.data.data.content;
					// 调用浏览器打开下载页
					let page = null;
					page = {
						imgUp: function() {
							plus.runtime.openURL(urlDownl);
						}
					}
					// 弹出系统选择按钮框
					page.imgUp();
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},
			
			
			// 取消升级
			quxiao(){
				this.buDialogVisible = false;
			},
			
			// 退出登录
			modify_logout() {
				window.localStorage.clear();
				window.sessionStorage.clear();
				this.$router.replace('/login');
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
