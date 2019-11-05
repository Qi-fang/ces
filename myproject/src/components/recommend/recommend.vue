<template>
	<div id="recommend" class="animated fadeInLeft">
		<el-container>
			<el-header>推荐好友专区</el-header>
			<div class="sub-title">

				<!-- <el-divider content-position="center">获取推荐链接</el-divider> -->
				<el-footer>
					<div>获取推荐链接</div>
				</el-footer>
				<el-form class="demo-ruleForm">
					<el-input id="c_url" class="c_url" value="http://lsj.cx/"></el-input>
					<el-button class="copy" type="primary" data-clipboard-target="#c_url" @click="copy" plain>复制</el-button>
				</el-form>
			</div>
			<div id="br"></div>
			<div class="sub-title">
				<el-footer>
					<div>获取推荐二维码</div>
				</el-footer>
				<div id="qrcode">
					<canvas id="canvas" ref="canvas"></canvas>
				</div>
				<!-- <div>
					<vue-qr id="vueqr" ref="vueqr" :logoSrc="config.logo" :text="config.value" :size="120" :margin="0"></vue-qr>
				</div> -->
				<el-button type="primary" @click="preserve()" plain>保存</el-button>
			</div>
			<div id="br"></div>
			<div class="sub-title">
				<el-footer>
					<div>无限级推荐简介</div>
				</el-footer>
			</div>
			<div id="br"></div>
			<!-- <div class="sub-title">
				<el-footer>
					<div>查看我的下级人数</div>
				</el-footer>
			</div>
			<div id="br"></div>
			<el-footer>
				<div>我已获得的推荐佣金</div>
			</el-footer>
			<el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 background-color="#808080" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1">当日</el-menu-item>
				<el-menu-item index="2">本周</el-menu-item>
				<el-menu-item index="3">本月</el-menu-item>
				<el-menu-item index="4">全部</el-menu-item>
			</el-menu>
			<el-table :data="tableData10" border stripe style="width: 100%">
				<el-table-column prop="date" label="推荐时间" width="180">
				</el-table-column>
				<el-table-column prop="ID" label="推荐ID" width="180">
				</el-table-column>
				<el-table-column ref="name1" prop="d_money" label="推荐佣金" width="180">
				</el-table-column>
			</el-table> -->
			<el-footer>
				<div>我已获得的推荐佣金</div>
			</el-footer>
			<div id="table">
				<el-table class="table1" :data="tableData1" border>
					<el-table-column prop="friends_message" label="我的下级人数" width="105" align="center">
					</el-table-column>
					<el-table-column prop="d_money" label="当日佣金" width="105" align="center">
					</el-table-column>
					<el-table-column prop="w_money" label="本周佣金" width="105" align="center">
					</el-table-column>
				</el-table>
				<el-table class="table2" :data="tableData1" border>
					<el-table-column ref="name1" prop="m_money" label="本月佣金" width="105" align="center">
					</el-table-column>
					<el-table-column ref="name1" prop="all_money" label="全部佣金" width="105" align="center">
					</el-table-column>
				</el-table>
			</div>
			<div id="br"></div>
			<el-footer>
				<div>推荐佣金排行榜</div>
			</el-footer>
			<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 background-color="#808080" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="5">当日</el-menu-item>
				<el-menu-item index="6">本周</el-menu-item>
				<el-menu-item index="7">本月</el-menu-item>
				<el-menu-item index="8">全部</el-menu-item>
			</el-menu>
			<el-table :data="tableData2" border stripe style="width: 100%">
				<el-table-column prop="ranking" label="排名" width="180">
				</el-table-column>
				<el-table-column prop="ID" label="用户ID" width="180">
				</el-table-column>
				<el-table-column ref="name2" prop="d_total" label="总佣金" width="180">
				</el-table-column>
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
				activeIndex1: '1',
				activeIndex2: '5',
				url_img: '',
				tableData1: [],
				tableData10: [],
				tableData2: [],
				config: {
					value: 'http://lsj.cx/',
					logo:'https://avatars3.githubusercontent.com/u/5277268?s=460&v=4',
				},
			};
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.tableData1 = dat.slice(4, 5);
					this.tableData10 = dat.slice(0, 10);
					this.tableData2 = res.data.cityList;
				}
			})
		},
		mounted() {
			let url = 'http://lsj.cx/';
			this.useqrcode(url);
		},
		methods: {
			handleSelect(key, keyPath) {
				switch (parseInt(key)) {
					case 1:
						this.$refs.name1.prop = "d_money";
						break;
					case 2:
						this.$refs.name1.prop = "w_money";
						break;
					case 3:
						this.$refs.name1.prop = "m_money";
						break;
					case 4:
						this.$refs.name1.prop = "all_money";
						break;
					case 5:
						this.$refs.name2.prop = "d_total";
						break;
					case 6:
						this.$refs.name2.prop = "w_total";
						break;
					case 7:
						this.$refs.name2.prop = "m_total";
						break;
					case 8:
						this.$refs.name2.prop = "all_total";
						break;
					default:
						console.log(5);
						break;
				}
			},

			//生产二维码
			useqrcode(url) {
				var canvas = document.getElementById('canvas')
				QRCode.toCanvas(canvas, url, function(error) {
					if (error) console.error(error);
				})
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
				let url = canvas.toDataURL("image/png");
				let a = document.createElement('a');
				let event = new MouseEvent('click');
				// 下载图名字
				a.download = '推荐二维码';
				//url 
				a.href = url;
				//合成函数，执行下载 
				a.dispatchEvent(event);
				this.$notify({
					title: '成功',
					message: '推荐二维码保存成功',
					type: 'success'
				});
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
			width: 316px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
		}
	}
</style>
