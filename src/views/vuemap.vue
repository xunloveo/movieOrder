<template>
	<section class='instrument'>		
				<div class="instrumentContent">					
							AAAAAA
							<div id="container" class="map" tabindex="0" style="height: 400px">	
								<el-amap ref="map" vid='amapDemo' :zoom='zoom' :center='center' :amap-manager="amapManager" :plugin="plugins" :events="events">
									<!-- <el-amap-marker ref='marker' v-for='marker in markers' :position='marker.position' :events='marker.events'></el-amap-marker>
									<el-amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :visible="window.visible" :events="window.events"></el-amap-info-window> -->
								</el-amap>	
								BBBBB						
							</div>
		
					
					
				</div>

		
	</section>
</template>



<script>
	import {AMapManager} from 'vue-amap';

	export default {
		data() {
			return {	
				amapManager: 	new AMapManager(),
				zoom: 5,
				center: [114, 39.91],				
				events: {
						// 初始化地图
            init: (map) => { 
            	var _this = this;            
              map.getCity(result => {
                console.log(result)
              });              
              AMapUI.loadUI(['overlay/SimpleMarker','overlay/SimpleInfoWindow'], function(SimpleMarker,SimpleInfoWindow) {
              	_this.markers.forEach(function(markers,index){
              		var ma =  new SimpleMarker({
	            			//设置节点属性
	            			iconLabel: {
	            			  //普通文本
	            			  innerHTML: index,
	            			  //设置样式
	            			  style: {
	            			      color: '#f00',
	            			      fontSize: '80%'
	            			  }
	            			},
	            			//containerClassNames: 'my-marker',
	            			/*iconStyle: {
	            				src: '/assets/img/remind_32.png',
	            				style: {
	              		      width: '20px',
	              		      height: '40px'
	              		  }
	            			},*/
	            			iconStyle: iconStyle,
	            			// 显示定位点
	            			/*showPositionPoint: true,*/
	            			showPositionPoint: {
	              		  color: 'green',
	              		  radius: 4
	            			},
	            			map: map,
	            			position: [_this.markers.position[0], _this.markers.position[1]],
			          		//offset: new AMap.Pixel(-10, -40)
	        				});
	        				// marker移上去效果
			        		ma.setTitle(aa);
			        		// 旁边的文本
			        		ma.setLabel({  
			        		  offset: new AMap.Pixel(40, 20),  
			        		  content: "标注" + index  
			        		}); 
              	})
              	
            	})                
            },
            'moveend': () => {
            },
            'zoomchange': () => {
            },
            'click': (e) => {
              alert('map clicked');
            }
        },
				plugins: ['ToolBar', {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(o) {
                console.log(o);
              }
            }
        }],
        markers: [
          {
        		icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
       	  	position: [116.21, 39.91]
    			}, {
        		icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        		position: [116.37, 39.91]
    			}, {
    		  	icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    		 	 	position: [116.31, 39.81]
    			},{
        		icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        		position: [117.31, 39.81]
    			}
         ],
         windows: []    
          
			}		
		},
		methods: {			

			getmap(){
				  console.log(this.amapManager._componentMap);
          // gaode map instance
          console.log(this.amapManager._map);
			}
		},
		mounted(){
			//this.loadmap(); //加载地图和相关组件  
			/*let marker = [];	
			let wd = [];		
			let self = this;
			console.log('1',self);
			self.markers.forEach(function(m,index){
				wd.push({
					position: m.position,
					content: '<p>'+index+'</p>',
					visible: false
				})
				
				marker.push({
					position: m.position,
					icon: m.icon,
					events: {
						click(e){	
							self.windows.forEach(window => {
                  window.visible = false;
               });

                self.$nextTick(() => {
                  self.windows[index].visible = true;
                });		 

                // 设置中图中心为点击的marker坐标位置                          
               self.map.setCenter([m.position[0], m.position[1]]);
              

						}
					}
				});	

			})
			self.markers = marker;
			self.windows = wd;*/		
		}
	}
</script>