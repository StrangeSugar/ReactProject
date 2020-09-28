import {createStore} from "redux"  //引入createStore创建核心的store对象
import reducer from './reducer';

export default createStore(reducer)
