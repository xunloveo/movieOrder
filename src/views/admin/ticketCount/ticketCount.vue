<template>
	<section class="ticket-count">
		<div class="session-header">
			<h4>票房统计</h4>
			<div class="divider"></div>
		</div>
		<div class="ticket-content">
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
						      @change="searchTicket"
						      :picker-options="pickerOptions"
						      value-format="yyyy-MM-dd"
						      placeholder="选择日期">
    						</el-date-picker>
    					</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="ticket-info">
				<el-table :data='ticketListData' :max-height="maxHeight">
					<el-table-column
			      type="index"
			      width="50">
			    </el-table-column>
					<el-table-column		        
		        label="电影名称"
		        width="350">
		        <template slot-scope="scope">			       
			        <span>{{ scope.row.mname }}</span><br>
			        <span style='font-size: 12px; color: #999'>上映{{(new Date(queryForm.date) - new Date(scope.row.screenTime)) / 60 / 60 / 24 / 1000 + 1}}天</span>
			      </template>
		      </el-table-column>
		      <el-table-column
		        prop="ticketNum"
		        label="实时票房"
		        sortable
		        width="200">
		      </el-table-column>
		      <el-table-column
		        prop="personNum"
		        sortable
		        label="人次">
		      </el-table-column>
		      <el-table-column
		        prop="sessionNum"
		        sortable
		        label="场次">
		      </el-table-column>
		      <el-table-column
		        prop="total"
		        sortable
		        label="累计票房">
		      </el-table-column>
				</el-table>
			</div>
		</div>
	</section>
</template>

<style lang='scss'>
	.ticket-count{
		.ticket-content{			
			.ticket-info{
				padding: 15px;
			}
		}
	}
</style>

<script>
	import util from '@/common/util'
	import {QueryTicket} from "@/api/api"
	export default{
		data() {
			return {
				pickerOptions:{
					disabledDate(time) {
            return time.getTime() > Date.now();
          },
				},
				queryForm: {
					date: util.formatDate.format(new Date(),"yyyy-MM-dd")
				},
				ticketListData: [],
				userInfo: null,
				timer: null,
				maxHeight: ''
			}
		},

		methods: {
			/**
			 * [searchTicket description] 查找票房信息
			 * @return {[type]} [description]
			 */
			searchTicket() {			
				let params = new URLSearchParams();
				params.append('date', this.queryForm.date);
				QueryTicket(params).then(res => {					
					this.ticketListData = res.data.data;
					this.ticketListData.forEach((val,index) => {
						val.total = this.formatNum(val.total);
						val.ticketNum = this.formatNum(val.ticketNum);
						val.personNum = this.formatNum(val.personNum);
						val.sessionNum = this.formatNum(val.sessionNum);
					})
				});
			},

			formatNum(val){
				if(val > 99999999){
					return (val / 100000000).toFixed(2) + '亿';
				}else if(val > 9999){
					return (val / 10000).toFixed(2) + '万';
				}else{
					return val;
				}
			}
		},

		mounted() {
			this.userInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'));
			if(this.userInfo) {
				this.searchTicket();
				this.timer = setInterval(() => {
					this.searchTicket();					
				},3000);
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