
//头像模块
import React from 'react';
import { Grid ,List} from 'antd-mobile';
import ProTypes from 'prop-types';
class AvatarSelector extends React.Component{
   //用static指定一下  这个是严格的根据传递的东西，给你然后指定什么格式
   static propTypes = {
  selectAvatar:ProTypes.func
   }

	constructor(props){
		super(props)
        this.state = {}
	}
	
	render(){
		//定义所有头像的名字  antd框架只带功能
		const avatarList = 'boy,man,woman,girl,zebra,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale'.split(",").map(v=>({
			icon:require((`../../img/${v}.png`)),
			text:v
		}));
   const grildHeader = this.state.text?(<div>
   	    <span>已选择头像</span>
   	    <img style={{width:20}} src={this.state.icon} alt=""/>
   	</div>):<div>"请选择头像"</div>
		return(
           <div>
           <List renderHeader={()=>grildHeader}>
       
          <Grid data={avatarList} columnNum={5}  //data刷出数据
           onClick = {elm=>{
           this.setState(elm) //this.setState直接这么设置会默认添加elm里面的属性
           //console.log(this.state)
           	this.props.selectAvatar(elm.text)
           }}
          >头像选择</Grid>
          </List>
           </div>
			)
	}
}

export default AvatarSelector