<template>
	<section class='some-info'>
		<div class="ticket-info">
			<h3 class="subtitle">实时票房</h3>
			<ul class="data-list clearfix">
				<li>
					<p class='num'>1</p>
					<p class='word font-grey f16'>实时票房排行</p>
				</li>
				<li>
					<p class='num'>918<span class="font-grey text">万</span></p>
					<p class='word font-grey f16'>实时票房</p>
				</li>
				<li>
					<p class='num'>4.80<span class="font-grey text">亿</span></p>
					<p class='word font-grey f16'>实时总票房</p>
				</li>
			</ul>
		</div>
		<div class="recommend">
			<h3 class='subtitle'>相关推荐</h3>
			<ul class="movie-list clearfix">
				<li v-for='item in relatedData'>
					<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt="" @click='hashChange'></router-link>
					<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='name f16' @click='hashChange'>古墓丽影</router-link>
				</li>
			</ul>
		</div>
	</section>
</template>

<style lang='scss' scoped>
	.some-info{
		margin-top: 40px;
		.subtitle{
			font-size: 20px;
			font-weight: normal;
		}
		.data-list{
			overflow: hidden;
	    width: 945px;
	    padding: 50px 0 44px;
	    text-align: center;
	    li{
	    	float: left;
	    	width: 313px;
    		border-right: 1px solid #ededed;
    		&:last-child{
    			border: none;
    		}
    		.num{
    			height: 40px;
			    padding-bottom: 16px;
			    font-size: 52px;
			    line-height: 40px;
			    color: #ff318c;
    		}
    		.word{
    			height: 18px;
    		}
    		.text{
    			padding-left: 4px;
    			font-size: 17px;
    		}
	    }
		}
		.recommend{
			h3{
				padding-bottom: 15px;
			}
			.movie-list{
				width: 960px;
				li{
					float: left;
			    width: 140px;
			    margin-right: 20px;
			    img{
			    	display: block;
				    width: 100%;
				    height: 206px;
				    margin-bottom: 15px
			    }
			    .name{
			    	display: block;
				    overflow: hidden;
				    width: 100%;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				    color: #333;
			    }
				}
			}
		}
	}
</style>

<script>
	import {QueryRelatedMovie, FindMovieById} from '@/api/api'
	export default {
		props: ['movieid'],
		data() {
			return {
				movieData: {},
				relatedData: []
			}
		},

		methods: {
			hashChange() {
				window.location.reload();		
			},

			/**
			 * [getMovieData description] 获取影片信息
			 * @return {[type]} [description]
			 */
			getMovieData() {
				let params = new URLSearchParams();
				params.append('id',this.movieid);
				FindMovieById(params).then( res => {
					this.movieData = res.data.data;
					console.log('mm', this.movieData);
					let params1 = new URLSearchParams();
					params1.append('director', this.movieData.director);
					params1.append('director', this.movieData.mainActor.split(',')[1]);
					params1.append('id',this.movieid);
					QueryRelatedMovie(params1).then(res => {
						this.relatedData = res.data.data; 
						console.log('rr', this.relatedData);
					})
				})
			}

		},		

		mounted() {
			this.getMovieData();
		}
	}
</script>