const mongoose = require("mongoose");
//连接mongo并使用imooc这个集合
const DB_URL = "mongodb://localhost:27017/imooc-chat"

mongoose.connect(DB_URL);//连接数据库
mongoose.connection.on("connected",function(){
   console.log("连接数据库成功")
})

//定义一个用户的模型

const models = {
	  user:{
	  	"user":{type:String,require:true},
	  	"pwd":{type:String,require:true},
	  	"type":{type:String,require:true},
	  	//头像
	  	"acatar":{type:String,require:true},
	  	//个人简介或职位简介
	  	"desc":{type:String},
         //职位
        "title":{type:String},
        //如果你是boss还有2个字段
        "company":{type:String},
        "money":{type:String}
	  },
	  chat:{}
}

//动态批量生成数据
for(let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]))
}

//暴露这个模块到时候引用的时候用getModel(name)函数来做
//然后在server里面来做
module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}