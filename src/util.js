//专门用来获取用户跳转地址

export function getRedirectPath({type:type,avatar}){
	
	//根据用户信息，返回跳转地址
	//user.type /boss /genius
	//user.avatar /boosinfo /geniusinfo

//根据传递的信息来判断是否返回那个链接
	let url = (type==="boss")?"/boss":"genius"
	if(!avatar){
		url+="info"
	}
	return url
}