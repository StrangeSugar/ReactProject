import CounterReducer from './counter_reducer' 
import {combineReducers} from 'redux'


export default combineReducers({count:CounterReducer})