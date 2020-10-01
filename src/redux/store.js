import {createStore,applyMiddleware} from 'redux'
import test_reducer from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(test_reducer,composeWithDevTools(applyMiddleware(thunk)))