import {createStore,applyMiddleware} from 'redux'
import login_reducer from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(login_reducer,composeWithDevTools(applyMiddleware(thunk)))