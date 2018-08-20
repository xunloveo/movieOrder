<template>
	<div class="willListBar">
		<h2 class='subtitle f16'>即将上映</h2>
		<ul class="willList">
			<li v-for = 'item in listData'>
				<p class='date f12'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}日&nbsp;&nbsp;上映</p>
				<div class="info clearfix">
					<router-link :to="{path:'/moviedetail',query:{id: item.id}}">
						<div class="img fl">
							<img :src="'http://localhost:8080/test/img/'+ item.pic" alt="">
						</div>
					</router-link>
					<div class="intro fr">
						<router-link :to="{path:'/moviedetail',query:{id: item.id}}">
							<p class='name clearfix f14'>{{item.name}}<span class='fr nuomi-orange f12'>{{item.rate}}</span></p>
						</router-link>
						<p class="info">导演：{{item.director}}</p>
						<p class="info">主演：{{item.mainActor}}</p>
						<span class="icon">即将上映</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang='scss'>
	.willListBar{
		.subtitle{
			color: #000;
			font-weight: 400;	
		}	
		.willList{
			li{
				margin-bottom: 18px;
				.date{
					padding: 10px 0 12px;
					color: #111;					
				}
				.info{
					.img{
						overflow: hidden;
				    width: 62px;
				    height: 87px;
				    cursor: pointer;
				    img{
				    	display: block;
				    	width: 62px;
				    }
					}
					.intro{
						width: 155px;
						p{
							overflow: hidden;
					    height: 18px;
					    line-height: 18px;
					    white-space: nowrap;
					    text-overflow: ellipsis;
						}
						.name{
							overflow: hidden;
					    height: 16px;
					    margin-bottom: 11px;
					    line-height: 16px;
					    cursor: pointer;
					    color: #000;
						}
						.info{
							color: #878787;
							font-size: 12px;
						}
						.icon{
							display: inline-block;
					    height: 21px;
					    margin-top: 3px;
					    padding: 0 2px;
					    line-height: 21px;
					    text-align: center;
					    color: #fff;
					    background-color: #2a9ffe;
					    font-size: 12px;
						}
					}
				}
			}
		}	
	}
</style>

<script>
	export default{
		data() {
			return {
				listData: []
			}
		},

		methods: {
			getListData() {
				var uid = '';
				if(this.userInfo){
					uid = this.userInfo.id;
				}
				let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',5);
				params.append('uid', uid);
				this.axios.post('http://localhost:8080/test/querywillmovie',params).then((res) => {
					this.listData = res.data.data;	
					console.log('rr',res);							
				})
			}
		},

		mounted() {
			this.getListData();
		}
	}
</script>