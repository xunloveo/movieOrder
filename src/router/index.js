import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/views/map'
import VueMap from '@/views/vuemap'

/*import Main from '@/views/main'*/
import Welcome from '@/views/welcome'
import Index from '@/views/index'
import MovieDetail from '@/views/movieDetail/movieDetail'
import CinemaDetail from '@/views/cinemaDetail/cinemaDetail'
import cinema from '@/views/cinema'
import movie from '@/views/movie'
import ticket from '@/views/ticket'
import UserLogin from '@/views/userLogin/userLogin'
import UserRigist from '@/views/userRigist/rigist'
import Order from '@/views/order/order'
import BuySeat from '@/views/buySeat/buySeat'
import OrderConfirm from '@/views/orderConfirm/orderConfirm'
import NotFoundComponent from '@/views/404'
import Wallet from '@/views/wallet/wallet'

import AdminLogin from '@/views/admin/adminLogin/adminLogin'
import AdminRegist from '@/views/admin/adminRegist/adminRegist'
import Main from '@/views/admin/main'
import UserManage from '@/views/admin/userManage/userManage'
import CinemaManage from '@/views/admin/cinemaManage/cinemaManage'
import PersonalInfo from '@/views/admin/userInfo/userInfo'
import MovieManage from '@/views/admin/movieManage/movieManage'
import MovieComment from '@/views/admin/movieComment/movieComment'
import CinemaComment from '@/views/admin/cinemaComment/cinemaComment'
import OrderManage from '@/views/admin/orderManage/orderManage'
import SessionManage from '@/views/admin/sessionManage/sessionManage'
import TicketCount from '@/views/admin/ticketCount/ticketCount'

Vue.use(Router)



export default new Router({
  routes: [
    { path: '*', component: NotFoundComponent },
    {
      path: '/',
      component: Index      
    }, 
    /*{
      path: '/admin/regist',
      component: AdminRegist
    },*/
    {
      path: '/admin/main',
      component: Main,
      children:[
        { path: 'welcome', component: Welcome},
        { path: 'userInfo', component: UserManage},
        {path: 'cinemaInfo', component: CinemaManage},
        {path: 'personalInfo', component: PersonalInfo},
        {path: 'movieInfo', component: MovieManage},
        {path: 'movieComment', component: MovieComment},
        {path: 'cinemaComment', component: CinemaComment},
        {path: 'orderList', component: OrderManage},
        {path: 'sessionManage', component: SessionManage},
        {path: 'ticketCount', component: TicketCount} 
      ],
      redirect: '/admin/main/welcome'
    },
    {
    	path: '/map',
    	name: 'Map',
   		component: Map
    },
    {
    	path: '/vuemap',
    	name: 'vueMap',
   		component: VueMap
    },  
    {
      path: '/userlogin',
      component: UserLogin      
    }, 
    {
      path: '/rigist',
      component: UserRigist      
    },
    {
      path: '/index',
      component: Index       
    },  
    {path: '/movie', component: movie}, 
    {path: '/cinema', component: cinema},
    {path: '/ticket', component: ticket},
    {
      path: '/moviedetail' , 
      name: 'moviedetail' , 
      meta: { scrollToTop: true } , 
      component: MovieDetail      
    },
    {
      path: '/cinemadetail' , 
      name: 'cinemadetail' ,    
      component: CinemaDetail    
    },
    {
      path: '/order' , 
      name: 'order' ,    
      component: Order      
    },
    {
      path: '/buy/seat' , 
      name: 'buyseat' ,    
      component: BuySeat      
    },
    {
      path: '/buy/orderconfirm' , 
      name: 'orderconfirm' ,    
      component: OrderConfirm      
    },
/*
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },*/

    {path: '/admin', redirect: '/admin/login'},
    {path: '/admin/login', component: AdminLogin}
  ]
})
