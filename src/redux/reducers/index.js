import loginReducer from './login_reducer'
import left_nav_reducer from './left_nav_reducer'
import detail_reducer from './detail_reducer'
import {combineReducers} from 'redux'


export default combineReducers({
    userInfo:loginReducer,
    saveTitle:left_nav_reducer,
    saveProductItem:detail_reducer
}) 