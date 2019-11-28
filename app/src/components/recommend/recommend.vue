<template>
	<div id="recommend" class="animated fadeInLeft">
		<el-container>
			<el-header>推荐好友专区</el-header>
			<div class="sub-title">
				<el-footer>
					<div>获取推荐链接</div>
				</el-footer>
				<el-form class="demo-ruleForm">
					<el-input id="c_url" class="c_url" :id="url_id" v-model="url_id" value=""></el-input>
					<el-button class="copy" type="primary" data-clipboard-target="#c_url" @click="copy" plain>复制</el-button>
				</el-form>
			</div>
			<div id="br"></div>
			<div class="sub-title">
				<el-footer>
					<div>获取推荐二维码</div>
				</el-footer>
				<el-image id="url_img" style="width: 50%; height: 50%;" :src="url_img"></el-image>
				<el-button type="primary" @click="preserve()" plain>保存</el-button>
			</div>
			<div id="br"></div>
			<el-footer>
				<div>我已获得的推荐佣金</div>
			</el-footer>
			<div id="table">
				<el-table :data="tableData1" border>
					<el-table-column prop="todaySum" label="当日佣金" width="79" align="center"></el-table-column>
					<el-table-column prop="weekSum" label="本周佣金" width="79" align="center"></el-table-column>
					<el-table-column prop="monthSum" label="本月佣金" width="79" align="center"></el-table-column>
					<el-table-column prop="allSum" label="全部佣金" width="79" align="center"></el-table-column>
				</el-table>
				<el-table :data="tableData" border>
					<el-table-column prop="childrenNumber" label="我的下级人数" width="79" align="center"></el-table-column>
				</el-table>
			</div>
			<div id="br"></div>
			<el-footer>
				<div>推荐佣金排行榜</div>
			</el-footer>
			<div style="display: flex;">
				<div class="rediv" @click="retl" :style="elMain1">当日</div>
				<div class="rediv" @click="rewl" :style="elMain2">本周</div>
				<div class="rediv" @click="reml" :style="elMain3">本月</div>
				<div class="rediv" @click="real" :style="elMain4">全部</div>
			</div>
			<el-table :data="tableData10[0].todayList" border stripe style="width: 100%" v-if="ret">
				<el-table-column type="index" label="排名" width="180"></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
				<el-table-column prop="totalmoney" label="收入金额" width="180"></el-table-column>
			</el-table>
			<el-table :data="tableData10[0].weekList" border stripe style="width: 100%" v-if="rew">
				<el-table-column type="index" label="排名" width="180"></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
				<el-table-column prop="totalmoney" label="收入金额" width="180"></el-table-column>
			</el-table>
			<el-table :data="tableData10[0].monthList" border stripe style="width: 100%" v-if="rem">
				<el-table-column type="index" label="排名" width="180"></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
				<el-table-column prop="totalmoney" label="收入金额" width="180"></el-table-column>
			</el-table>
			<el-table :data="tableData10[0].allList" border stripe style="width: 100%" v-if="rea">
				<el-table-column type="index" label="排名" width="180"></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
				<el-table-column prop="totalmoney" label="收入金额" width="180"></el-table-column>
			</el-table>
		</el-container>
	</div>
</template>

