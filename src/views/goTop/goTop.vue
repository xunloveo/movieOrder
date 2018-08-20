<template>
	<transition name='fade'>
	 	<el-tooltip effect='dark' content="回到顶部" placement="right" v-if="showGo">			
			<div class="go-up" ref='up' @click='goTop' >
				<i class="el-icon-caret-top"></i>
			</div>					
		</el-tooltip>
	</transition>
</template>

<style lang='scss' scoped>
	.go-up{
		background-color: transparent;			
    position: fixed;
    right: 6%;
    bottom: 20%;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .5s;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    z-index: 5;
    i{
    	color: #409eff;
	    display: block;
	    line-height: 40px;
	    text-align: center;
	    font-size: 18px;
    }
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
		transform: translateY(-20px);
	}
	.fade-enter-to, .fade-leave{
		opacity: 1;
		transform: translateY(0px);
	}
</style>

<script>
	export default {
		props: ['scrollRoot'],
		data() {			
			return {
				showGo: false
			}
		},

		methods: {
			/**
			 * [scroll description] 监听滚动事件
			 * @return {[type]} [description]
			 */
			scroll() {	
				var _this = this;			
				this.scrollRoot.onscroll = function() {					
					if(this.scrollTop >= 400){
						//_this.$refs.up.style.display = 'block';
						_this.showGo = true;
					}else{
						//_this.$refs.up.style.display = 'none';
						_this.showGo = false;
					}
				}
			},

			/**
			 * [goTop description] 点击回到顶部
			 * @return {[type]} [description]
			 */
			goTop() {
				this.scrollRoot.scrollTop = 0;
			}
		},

		mounted() {			
			this.scroll();
		}
	}
</script>