import {createStore,applyMiddleware} from "redux"  //引入createStore创建核心的store对象
import reducer from './reducers/counter_reducer';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
