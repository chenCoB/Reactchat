import React from 'react';
import Logo from '../../component/logo/logo.js';
import {List,InputItem,Button, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'


@connect(
   state=>state.user,
   {login}
	)
class Login extends React.Component{
	constructor(props){
		super(props);
		//设置一个状态
		//this.state属性是可以设置的，不要因为redux就限制思维，不用this.state记住记住
		this.state = {
			user:"",
			pwd:""
		}
		this.register = this.register.bind(this)  
		this.handleLogin = this.handleLogin.bind(this)
	}

register(){
	//这个方法做跳转点击的时候跳转到哪里
     //所有的路由组件直接绑定的可以直接使用
     //如果你这个组件跟路由组件绑定的都可以直接使用history.push进行跳转
     //login跟register都绑定在route组件下面

     this.props.history.push("/register")  //路由自带的跳转功能
}

handleChange(key,val){

	this.setState({
		[key]:val
	})
}
handleLogin(){
	
	//点击登录触发login函数
	this.props.login(this.state)
}
	render(){
		
		return( 
        <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}>{/*根据this.props.redirecto返回的数据是否跳转路由*/}</Redirect> : null} 
       <Logo></Logo>
        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
		<WingBlank>
		<List>
			<InputItem 
               onChange={v=>this.handleChange("user",v)}
			>用户名:</InputItem>
			<InputItem
			  type="password"
                onChange={v=>this.handleChange("pwd",v)}
			>密码:</InputItem>
		</List>
			<WhiteSpace/>

			<Button onClick = {this.handleLogin} type="primary">登录</Button>
			<WhiteSpace/>
			<Button onClick ={this.register} type="primary">注册</Button>
		</WingBlank>

		</div>
		)
	}
}


export default Login;