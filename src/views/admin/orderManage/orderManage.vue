<template>
	<section class="order-manage">
		<div class="order-content">
			<div class="searchForm">
				<el-form :model='queryForm' label-position="right" label-width="100px" ref='queryForm'>
					<el-row>
						<el-col :span='6'>
							<el-form-item label='电影名称：' prop='mname'>
								<el-input size='small' v-model='queryForm.mname' @keyup.enter.native="getOrderList"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='电影院：' prop='cid'>
								<el-select size='small' v-model='queryForm.cid' @change='getOrderList' style="width: 100%;" clearable filterable placeholder="请选择">
									<el-option value="">请选择</el-option>
									<el-option v-for='item in cData' :label='item.name' :value='item.id' :key='item.id'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='订购日期：' prop='time'>
								<el-select size='small' v-model='queryForm.time' @change='getOrderList' style="width: 100%;" clearable filterable placeholder="请选择">
									<el-option value="">请选择</el-option>
									<el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.value">
									</el-option>
								</el-select>									
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label-width="0">
								<el-checkbox-group v-model="queryForm.checkStatusCodes" @change="getOrderList">
									<!-- <el-checkbox v-for="item in checkStatusOptions" :label="item.code" :key="item.code" class="curState">{{item.name}}
									</el-checkbox> -->
									<el-checkbox v-for='item in checkStatusOptions' :label='item.code' :key='item.code'>
										{{item.name}}
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
						<el-col :span='5'>
								<el-form-item >
									<el-button size='mini' type='primary' @click='getOrderList'>搜索</el-button>
									<el-button size='mini' type='primary' @click='resetForm'>重置</el-button>
								</el-form-item>
						</el-col>
						<el-col :span="1"  class="btnGroups_Refresh">
							<el-tooltip effect="dark" content="自动刷新" placement="top">
								<div class="refreshImg" :class="isRefresh" @click="toggleRefresh">
								</div>
							</el-tooltip>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="order-info">
				<el-table :data='orderListData' style="width: 100%" highlight-current-row :max-height="maxHeight">					
					<el-table-column label='影院名称' prop='cname' show-overflow-tooltip width='280'></el-table-column>
					<el-table-column label='电影名称' prop='mname'  width='200' show-overflow-tooltip></el-table-column>
					<el-table-column label='影厅' prop='rname' show-overflow-tooltip width='120'></el-table-column>
					<el-table-column label='状态' prop='payCodeName' width='120'></el-table-column>
					<el-table-column label='座位' prop='seat' show-overflow-tooltip width='130'></el-table-column>
					<el-table-column label='订单号' prop='orderNum' width='200'></el-table-column>
					<el-table-column label='订购时间' prop='orderTime' width='180'></el-table-column>
					<el-table-column label='用户名' prop='uname' show-overflow-tooltip width='120'></el-table-column>
					<el-table-column label='用户手机' prop='uphone' show-overflow-tooltip width='120'></el-table-column>
					<el-table-column label='接收取票码手机' prop='phone' show-overflow-tooltip width='130'></el-table-column>	
					<el-table-column label='取票码' prop='ticketCode' show-overflow-tooltip width='130'></el-table-column>				
					<el-table-column label='放映时间' prop='time' width='180'></el-table-column>					
					<el-table-column label='数量' prop='num' width='80'></el-table-column>
					<el-table-column label='总价' prop='price' width='120'></el-table-column>					
				</el-table>
			</div>
			<div class="block" v-if="total > pageSize">
		    <el-pagination				      
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="pageSize"
		      background
		      layout="total, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
			</div>
		</div>
	</section>
</template>

<style lang='scss'>
	.order-manage{
		.order-content{
			.searchForm{
				.el-form{
					padding: 0 15px;
				}
				.setHeight{
					/* height: 40px; */
				}
			}
			.order-info{
				padding: 15px;
			}
			.block{
				bottom: 10px;
			}
			.refreshImg{
				margin-top: 4px;
				width: 32px;
				height: 32px;
				background-size: 32px 32px;
				background: url(../../../../static/img/refresh_32.png);
			}
			.refreshOffImg {
				width: 32px;
				height: 32px;
				background-size: 32px 32px;
				background: url(../../../../static/img/refreshOff_32.png);
			}
		}
	}
