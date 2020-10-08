import loginReducer from './login_reducer'
import left_nav_reducer from './left_nav_reducer'
import {combineReducers} from 'redux'


export default combineReducers({
    userInfo:loginReducer,
    saveTitle:left_nav_reducer
}) 