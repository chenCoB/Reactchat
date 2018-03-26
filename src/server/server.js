const express  = require("express");
const bodyParser =require("body-parser")//用来接收post的数据

const cookieParser = require("cookie-parser")//解析cookie的

const app = express();
//每次需要一个中间件，我们都要开启app.use()
//如果中间件是个路由那么第一个参数是地址，第二个是暴露出来的
const  userRouter   = require("./user")

//只要是userRouter的那么他的路由都是/user开头的
app.use(cookieParser())//use注册后，解析cookie
app.use(bodyParser.json());
app.use("/user",userRouter)

//抽离mongoose数据库
// const mongoose = require("mongoose");
// const DB_URL = "mongodb://localhost:27017/imooc"

// mongoose.connect(DB_URL);//连接数据库
// mongoose.connection.on("connected",function(){
//    console.log("连接数据库成功")
// })

//类似于mysql的表，mongo里的文档，字段概念
// const User = mongoose.model("user",new mongoose.Schema({
//   user:{type:String,require:true},
//   age:{type:Number,require:true}
// }))
//新增数据
//User.create({user:"xiaohuaneg"})




app.listen("8888",function(req,res){
  console.log("服务器端口8888开启成功")
})