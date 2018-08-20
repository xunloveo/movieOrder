<template>
	<el-scrollbar class="main">
		<header-bar></header-bar>
		<div class='content w'>
			<div class="search-form">
				<el-form :model='queryForm' label-position="left" ref='queryForm'>
					<el-row>
						<el-col :span='4'>
							<el-form-item  prop='date' label-width="0">
								<el-date-picker
						      v-model="queryForm.date"
						      type="date"
						      size='small'
						      style='width: 100%'
						      :clearable= 'false'
						      @change="getData"
						      :picker-options="pickerOptions"
						      value-format="yyyy-MM-dd"
						      placeholder="选择日期">
    						</el-date-picker>
    					</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<h3 class='subtitle'>今日大盘</h3>
			<div class="detail">
				<div class="left-num">
					<p class='totalNum'><span>{{(totalTicket / 10000).toFixed(2)}}</span>万</p>
					<p>票房</p>
				</div>
				<ul class="right-num clearfix">
					<li>
						<p class="p-up"><span>{{(totalPerson / 10000).toFixed(2)}}</span>万</p>
						<p>人次</p>
					</li>
					<li>
						<p class="p-up"><span>{{(totalSession / 10000).toFixed(2)}}</span>万</p>
						<p>场次</p>
					</li>
					<li>
						<p class="p-up"><span>{{avgPrice}}</span>元</p>
						<p>平均票价</p>
					</li>
				</ul>				
			</div>
			<el-table :data="tableData" :row-class-name="tableRaw" @row-click='goMovieDetail' tooltip-effect="dark">
				<el-table-column prop="mname" label="影片" width="300" show-overflow-tooltip>
					<template slot-scope="scope">			       
			        <span>{{ scope.row.mname }}</span><br>
			        <span style='font-size: 12px; color: #999'>上映{{(new Date(queryForm.date) - new Date(scope.row.screenTime)) / 60 / 60 / 24 / 1000 + 1}}天</span>&nbsp;&nbsp;&nbsp;&nbsp;
			        <span style='color: #fd8e51; font-size: 12px;'>{{ formatNum(scope.row.total)}}</span>
			    </template>
				</el-table-column>
				<el-table-column prop="ticketNum" label="实时票房" width="180" align="center" :class-name='tableCol'></el-table-column>
				<el-table-column prop="ticketRate" label="票房占比" width="180" align="center"></el-table-column>
				<el-table-column prop="sessionNum" label="场次" width="180" align="center"></el-table-column>
				<el-table-column prop="personNum" label="人次" width="180" align="center"></el-table-column>
				<el-table-column prop="avgPrice" label="平均票价" align="center"></el-table-column>
			</el-table>
		</div>
	</el-scrollbar>
</template>

<style lang="scss">
	.content{
		.subtitle{
			font-size: 20px;
			font-weight: normal;
			height: 40px;
			line-height: 40px;
			margin-bottom: 10px;
		}
		.detail{
			height: 150px;
	    width: 1206px;
	    text-align: center;
	    border: 1px solid #ececec;
	    position: relative;
	    margin-bottom: 20px;
	    .left-num{
	    	width: 510px;    	
		    position: absolute;
		    left: 0;
		    bottom: 32px;
		    .totalNum{
		    	height: 54px;
		    	line-height: 54px;
			    color: #ff3caf;
			    font-size: 16px;
			    font-weight: 700;
			    span{
			    	font-size: 38px;
			    }
		    }
	    }
	    .right-num{
				padding-bottom: 39px;
		    font-size: 14px;	    
		    position: absolute;
		    right: 0;
		    bottom: 0;
		    width: 693px;
		    li{
		    	width: 230px;
			    height: 40px;
			    float: left;
			    position: relative;
			    border-left: 1px solid #ececec;
			    .p-up{
			    	margin-top: -18px;
			    	margin-bottom: 8px;
			    	span{
							font-size: 30px;
							margin-right: 4px;
			    	}
			    }
		    }
	    }
		}
	}
	.el-table thead{
		color: #333;	
		tr:first-child{
			background-color: #f6f6f6;
			th{
				color: #333;
			}
		}	
	}
	.tableraw{
		height: 50px;
		font-size: 14px;
		color: #333;
	}
	.tableCol{
		color: #fc4486;
	}
	.el-table__body tr{
		td:first-child{
			font-weight: bold;
		}	
		&:hover{
			cursor: pointer;
			td:first-child{
				color: #fc4486;
			}
		}
	}

</style>

<script>
	import HeaderBar from "@/views/header"
	import util from '@/common/util'
	import {QueryAllTicket, EditAllTicket} from "@/api/api"
	export default{
		data() {
			return {
				tableData: [],
				tableRaw: 'tableraw',
				tableCol: 'tableCol',
				totalTicket: 0,
				totalPerson: 0,
				totalSession: 0,
				avgPrice: 0,
				timer: null,
				queryForm: {
					date: util.formatDate.format(new Date(),"yyyy-MM-dd")
				},
				pickerOptions:{
					disabledDate(time) {
            return time.getTime() > Date.now();
          },
				},
			}
		},

		components:{
			HeaderBar
		},		

		methods: {
			/**
			 * [goMovieDetail description] 点击每行的时候跳到相应的影片详情页
			 * @return {[type]} [description]
			 */
			goMovieDetail(row) {
				this.$router.push({path:'/moviedetail',query:{id: row.movieId}});
			},

			/**
			 * [getData description] 获取数据
			 * @return {[type]} [description]
			 */
			getData() {
				let params = new URLSearchParams();
				params.append("date", this.queryForm.date);
				QueryAllTicket(params).then(res => {
					this.tableData = res.data.data;
					this.totalTicket = res.data.ticketNum;
					this.totalSession = res.data.sessionNum;
					this.totalPerson = res.data.personNum;
					this.avgPrice = res.data.avgPrice;					
					this.tableData.forEach((ele,index) => {	
						let rate = (ele.ticketNum * 100 / this.totalTicket).toFixed(2);															
						ele.ticketRate = rate + '%';	

						ele.ticketNum = this.formatNum(ele.ticketNum);
						ele.sessionNum = this.formatNum(ele.sessionNum);
						ele.personNum = this.formatNum(ele.personNum);
						ele.avgPrice = Math.floor(ele.avgPrice);
					});	
				})				
			},

			formatNum(val){
				if(val > 99999999){
					return (val / 100000000).toFixed(2) + '亿';
				}else if(val > 9999){
					return (val / 10000).toFixed(2) + '万';
				}else{
					return val;
				}
			},

			/**
			 * [editTicket description] 编辑票房
			 * @return {[type]} [description]
			 */
			editTicket() {
				/*this.timer=setInterval(()=>{
					EditAllTicket().then(res => {
						console.log('ed', res);
						this.getData();
					})
					if(this.totalPerson > 1000000){
						clearInterval(this.timer);
					}
				},3000);*/
				
			}
		},

		mounted() {
			this.getData();
			this.timer = setInterval(() => {
				this.getData();
			},3000)
			
			//this.editTicket();
		},

		destroyed(){
			clearInterval(this.timer);
		}
	}
</script>