
//可以使用一些组件来做判断比如跳转页面，
//这个组件就是用来加载的时候。是否是登录页如果不是下面做跳转判断
//authrouter这个组件负责获取用户的信息，做一些简单的跳转
import React from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom"; //withRouter这个功能可以实现跳转路由的功能。如果没有它就无法实现跳转
import {loadData} from '../../redux/user.redux.js'

import {connect} from 'react-redux';

@withRouter   //withRouter只有有了这个才能获取到路由的一些方法跟属性
@connect(state=>state.user,{loadData})
class AuthRoute extends React.Component{
	 componentDidMount(){
        const publicList = ['/login','register'];
        const pathname = this.props.location.pathname; //获取当前路由链接地址
	     console.log(this.props.location.pathname)
        //判断是否在当前login获取登录页，
      
         if(publicList.indexOf({pathname}) > -1){

             return null;
         }

	 	//获取用户信息
	
	 	axios.get("/user/info")
	 	.then((res)=>{
           if(res.status==200){
           	if(res.data.code==0){ //获取服务器上面的数据如果返回的是0就说明是登录成功的
                 //有登录信息的

  		    this.props.loadData(res.data.data)
           	}else{
        
         
               //cookie里面没有登录信息的就跳转到login
               	  
                this.props.history.push('/login')
           	}
           
           }
	 	})
  
	 	//状态是否登录
	 	//现在的url地址 login是不需要跳转的

	 	//用户的type身份是boss还是牛人
	 	//用户是否完善信息
	 }
	 render(){
	 	return null;
	 }
}

export default AuthRoute