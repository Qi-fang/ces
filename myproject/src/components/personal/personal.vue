<template>
	<div id="personal" class="animated fadeInLeft">
		<el-container>
			<el-header>个人中心</el-header>
		</el-container>
		<el-row class="demo-avatar demo-basic">
			<el-col :span="12">
				<div class="sub-title">头像</div>
				<el-upload class="avatar-uploader" action="http://182.61.161.239:27070/restApi/faceReg" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<div class="demo-basic--circle">
						<div class="block" v-for="item_background in cityList" :key="item_background.account">
							<el-avatar :size="50" :src="url"></el-avatar>
						</div>
					</div>
				</el-upload>
				<ul>
					<li v-for="item in cityList" :key="item.account">
						<div class="sub-title">{{item.account}}</div>
						<div class="sub-title">{{item.nickname}}</div>
					</li>
				</ul>
			</el-col>
		</el-row>

		<el-tag type="success" class="check_in" @click="sign_in"><i class="el-icon-check"></i> 签到</el-tag>
		<el-calendar id="date" v-model="value" v-if="date">
		  <template slot="dateCell" slot-scope="{date, data}">
		    <p :class="data.isSelected ? 'is-selected' : ''">
				{{ data.day.split('-').slice(2).join('-') }} 
				<div v-for="(fir, index) in isS" :key="index">
					{{ data.day.split('-').slice(2).join('-') == fir[0] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[1] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[2] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[3] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[4] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[5] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[6] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[7] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[8] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[9] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[10] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[11] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[12] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[13] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[14] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[15] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[16] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[17] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[18] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[19] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[20] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[21] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[22] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[23] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[24] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[25] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[26] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[27] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[28] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[29] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[30] ? '✔️' : ''}}
					{{ data.day.split('-').slice(2).join('-') == fir[31] ? '✔️' : ''}}
				</div>
		    </p>
		  </template>
		</el-calendar>
		<i class="el-icon-circle-close close" v-if="date" @click="close"></i>
		<el-footer>
			<input class="btn" type="button" v-model="count" />
			<i v-if="show" class="el-icon-view el-icon--right" @click="show_money"></i>
			<i v-else class="el-icon-minus" @click="hidden_money"></i>
		</el-footer>
		<modify></modify>
		<router-view></router-view>
	</div>
</template>

<script>
	import modify from '../personal/modify.vue'
	export default {
		components: {
			modify
		},
		inject:['reload'],
		data() {
			return {
				date: false,
				show: true,
				isS: [],
				active: 0,
				cityList: [],
				value: new Date(),
				imageUrl: '',
				input: '',
				count: '钱包余额',
				url: "https://avatars3.githubusercontent.com/u/5277268?s=460&v=4",
			}
		},
		created() {
			let url = this.$http + "/getMyInfo";
			let _token = localStorage.getItem("token");
			this.$axios.get(url, {
				params: {token: _token}
			}).then((res) => {
				this.cityList.push(res.data.data);
				let _realname = res.data.data.realname;
				sessionStorage.setItem("realname", _realname);
			}).catch((err) => {
				console.log("错误信息" + err);
			})
		},
		methods: {
			sign_in() {
				this.date = true;
				let url = this.$http + "/getMyCheckRecord";
				let postCheckInurl = this.$http + "/postCheckIn";
				let _token = localStorage.getItem("token");
				let now = new Date();
				let year = now.getFullYear();
				let month = now.getMonth() + 1;
				let _month = year + "-" + month;
				let _data = {
					token: _token
				}
				let data = this.$qs.stringify(_data);
				let config = {
				    headers: {
				        'Content-Type': 'application/x-www-form-urlencoded'
				    }
				}
				this.$axios.post(postCheckInurl, data, config).then((resp) => {
					let _code = Number(resp.data.code);
					let res_token = resp.data.token;
					localStorage.setItem("token", res_token);
					if(_code !== -1){
						this.$notify({
							title: '成功',
							message: '签到成功',
							type: 'success'
						});
					}else{
						this.$notify({
							title: '提示',
							message: '今日已签到',
							type: 'warning'
						});
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
				this.$axios.get(url, {
					params: {token: _token, month: _month}
				}).then((res) => {
					let _code = Number(res.data.code);
					if(_code !== -1){
						let getMyCheckRecord = res.data.data;
						let reg1 = /^\(/g;
						let reg2 = /\)$/g;
						let reg3 = /\)\(/g;
						let gmcr1 = getMyCheckRecord.replace(reg1, '');
						let gmcr2 = gmcr1.replace(reg2, '');
						let gmcr3 = gmcr2.replace(reg3, ',');
						
						var stringResult = gmcr3.split(',');
						this.isS.push(stringResult);
					}else{
						this.$notify({
							title: '提示',
							message: '查询失败',
							type: 'warning'
						});
					}
				}).catch((err) => {
					console.log("错误信息" + err);
				})
			},
			show_money() {
				this.show = false;
				let personal_money = this.cityList[0].moneyLast;
				this.count = personal_money;
			},
			hidden_money() {
				this.show = true;
				this.count = "钱包余额";
			},
			set_message() {
				this.$router.replace('/personal/modify');
			},
			close(){
				this.date = false;
				this.reload();
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt1M = file.size / 1024 / 1024 < 1;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt1M) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return isJPG && isLt1M;
			},
		}
	}
</script>

<style lang="scss" scoped>
	ul,
	li {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#personal {
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

		.check_in {
			position: absolute;
			top: 14px;
			right: 14px;
		}

		.el-row {
			display: flex;
			justify-content: center;
			align-items: center;

			.el-col {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		
		.is-selected {
			color: #1989FA;
		}
		.close{
			position: absolute;
			top: 640px;
			left: 47%;
			z-index: 2;
			font-size: 30px;
			color: #67C23A;
		}
		.el-footer {
			text-align: center;
			line-height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			.btn {
				width: 120px;
				height: 40px;
				background: #909399;
				border: none;
				color: white;
				border-radius: 5px;
				font-size: 14px;
			}
			.el-icon-minus{
				margin-left: 5px;
			}
		}
		#btn {
			width: 260px;
			margin: 10px auto;
		}

		#date {
			position: absolute;
			top: 0;
			left: 0;
			background: white;
			z-index: 2;
		}
	}
</style>
