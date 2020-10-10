import {createStore,applyMiddleware} from 'redux'
import index_reducer from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(index_reducer,composeWithDevTools(applyMiddleware(thunk)))