//combineReducers 合并所有reducer并返回

import {combineReducers} from 'redux';
import {user} from './redux/user.redux.js'
//引入user然后把他给combineReducers传递过去
export default combineReducers({user})