</style>

<script>
  import util from '@/common/util'
  import {QueryOrderByCondition, QueryCinemaAll} from "@/api/api"  
	export default {
		data() {
			return {
				queryForm: {
					mname: '',
					cid: '',
					time: '',
					checkStatusCodes: []
				},
				total: 0,				
				currentPage: 1,
				pageSize: 9,
				cData: [
				],
				dateOptions: [
					{
						id: 1,
						name: '今天',
						value: new Date().getTime()
					},
					{
						id: 2,
						name: '昨天',
						value: new Date().getTime() - 3600 * 1000 * 24
					},
					{
						id: 3,
						name: '最近一周',
						value: new Date().getTime() - 3600 * 1000 * 24 * 7
					},
					{
						id: 4,
						name: '最近一个月',
						value: new Date().getTime() - 3600 * 1000 * 24 * 30
					}
				],
				checkStatusOptions: [
					{
						code: 1,
						name: '待付款'
					},
					{
						code: 2,
						name: '已取消'
					},
					{
						code: 3,
						name: '已支付'
					},
					{
						code: 6,
						name: '已退款'
					}
				],
				orderListData: [],
				isRefresh: '',
				refersh: false,
				timer: null,
				personInfo: null,
				maxHeight: 0
			}
		},

		methods: {
			/**
			 * [getOrderList description] 获取订单信息列表
			 * @return {[type]} [description]
			 */
			getOrderList() {
				let params = new URLSearchParams();
				params.append("mname", this.queryForm.mname);
				params.append("cid", this.queryForm.cid);
				let orderTime = '';
				if(this.queryForm.time != ''){
					orderTime = util.formatDate.format(new Date(this.queryForm.time),"yyyy-MM-dd");
				}
				params.append("orderTime", orderTime);
				let code = "";
				if(this.queryForm.checkStatusCodes.length > 0){
					code = this.queryForm.checkStatusCodes.join(',');
				}
				params.append("code", code);
				params.append("pageNum", this.currentPage);
				params.append("pageSize", this.pageSize);				
				params.append("permission", this.personInfo.permission);
				params.append("adminId", this.personInfo.id);
				QueryOrderByCondition(params).then(res => {
					this.total = res.data.totalNum;
					this.orderListData = res.data.data;
					this.orderListData.forEach(val => {
						val.time = val.pieceTime + " " + val.startTime;
						val.num = val.seat.split(',').length;
						for(var i = 0; i < this.checkStatusOptions.length; i++){
							if(val.payCode == this.checkStatusOptions[i].code){
								val.payCodeName = this.checkStatusOptions[i].name;
							}
						}
					})
				})
			},

			/**
			 * [getCData description] 获取电影院信息
			 * @return {[type]} [description]
			 */
			getCData() {
				let params = new URLSearchParams();				
				params.append("uid", this.personInfo.id);
				params.append("permission", this.personInfo.permission);
				QueryCinemaAll(params).then(res => {					
					this.cData = res.data.data;
				})
			},

			/**
			 * [handleCurrentChange description] 翻页
			 * @return {[type]} [description]
			 */
			handleCurrentChange() {
				this.getOrderList();
			},

			/**
			 * [resetForm description] 重置表单
			 * @return {[type]} [description]
			 */
			resetForm() {
				this.$refs.queryForm.resetFields();
				this.queryForm.checkStatusCodes = [];
				this.getOrderList();
			},
 
			toggleRefresh() {  // 自动刷新
				this.refersh = !this.refersh;
				if(this.refersh){
					this.isRefresh = "refershImg";
					this.timer = setInterval(()=> {
						this.getOrderList();						
					},3000);
				}else{
					clearInterval(this.timer);
					this.isRefresh = "refreshOffImg";
				}
			}
		},

		mounted() {
			this.personInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'));
			if(this.personInfo){
				this.getOrderList();
				this.getCData();
				this.toggleRefresh();
			}			
			this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
			window.onresize = function() {
				console.log(1);
				this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
				console.log(this.maxHeight);
			}						
		},

		destroyed() {			
			clearInterval(this.timer);
		}
	}
</script>