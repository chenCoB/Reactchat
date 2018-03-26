import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List , InputItem ,Button , WhiteSpace , WingBlank ,Radio} from 'antd-mobile'
import {regisger} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'
//引入redux的connect来传递数据
import {connect} from 'react-redux';
import '../../index.css'
//state.user就是user.redux.js里面的user函数返回的数据


//如果想要每个组件都可以获取state的信息必须要用 connect这个属性必须要 ，必须要必须要第一个参数是state属性，第二个参数是事件
//然后组件里面就可以用this.props获取
//注：如果没有用装饰器写法那么必须这么写   组件名称 = connect(state,event)(组件名称) 组件名称要一样，他返回一个新的组件ok
@connect(
     state=>state.user,  //把state就user，state.user给state
     {regisger}
	)

class Register extends React.Component{
	constructor(props){
         super(props);
         this.state = {
         	user:"",
         	pwd:"",
         	repeqtpwd:"",
         	type:"genius", //booss   //如果是内部属性可以使用this.state
         }
         this.hanleRegister = this.hanleRegister.bind(this);
	}

	handeleChange(key,val){
		//根据onchange专递的数据来改变
		this.setState({
			[key]:val
		})
	}
	hanleRegister(){
	  //执行的regisger函数然后把this.state数据传进redux做处理
		this.props.regisger(this.state)

	}
	render(){
		const RadioItem = Radio.RadioItem;
		return( 
        <div>

        {this.props.redirectTo? <Redirect to={this.props.redirectTo}>{/*根据this.props.redirecto返回的数据是否跳转路由*/}</Redirect> : null}
        <Logo></Logo>
		<List>
		 {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
			<InputItem 
              onChange = {(v)=> this.handeleChange("user",v)}
			>用户名：</InputItem>
			<WhiteSpace/>
			<InputItem
			type="password"
               onChange = {(v)=> this.handeleChange("pwd",v)}
			>密码：</InputItem>
			<WhiteSpace/>
			<InputItem
			type="password"
              onChange = {(v)=> this.handeleChange("repeqtpwd",v)}
			>确认密码：</InputItem>
			<WhiteSpace/>
            <RadioItem 
             onChange = {()=>this.handeleChange("type","genius")}
             checked={this.state.type =="genius"}>牛人</RadioItem>
            <RadioItem
              onChange = {()=>this.handeleChange("type","boss")}
              checked={this.state.type =="boss"}>BOSS</RadioItem>
		    <WhiteSpace/>
		     <Button type="primary" onClick = {this.hanleRegister}>注册</Button>
		</List>
		</div>
		)
	}
}

export default Register;