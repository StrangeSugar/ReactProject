import {createStore,applyMiddleware} from "redux"  //引入createStore创建核心的store对象
import reduces from './reducers';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(reduces,composeWithDevTools(applyMiddleware(thunk)))
