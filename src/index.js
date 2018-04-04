import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import 'antd-mobile/dist/antd-mobile.css'; 
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import reducers from './reducer.js'
import './config.js'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AuthRoute from './component/authroute/authrouter.js'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo.js';
import Dashboard from './component/dashboard/dashboard.js'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f


// 由于我们用了readux所有要用下面这种写法
//注：store只能与一个唯一的
//reducers是监听reducers这个函数，就是user这个可以随便取名字但是要符合写法
//第二个参数compose是redux自带的，可以组合函数,后面可以跟随很多
//applyMiddleware(thunk)这个是开启异步调用的开启异步调用必须安装 redux-thunk
//由于redux自身不能异步调用

//只能dispatch({type:age}) 这个方式触发
//如果发起了异步调用，那么他可以返回一个函数

/*
function action(){
     (dispatch)=>{
	   setInterval(()=>{

	     dispatch({type:age})间隔200才触发dispatch

	   },200)
     }
     }

*/
const store = createStore(reducers,compose(
        applyMiddleware(thunk),
        reduxDevtools
  	))

//boss genius me msg 4个页面
//Switch是用来判断如果找到一个下面的就不在找了,如果没有，会找下面的没有path的也会被渲染出来
ReactDOM.render(
 (
 	<Provider store= {store}>
 	   <Router>
 	   <div>
         <AuthRoute>{/*AuthRoute检测路由*/}</AuthRoute>
         <Switch>
         <Route path="/geniusinfo" component={Geniusinfo}></Route>
 	     <Route path="/bossinfo" component={BossInfo}></Route>
 	   	 <Route axcat path="/login" component={Login}></Route>
 	   	 <Route path="/register" component={Register}></Route>
         <Route component={Dashboard}></Route>
         </Switch>
 	   </div>
 	   </Router>
 	</Provider>
 	)
	, document.getElementById('root'));