<script>
	import QRCode from 'qrcode';
	import Clipboard from 'clipboard';
	import VueQr from 'vue-qr'
	export default {
		components:{
		   VueQr
		},
		data() {
			return {
				activeIndex2: '5',
				url_img: '',
				tableData: [],
				tableData1: [],
				tableData10: [],
				url_id: "",
				ret: true,
				rew: false,
				rem: false,
				rea: false,
				elMain1: {
					color: "darkgoldenrod"
				},
				elMain2: {
					color: "white"
				},
				elMain3: {
					color: "white"
				},
				elMain4: {
					color: "white"
				}
			};
		},
		created() {
			let wt = plus.nativeUI.showWaiting();
			let url = this.$http + "/getMyInfo";
			let url1 = this.$http + "/getPersonStat";
			let url10 = this.$http + "/getTotalStat";
			let _token = localStorage.getItem("token");
			let urler = this.$http + "/getQrCode";
			this.$axios.get(urler, {
				params: {token: _token}
			}).then((res) => {
				plus.nativeUI.closeWaiting();
				this.url_img = res.data.data;
				let res_token = res.data.token;
				localStorage.setItem("token", res_token);
				let a = String(res.data.data);
				let urlid = a.substring(a.indexOf("uploadfiles/") + 12, a.indexOf(".png"));
				localStorage.setItem("_urlid", urlid);
			}).catch((err) => {
				console.log("错误信息" + err);
			})
			this.$axios.get(url1, {
				params:{token: _token}
			}).then((resp) => {
				this.tableData1.push(resp.data.data);
			}).catch((err) => {
				console.log("错误信息" + err);
			})
			this.$axios.get(url10, {
				params:{token: _token}
			}).then((resp10) => {
				this.tableData10.push(resp10.data.data);
			}).catch((err) => {
				console.log("错误信息" + err);
			})
			this.$axios.get(url, {
				params:{token: _token}
			}).then((resp) => {
				this.tableData.push(resp.data.data);
				this.url_id = "https://www.tuijianb.com/web/invitePage?code=" + localStorage.getItem("_urlid");
			}).catch((err) => {
				console.log("错误信息" + err);
			})
		},
		methods: {
			handleSelect(key, keyPath) {
				switch (parseInt(key)) {
					case 5:
						this.$refs.name2.prop = "todayList";
						break;
					case 6:
						this.$refs.name2.prop = "weekList";
						break;
					case 7:
						this.$refs.name2.prop = "monthList";
						break;
					case 8:
						this.$refs.name2.prop = "allList";
						break;
					default:
						console.log(5);
						break;
				}
			},

			//复制
			copy() {
				var clipboard = new Clipboard(".copy");
				clipboard.on('success', function(e) {
					e.clearSelection();
				});
				this.$notify({
					title: '成功',
					message: '推荐链接复制成功',
					type: 'success'
				});
				clipboard.on('error', function(e) {
					console.error('Action:', e.action);
					console.error('Trigger:', e.trigger);
				});
			},
			
			//保存
			preserve(){
				let a = document.createElement('a');
				let event = new MouseEvent('click');
				// 下载图名字
				a.download = '推荐二维码';
				//url 
				a.href = this.url_img;
				//合成函数，执行下载 
				// a.dispatchEvent(event);
				
				// 创建下载任务
				var dtask = plus.downloader.createDownload(this.url_img, {}, function (d, status) {
				// 下载完成
				if (status == 200) {
					plus.gallery.save(d.filename, function () {//保存到相册方法
						alert("下载完成");
					}, function () {
						alert("下载失败，请重新下载");
					});
					} else {
						alert("下载失败");
					}
				});
				dtask.start();
			},
			retl(){
				this.ret = true;
				this.rew = false;
				this.rem = false;
				this.rea = false;
				this.elMain1.color = "darkgoldenrod";
				this.elMain2.color = "white";
				this.elMain3.color = "white";
				this.elMain4.color = "white";
			},
			rewl(){
				this.ret = false;
				this.rew = true;
				this.rem = false;
				this.rea = false;
				this.elMain2.color = "darkgoldenrod";
				this.elMain1.color = "white";
				this.elMain3.color = "white";
				this.elMain4.color = "white";
			},
			reml(){
				this.ret = false;
				this.rew = false;
				this.rem = true;
				this.rea = false;
				this.elMain3.color = "darkgoldenrod";
				this.elMain1.color = "white";
				this.elMain2.color = "white";
				this.elMain4.color = "white";
			},
			real(){
				this.ret = false;
				this.rew = false;
				this.rem = false;
				this.rea = true;
				this.elMain4.color = "darkgoldenrod";
				this.elMain1.color = "white";
				this.elMain2.color = "white";
				this.elMain3.color = "white";
			},
		}
	}
</script>

<style lang="scss" scoped>
	#recommend {
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

		.sub-title {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.demo-ruleForm {
				position: relative;

				.c_url{
					width: 90%;
				}
				
				.copy {
					position: absolute;
				}
			}
		}

		#br {
			background: linear-gradient(to left, #67C23A, #409EFF, #E6A23C);
			height: 1px;
			margin-top: 20px;
		}

		.el-footer {
			text-align: center;
			line-height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;

			div {
				width: 160px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: darkgoldenrod;
				border-radius: 10px;
				color: white;
			}
		}
		#table{
			width: 317px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
		}
	}
	.rediv{
		flex: 1;
		background: #808080;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
