<template>  
  <section class='instrument'>    
    <div id="container" class="map" tabindex="0"></div>             
  </section>  
</template>

<style>
      *{
        margin: 0;
        padding: 0;
      }  
      #app{
        margin-top: 0;
      }
      .instrument{
        /*  padding-top: -60px;      */
        height: calc(100vh);
      }
      #container{
        height:  100%;                       
      }
      .title{
        color: red;
        line-height: 30px;        
      } 
      .amap-marker-label{
        border-color: #fff;     
        padding: 5px;
        font-size: 0.8em;
        border-radius: 2px;
        box-shadow: 0 0 8px 0 rgba(0,0,0,.5);
        background-color: #fff;     
        /* display: none; */
      }
      .amap-marker-label::before, .amap-marker-label::after{
        content: "";
        width: 0;
        height: 0;
        top: 50%;
        left: 0;
        margin-top: -7px;
        margin-left: -15px;
        position: absolute;
        border: 7px solid transparent;
        border-right: 7px solid rgba(51,51,51,.2);
      }
      .amap-marker-label::after{
        margin-left: -14px;
        border-right: 7px solid rgba(255,255,255,1);
      }
      .amap-simple-marker-label{
        transition: all .1s 1s
      }  
      .amap-simple-marker:hover img{        
          height: 50px !important;
          position: relative;
          top: -10px;
      }  
      .amap-simple-marker-position-point{
        background-color: #05c3f9 !important;
        z-index: -1; 
        cursor: pointer;
      }
      .amap-simple-marker-position-point:hover{
        transform: scale(1.2);        
      }
       
   

  
</style>


