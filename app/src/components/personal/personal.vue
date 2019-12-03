<template>
	<div id="personal" class="animated fadeInLeft">
		<el-container>
			<el-header>个人中心</el-header>
		</el-container>
		<el-row class="demo-avatar demo-basic">
			<el-col :span="12">
				<div class="sub-title">头像</div>
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<div class="demo-basic--circle">
						<div class="block" v-for="item_background in cityList" :key="item_background.ID">
							<el-avatar :size="50" :src="item_background.background"></el-avatar>
						</div>
					</div>
				</el-upload>
				<ul>
					<li v-for="item in cityList" :key="item.ID">
						<div class="sub-title">{{item.ID}}</div>
						<div class="sub-title">{{item.cname}}</div>
					</li>
				</ul>
			</el-col>
		</el-row>

		<el-tag type="success" class="check_in" @click="sign_in"><i class="el-icon-check"></i> 签到</el-tag>
		<el-calendar id="date" v-model="value" v-if="date">
		  <template slot="dateCell" slot-scope="{date, data}">
		    <p :class="data.isSelected ? 'is-selected' : ''">
				{{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}
		    </p>
		  </template>
		</el-calendar>
		<i class="el-icon-circle-close close" v-if="date" @click="close"></i>
		<el-footer>
			<input class="btn" type="button" v-model="count" />
			<i v-if="show" class="el-icon-view el-icon--right" @click="show_money"></i>
			<i v-else class="el-icon-minus" @click="hidden_money"></i>
		</el-footer>
		<div id="btn">
			<el-button class="set" @click="myboke" icon="el-icon-place" type="warning">我的博客圈</el-button>
			<el-button class="set" @click="set_message" icon="el-icon-edit" type="info">修改信息</el-button>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				date: false,
				show: true,
				active: 0,
				cityList: [],
				value: new Date(),
				imageUrl: '',
				input: '',
				count: '钱包余额',
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.cityList = dat.slice(0, 1);
				}
			})
		},
		methods: {
			sign_in() {
				this.date = true;
				console.log(new Date());
				this.$notify({
					title: '成功',
					message: '签到成功',
					type: 'success'
				});
			},
			show_money() {
				this.show = false;
				let personal_money = this.cityList[0].all_money;
				this.count = personal_money;
			},
			hidden_money() {
				this.show = true;
				this.count = "钱包余额";
			},
			set_message() {
				this.$router.replace('/personal/modify');
			},
			myboke() {
				this.$router.replace('/personal/myboke');
			},
			close(){
				this.date = false;
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
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
		}
	}
</style>
