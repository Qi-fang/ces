<template>
	<div id="pl">
		<!-- 查看评论 -->
		<div id="block" v-if="unbock" v-for="fit in cityList1">
			<i class="el-icon-arrow-left returnf" @click="returnfriends">返回博客圈</i>
			<!-- <div id="more_pl" v-for="index in message_number"> -->
			<div id="more_pl" v-for="index in 10">
				<el-avatar class="more_plel" :size="50" :src="fit.background"></el-avatar>
				<div class="more_div">
					<p class="more_pl">
						{{fit.ID}} : 
						<span class='pldz_more'>
							<i class="iconfont icon-Group-"></i>&nbsp;&nbsp;
							<i class="iconfont icon-dianzan" @click="dianz($event)"></i>
						</span>
					</p>
					{{fit.message_content}}
					<br />
					{{fit.date.slice(14)}}
				</div>
			</div>
			<div id='pl_more'>
				<div class="pl_more">
					<i class="iconfont icon-Group-" @click="more($event)"></i>
					<i class="iconfont icon-dianzan" @click="dianz($event)"></i>
				</div>
			</div>
			<h3>{{$store.state.countt}}</h3>
			<button @click="pladd(10)">+</button>
			<button @click="plremove(5)">-</button>
			<button @click="paa(7)">++</button>
			<button @click="par(3)">--</button>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				cityList1: [],
				cityList20: [],
				friends_dianz: [],
				message_number: 0,
				unbock: true,
			}
		},
		created() {
			this.$axios.get('http://localhost:8081/test/city').then(res => {
				if (res.data) {
					let dat = res.data.cityList;
					this.cityList1 = dat.slice(4, 5);
					this.cityList20 = dat.slice(0, 20);
				}
			})
		},
		methods: {
			// 点赞
			dianz(e){
				this.friends_dianz = e.target.innerText.slice(0, 3);
				this.friends_dianz++;
				console.log(this.friends_dianz);
			},
			// 更多评论
			more(e){
				this.friends_more = e.target.innerText;
				console.log(this.friends_more);
				if(this.friends_more > 10){
					this.message_number = 10;
				}else{
					this.message_number = Number(this.friends_more);
				}
			},
			
			...mapMutations({
				pladd: "add",
				plremove: "remove"
			}),
			...mapActions({
				paa: "actionsadd",
				par: "actionsremove"
			}),
			
			//点击回到博客圈
			returnfriends(){
				// this.unbock = false;
				this.$router.replace('/friends');
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

	#pl {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		left: 0;
		overflow-y: scroll;
		
		#block{
			position: absolute;
			width: 100%;
			min-height: 100%;
			background: white;
			z-index: 1000;
			display: flex;
			flex-direction: column;
			
			.returnf{
				background: #E4E4E4;
				width: 100%;
				height: 40px;
				color: white;
				line-height: 40px;
			}
			#more_pl{
				display: flex;
				justify-content: space-around;
				width: 98%;
				margin-bottom: 30px;
				.more_plel{
					width: 20vw;
				}
				.more_div{
					width: 75vw;
					.more_pl{
						display: flex;
						justify-content: space-between;
					}
				}
			}
			#pl_more{
				width: 100%;
				background: Gainsboro;
				position: fixed;
				bottom: 0;
				.pl_more{
					height: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					i{
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
</style>
