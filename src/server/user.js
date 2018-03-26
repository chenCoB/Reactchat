const express = require("express") //服务器
const utils = require("utility")
const model = require("./modle.js") //获取mongodb模型
const User = model.getModel("user"); //获取这个事件

//express有一个中间件可以抽取,Router路由对象进行抽取
const _filter = { "pwd": 0, "__v": 0 }

const Router = express.Router()


//发布招聘信息的数据
Router.post("/update",function(req,res){
	//先获取cookie是否有用户

   const userid = req.cookies.userid
     if(!userid){
     	return json.dumps({code:1})
     }
     const body = req.body;
     //findByIdAndUpdate这个命令是先查找id，在添加数据
     User.findByIdAndUpdate(userid,body,function(err,doc){
       
     	//返回的数据
     	const data = Object.assign({},{
     		user:doc.user,
     		type:doc.type
     	},body) //更新
     	 console.log("数据已经保存:"+data)
     	return res.json({code:0,data})
     })
})

//user/info是authrouter组件用查看是否登录没有 ,如果有_id那么就进行查找数据库，是否有，有就登录登录成功，
//没有就返回1，弹出后端出错 

Router.get("/info", function(req, res) {
  //当我们存了cookie后，我们在登录页的时候需要验证是否有cookie这样就不需要重新登录

  const { userid } = req.cookies; //获取cookie
  if (!userid) {
    return res.json({ code: 1 })
  }

  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
  //code是开关，是否登录
  //利用中间件Router返回数据code1,server文件引入user
})

//登录页
Router.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  //如果 查询条件pwd设置成0那么他就不会显示pwd这个返回的信息
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或者密码错误" })
    }

    //保存cookie userid是数据库的唯一值
    res.cookie("userid", doc._id)
    console.log("cookie已经保存" + doc._id)
    return res.json({ code: 0, data: doc })
  })
})

//清空数据库
Router.get("/list", function(req, res) {
  //User.remove({},function(e,d){})清空数据库
  User.find({}, function(err, doc) {
    //User.find find是查找 查询列表
    return res.json(doc)
  })
})

//注册页
Router.post("/register", function(req, res) {
  console.log(req.body)
  const { user, pwd, type } = req.body;
  //查询用户名是否存在
  User.findOne({ user: user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" })
    }
    //create新建
    //为什么要新建一个User是因为create没有办法拿到用户的id
    //生成以后才能拿到id
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    //save方法
    userModel.save(function(e, d) {
      if (e) {
        return res.json({ code: 1, msg: "后端出错了" })
      }
      const { user, type, _id } = d
      res.cookie("userid", _id) //存cookie
      return res.json({ code: 0, data: { user, type, _id } })
    })

  })
})

//密码加严

function md5Pwd(pwd) {
  const salt = "wdacmm2018@3^24^&((";
  return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router //暴露出Router