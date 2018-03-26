import axios from 'axios';
import {Toast} from 'antd-mobile'


//连接请求



//当数据发送的时候会出现转动//Toast要在Index引入这个config文件就可以
axios.interceptors.request.use(function(config){
	Toast.loading("加载中",0)
	return config
})

//拦截相应

//当我们请求完成以后就关闭Toast
axios.interceptors.response.use(function(config){
	Toast.hide()
	return config
})