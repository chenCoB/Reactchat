//所有新建的都归dashboard管理
import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from "react-redux"
import NavLinkBar from '../navlink/navlink'
import {Switch,Route} from 'react-router-dom'
import Boss from '../boss/boss'
function Genius(){
	return <div>Genius</div>
}
function Msg(){
	return <h2>小心列表</h2>
}
function User(){
	return <h2>User</h2>
}

@connect(
   state=>state
	)

class Dashboard extends React.Component{

   

     render(){
     	const user = this.props.user
     	const {pathname} =  this.props.location;
     	console.log({pathname})
     	const navList = [{
     	  "path": "/boss",
     	  text: "牛人",
     	  "icon": "boss",
     	  "title": "牛人列表",
     	  "component": Boss,
     	  "hide":user.type=="genius"
     	},
     	{
     	  "path": "/genius",
     	  text: "BOSS",
     	  "icon": "job",
     	  "title": "BOSS列表",
     	  "component": Genius,
     	  "hide":user.type=="boss"
     	},
     	 	{
     	  "path": "/msg",
     	  text: "消息",
     	  "icon": "msg",
     	  "title": "消息列表",
     	  "component":Msg,
     	 
     	},
     	 	{
     	  "path": "/me",
     	  text: "我",
     	  "icon": "user",
     	  "title": "个人中心",
     	  "component": User,
     	 
     	}

     	]
     	console.log(navList.find(v=>v.path==pathname))
	  	return(
	  		<div>
       <NavBar 
       className= 'fixd-header'
       mode="dard">{navList.find(v=>v.path==pathname).title}</NavBar>
       <div style={{marignTop:45}}>
   <Switch>
   	{navList.map(v=>(
   <Route key={v.path} path={v.path} component={v.component}>
{/*用Switch包裹渲染路由，map渲染这个列表*/}
   </Route>
   		))}
   </Switch>
       </div>
       <NavLinkBar data={navList}></NavLinkBar>
    
      </div>
	  		)
	  }
}

export default Dashboard;