<script>
  /*import AMap from 'AMap';*/   //在页面中引入高德地图
  /*import jquery from 'jquery';*/
 /* import {AMapUI,loadUI} from '@/assets/mapui.js'*/

  export default {
    data() {
      return {
        markers: []
      }
    },
    methods: {
      loadmap(){
        var _this = this;         
        const map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 6,
          center: [115.919645,28.661914]
        });
        //map.setMapStyle('amap://styles/grey');
        // 使用滚动条来缩放地图
        map.plugin(["AMap.ToolBar"], function() {         
            map.addControl(new AMap.ToolBar());
            var rightBar = new AMap.ToolBar({position: 'RT'});            
            rightBar.hideRuler();
            rightBar.hideLocation();
            map.addControl(rightBar);
        });
        if(location.href.indexOf('&guide=1')!==-1){
           map.setStatus({scrollWheel:false})
        }
        // 地图加载完成
        map.on('complete',function(){
          _this.bb();
          console.log('加载完毕');
        })
        map.clearMap();  // 清除地图覆盖物
        var markers = [
          {
            icon: new AMap.Icon({
                image: "/assets/img/remind_32.png",
                size: new AMap.Size(21,39),
                imageSize: new AMap.Size(21,39)
            }),         
            position: [114.288655,27.683577],
            content: '温汤镇中心卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [117.812833,29.096669],
            content: '海口镇卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [110.70674,33.18385],
            content: '赵川镇中心卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [110.915283,33.302214],
            content: '湘河镇中心卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [114.255379,28.433631],
            content: '铜鼓卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [110.976201,33.506794],
            content: '富水卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [75.02913,39.72634],
            content: '康苏卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [113.648753,27.526079],
            content: '排上镇卫生院'
          },
          {
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [111.594652,30.520079],
            content: '安福寺中心卫生院'
          }

        ];
        _this.markers = markers;
        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        AMapUI.loadUI(['overlay/SimpleMarker','overlay/SimpleInfoWindow'], function(SimpleMarker,SimpleInfoWindow) {
          markers.forEach(function(marker,index) {

            var aa = '11';
            /*var ma = new AMap.Marker({          
                map: map,
                icon: marker.icon,
                position: [marker.position[0], marker.position[1]],
                offset: new AMap.Pixel(-12, -36)
            });*/
            var iconStyle = '';
            if(index % 4 == 0){
              iconStyle = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
            }else if(index % 4 == 1){
              iconStyle = 'http://webapi.amap.com/theme/v1.3/markers/b/mark_r.png';
            }else if(index % 4 == 2 ){
              iconStyle = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
            }else{
              iconStyle = 'http://webapi.amap.com/theme/v1.3/markers/b/mark_r.png';
            }
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
              iconStyle: {
                src: iconStyle,
                style: {
                    width: '40px',
                    height: '40px'
                }
              },
              //iconStyle: iconStyle,
              // 显示定位点
              /*showPositionPoint: true,*/
              showPositionPoint: {
                color: 'green',
                radius: 10
              },
              map: map,
              position: [marker.position[0], marker.position[1]],
              offset: new AMap.Pixel(-20, -40)
            });
            // marker移上去效果
            //ma.setTitle(aa);
            //console.log(parseFloat(ma.opts.iconStyle.style.height) / 2);            
            // 旁边的文本
            /*ma.setLabel({  
              offset: new AMap.Pixel(parseFloat(ma.opts.iconStyle.style.width), 10),  
              content: "标注" + index  
            }); */
            var count = 0 ;          
            
            // marker移上去效果
            ma.on('mouseover', function(e) {                
              //console.log(ma);
              //alert(1);
              //marker.icon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png'         
             
            /* ma.setIcon(new AMap.Icon({
              image: "/assets/img/remind_32.png",
              imageSize: new AMap.Size(40,39)
             }));*/
              //document.getElementsByClassName('amap-marker-label')[index].style.display='';
              ma.setLabel({  
                offset: new AMap.Pixel(40, 10),  
                content: ''+marker.content  
              });             
            });

            ma.on('mouseout',function(){
              ma.setLabel({  
                offset: new AMap.Pixel(40, 10),  
                content: ""  
              });
            })
            // marker 点击效果 
               
            ma.on('click',function(e){
              /*var infoWindow = new AMap.InfoWindow({
                    infoTitle: '<strong>这里是标题</strong>',
                    content: "<div class='title'>POI信息:</div>" + ma.getPosition() + "<button class='el-button el-button--primary' onclick='alert(1)'>go</button>",
                    offset: new AMap.Pixel(0, -20)
              });*/  
              
              // 使用ui的简单信息窗体
              
                var infoWindow = new SimpleInfoWindow({
                  infoTitle: '<strong>医疗</strong>',
                  infoBody:  '位置:'+ ma.getPosition() + "<br/><button class='btn el-button el-button--primary' onclick='alert("+index+")'>go</button>",

                  //基点指向marker的头部位置
                  offset: new AMap.Pixel(0, -31)
                }); 
                
              /*AMap.plugin(['AMap.AdvancedInfoWindow'],function(){         
                //创建高级信息窗体并在指定位置打开
                var infowindow = new AMap.AdvancedInfoWindow({
                  content: '<div class="info-title">高德地图</div><div class="info-content">'+
                        '<img src="http://webapi.amap.com/images/amap.jpg">'+
                        '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br>'+
                        '<a target="_blank" href="http://mobile.amap.com/">点击下载高德地图</a></div>',
                  offset: new AMap.Pixel(0, -30)
                });
                infowindow.open(map,ma.getPosition());
              })*/
                //infoWindow.setContent("<div class='title'>POI信息:</div>" + "<div class='content'>方式：" + info.source );
              infoWindow.open(map, ma.getPosition());  

              // 让标注为中心位置
              console.log(ma.getPosition()) 
              map.setCenter(new AMap.LngLat(parseFloat(ma.getPosition().lng),parseFloat(ma.getPosition().lat)));
              console.log('1',map.getCenter());
              ma.setMap(map);      
              
            })

            

          });          
           
        });       

         
      },
      bb(){
        /*var points = this.$el.querySelect('.amap-simple-marker-position-point');*/
        var points = document.getElementsByClassName('amap-simple-marker-position-point');
       var len = this.markers.length;
        console.log(points);
        alert(len);
        for(var i = 0; i < points.length; i++){
          var that = points[i].index;
          points[i].onmouseover = function(){
            alert(1);
          }
        }
      }
    },

    mounted(){
      var _this = this;
      this.loadmap(); //加载地图和相关组件  
      //this.bb();
    }
  }
</script>