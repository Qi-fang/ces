<template>
	<div id="mybankcards">
		<div id="title">
			<div class="left" @click="gopersonal">
				<i class="el-icon-arrow-left fanhui"></i>
				<span class="myboke">返回</span>
			</div>
			<div class="title">我的银行卡</div>
			<div class="right">
				<i class="el-icon-circle-plus-outline add" @click="add"></i>
				<!-- <i class="el-icon-delete del" @click="del"></i> -->
			</div>
		</div>
		<div v-for="fit1 in newList" v-if="!show_addBankcards" style="position: relative;">
			<div class="bankcards" style="display: flex; justify-content: space-between;" v-for="fit in fit1" :key="fit.id">
				<span>{{fit.bankname}}:{{fit.bankno}}</span>
				<span @click="handleRemove($event)">{{fit.name}}<div style="color: #DAA520;">?{{fit.id}}</div></span>
			</div>
		</div>
		<el-form id="mbc_from" ref="form" :model="form" :rules="rules" label-width="100px" v-if="show_addBankcards">
			<el-form-item label="姓名: " prop="name">
				<el-input v-model="form.name" ref="name" placeholder="请输入姓名" clearable></el-input>
			</el-form-item>
			<el-form-item label="银行卡号: " prop="bankno" style="margin: 20px 0;">
				<el-input v-model="form.bankno" ref="bankno" placeholder="请输入银行卡号" clearable></el-input>
			</el-form-item>
			<el-form-item label="开户行名称: " prop="bankname">
				<el-input v-model="form.bankname" ref="bankname" placeholder="请输入开户行名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
			    <el-button class="ann" type="primary" @click="onSubmit('form')">添 加</el-button>
			    <el-button class="ann" @click="close('form')">取 消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		inject:['reload'],
		data() {
			return {
				show_addBankcards: false,
				newList: [],
				form: {
					name: '',
					bankno: '',
					bankname: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入新的昵称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 2 到 5 个字符',
							trigger: 'blur'
						}
					],
					bankno: [{
							required: true,
							message: '请输入银行卡号',
							trigger: 'blur'
						},
						{
							pattern: /^[0-9]+$/,
							message: '请输入正确的银行卡号',
							trigger: 'blur'
						}
					],
				}
			}
		},
		created() {
			let wt = plus.nativeUI.showWaiting();
			let url = this.$http + "/getMyBankcards";
			let _token = localStorage.getItem("token");
			this.$axios.get(url, {
				params: {token: _token}
			}).then((resp) => {
				plus.nativeUI.closeWaiting();
				this.newList.push(resp.data.data);
			}).catch((err) => {
				console.log("错误信息" + err);
			})
		},
		methods: {
			gopersonal(){
				this.$router.replace('/personal/category');
			},
			add(){
				this.show_addBankcards = true;
			},
			
			//移除银行卡
			handleRemove(e) {
				let url = this.$http + "/deleteBankcards";
				let _token = localStorage.getItem("token");
				let subid = e.target.innerHTML;
				let _bankCardsId = subid.substring(subid.lastIndexOf("?") + 1);
				let _data = {
					token: _token,
					bankCardsId: _bankCardsId
				}
				let data = this.$qs.stringify(_data);
				let config = {
				    headers: {
				        'Content-Type': 'application/x-www-form-urlencoded'
				    }
				}
				this.$confirm('确定要移除这张银行卡吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.post(url, data, config).then((resp) => {
						let _code = Number(resp.data.code);
						let res_token = resp.data.token;
						localStorage.setItem("token", res_token);
						if (_code !== -1) {
							this.reload();
							this.$notify({
								title: '成功',
								message: '移除成功',
								type: 'success'
							});
						} else {
							this.$notify({
								title: '提示',
								message: '移除失败',
								type: 'warning'
							});
						}
					}).catch((err) => {
						console.log("错误信息" + err);
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			onSubmit(from) {
				let wt = plus.nativeUI.showWaiting();
				this.$refs[from].validate((valid) => {
					if (valid) {
						let url = this.$http + "/addBankcards";
						let _name = this.$refs.name.value;
						let _bankno = this.$refs.bankno.value;
						let _bankname = this.$refs.bankname.value;
						let _token = localStorage.getItem("token");
						let _data = {
							bankname: _bankname,
							bankno: _bankno,
							name: _name,
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
							let res_token = resp.data.token;
							localStorage.setItem("token", res_token);
							if (_code !== -1) {
								this.reload();
								this.$notify({
									title: '成功',
									message: '添加成功',
									type: 'success'
								});
								this.show_addBankcards = false;
							} else {
								this.$notify({
									title: '提示',
									message: '添加失败',
									type: 'warning'
								});
							}
						}).catch((err) => {
							console.log("错误信息" + err);
						})
					}
				})
			},
			
			//取消
			close(form){
				this.show_addBankcards = false;
				this.$refs[form].resetFields();
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	
	#mybankcards {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
	
		#title{
			width: 100%;
			height: 50px;
			background: DeepSkyBlue;
			z-index: 2;
			color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				margin-left: 10px;
				display: flex;
				justify-content: space-around;
				align-items: center;
		
				i {
					float: left;
					left: 10px;
					font-size: 20px;
				}
			}
			.right {
				display: flex;
				justify-content: space-around;
				align-items: center;
				float: right;
				right: 10px;
				font-size: 20px;
				i{
					margin-right: 10px;
				}
				.del{
					color: red;
				}
			}
		}
		.bankcards{
			width: 85%;
			height: 100px;
			background: linear-gradient(to right, #ff9569 0%, #DAA520 100%);
			margin: 20px auto;
			color: white;
		}
		#mbc_from{
			width: 90%;
			margin: 20px auto;
		}
	}
	.ann {
		width: 70px;
		height: 40px;
		margin-top: 20px;
	}
</style>
