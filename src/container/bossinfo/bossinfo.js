import React from 'react';
import { NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import AvatarSelector from "../../component/avatar-selector/avatar-selector.js"
//这个组件是boss页面设置的头像等
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux.js';
@connect(
   state=>state.user,
   {update}
	)
class BossInfo extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			   title:"",
			   company:"",
			   money:"",
			   desc:"",
			   avatar:""
		}
		this.selectAvatar = this.selectAvatar.bind(this)
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
    selectAvatar(imgname){
    	this.setState({
                 	   avatar:imgname
                 	})
    }
  
	render(){
		 const path = this.props.location.pathname
		 const redurect = this.props.redirectTo
		return(
              <div>
              {redurect&&redurect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
              	<NavBar
              	mode="dark">BOSS信息完善信息页面</NavBar>
                <AvatarSelector
                 selectAvatar = {this.selectAvatar}
            >{/*头像组件*/}</AvatarSelector>
                <InputItem onChange ={(v)=>this.onChange("title",v)}>招聘职位</InputItem>
                <InputItem onChange ={(v)=>this.onChange("company",v)}>公司名称</InputItem>
                <InputItem onChange ={(v)=>this.onChange("money",v)}>职位薪资</InputItem>
                 <TextareaItem 
                 onChange ={(v)=>this.onChange("desc",v)}
                  title="职位要求"
                  rous={3}
                  autoHeight
                  >
                  </TextareaItem>
                  <Button
                  onClick = {()=>{
                  	this.props.update(this.state)
                  }}
                   type="primary">保存</Button>
              </div>
			)
	}
}


export default BossInfo