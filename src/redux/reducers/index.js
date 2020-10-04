import loginReducer from './login_reducer'
import {combineReducers} from 'redux'


export default combineReducers({
    userInfo:loginReducer
}) 