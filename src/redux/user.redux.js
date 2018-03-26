//这个文件专门用来做登录信息的
//定义注册的常量

import axios from 'axios'
import {getRedirectPath} from '../util.js'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGON_SUCCESS = "LOGON_SUCCESS"
const ERROR_MSG = 'ERROR_MSG'  //错误信息
const AUTH_SUCCESS = "AUTH_SUCCESS"  //合并sucess
//加load_data来从服务器上面获取登录信息
const LOAD_DATA = "LOAD_DATA"
//默认用户信息
const initState = {
	redirectTo:"",
	msg:"",
	//isAuth:false,
	user:"",
	pwd:"",//pwd这个字段可以删除
	type:""
}
//reguis这个就相当于发出的通知
//通过redux来修改状态
export function user(state = initState,action){

  switch(action.type){
  	 // case REGISTER_SUCCESS:
    //     return {...state,msg:"",redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
    //     //返回给connect然后就会更新state
    //  case LOGON_SUCCESS:
    //       return {...state,msg:"",redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}

  	 case AUTH_SUCCESS:
        return {...state,msg:"",redirectTo:getRedirectPath(action.payload),...action.payload}
     case ERROR_MSG:
         return {...state,isAuth:false,msg:action.msg}
     case LOAD_DATA:
        return {...state,...action.payload}
  	 default:
  	  return state;
  	  //第一次会执行，那么函数user就是initState的默认数据
  }
  
}
//修改信息 注册，登录合并
function authSuccess(obj){
  //const {pwd,...data} =obj 过滤多余的属性这个方法的作用
  return {type:AUTH_SUCCESS,payload:obj}
}

// //如果成功user要处理的事情
// //这个跟上面的authSuccess合并成一个，可以删除
// function registerSuccess(data){
//    return {type:REGISTER_SUCCESS,payload:data}
// }

// //这个跟上面的authSuccess合并成一个，可以删除
// function loginSuccess(data){
//   return {type:LOGON_SUCCESS,payload:data}  //payload用来判断跳转的
// }
//如果成功user要处理的事情
function errorMsg(msg){
	return {type:ERROR_MSG,msg:msg}
}




export function loadData(userinfo){
     console.log(userinfo)
     return {type:LOAD_DATA,payload:userinfo}

}

//判断是否为空的验证 注册
export function regisger({user,pwd,repeqtpwd,type}){
	if(!user||!pwd||!type){
		return errorMsg("用户密码必须输入")
	}
    if(pwd!=repeqtpwd){
    	 return errorMsg("密码和确认不同")
    }
    //dispacth异步
    return dispatch=>{
    axios.post("/user/register",{user,pwd,type})
    .then((res)=>{
    	if(res.status==200&&res.data.code==0){
             dispatch(authSuccess({user,pwd,type}))   
             //dispacth会去执行connect绑定函数user,然后把返回的数据给他
    	}else{
    		//dispacth会根据你传递的什么然后去reguis去改变
              dispatch(errorMsg(res.data.msg))
    	}
    })
}
}

//修改信息
export function update(data){
    return (dispatch)=>{

        axios.post("/user/update",data)
        .then((res)=>{
            console.log(res.data.data,"返回的数据")
           if(res.status==200&&res.data.code==0){
             //dispatch(registerSuccess({user,pwd,type}))
             //dispacth会去执行connect绑定函数user,然后把返回的数据给他

             dispatch(authSuccess(res.data.data))//后端返回的数据  
             //注：目前理解的是dispatch会根据参数然后去触发user函数，user函数由于被 crateStore绑定了所有有了dispatch这个功能
             //目前理解 目前理解
      }else{
        //dispacth会根据你传递的什么然后去reguis去改变
              dispatch(errorMsg(res.data.msg))
      }                 
        })
        .catch((err)=>{
          console.log(err)
        })

    }
}

//登录
export function login({user,pwd}){
	  if(!user||!pwd){
	  	return errorMsg("用户名必须输入")
	  }
	  return dispatch=>{
    axios.post("/user/login",{user,pwd})
    .then((res)=>{
    	if(res.status==200&&res.data.code==0){
             //dispatch(registerSuccess({user,pwd,type}))
             //dispacth会去执行connect绑定函数user,然后把返回的数据给他
             dispatch(authSuccess(res.data.data))//后端返回的数据  
             //注：目前理解的是dispatch会根据参数然后去触发user函数，user函数由于被 crateStore绑定了所有有了dispatch这个功能
             //目前理解 目前理解
    	}else{
    		//dispacth会根据你传递的什么然后去reguis去改变
              dispatch(errorMsg(res.data.msg))
    	}
    })
}
}