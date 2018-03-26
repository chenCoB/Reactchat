
import React,{Component} from 'react';
import App from '../App.js';
import Login from '../component/login/login.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class routerModule extends Component{

render(){
		return(
			<div>
          
    <Route exact path="/" component={App}></Route>
 	<Route path="/login"  component={Login}></Route>
 	<Route path="/headlines" component={App}></Route>
 	<Route path="/smallVideo" component={App}></Route>
   
           	 </div>
			)
	}
}


export default routerModule;