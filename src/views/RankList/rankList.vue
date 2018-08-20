<template>
	<div class="rankListBar">
		<h2 class='subtitle'>当日票房排行榜</h2>
		<ul class='rankList' ref='rankList' id='rank'>
			<li class='item' v-for="(item,index) in listData" :class="inx==index ? 'selected' : ''" @mouseover='select(index)'>
				<span class='rank top'>{{index+1}}.</span>
				<router-link :to="{path:'/moviedetail',query:{id: item.movieId}}"><h3 class='name'>{{item.mname}}<em class='num'>{{(item.ticketNum / 10000).toFixed(2)}}</em></h3></router-link>
				<div class="info clearfix">
					<div class="img">
						<router-link :to="{path:'/moviedetail',query:{id: item.movieId}}"><img :src="'http://localhost:8080/test/img/'+item.pic" alt=""></router-link>
					</div>					
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang='scss'>
	.rankListBar{
		.subtitle{
			padding-bottom: 13px;
    	border-bottom: 1px solid #f3f3f3;
    	font-weight: 400;
    	font-size: 20px;
    	color: #333;    	
		}
		.rankList{
			padding: 10px 0 0;
    	border-top: #f3f3f3;
			.item{				
				position: relative;
    		padding: 0 0 20px 17px;    		
    		&.selected{
    			.info{
    				display: block;
    			}
    		}    		  			
    		.rank{
    			position: absolute;
    			top: 1px;
    			left: 0;
    		}
    		.top{
    			color: #ff318c;
    			font-size: 12px;
    		}
    		h3{
    			overflow: hidden;
    			width: 147px;
    			height: 16px;
    			padding-right: 60px;
    			font-size: 14px;
    			font-weight: 400;
    			line-height: 16px;
    			text-overflow: ellipsis;
    			color: #111;
    			cursor: pointer;
    		}
    		.num{
    			position: absolute;
    			top: 0;
    			right: 0;
    			padding: 0 11px 0 5px;
    			font-weight: 400;
    			font-style: normal;
    			color: #333;
    		}
    		.info{
    			padding: 10px 0;
    			display: none;    			
    		}
    		.img{
    			width: 64px;
    			height: 86px;
    			float: left;
    			img{
    				width: 64px;
    				height: 86px;
    			}
    		}
			}
		}
	}
</style>

<script>	
    import util from '@/common/util'
	import jq from 'jquery'
	import {QueryAllTicket} from "@/api/api"
	export default{
		data(){
			return {
				listData: [],
				inx: 0				
			}
		},

		methods: {
			getListData() {
                let params = new URLSearchParams();                
                let date = util.formatDate.format(new Date(),"yyyy-MM-dd");
                params.append("date",date);
				QueryAllTicket(params).then(res => {	
					this.listData = res.data.data;
					console.log('ld',this.listData);
				});
			},

			select(index){
				this.inx = index;
			}			
		},

		mounted() {					
			this.getListData();				
		}
	}
</script>