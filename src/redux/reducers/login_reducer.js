import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

let user = JSON.parse(localStorage.getItem("user"))
let cookie = localStorage.getItem("cookie")




let initState = {
    user:user||"",
    cookie:cookie||'',
    isLogin:user&&cookie ? true:false
}

export default function login_reducer(preState = initState, action) {
    
    let newState ={ }

    let { type, data } = action

    switch (type) {
        case  SAVE_USER_INFO:
            newState = {user:data.data,cookie:data.cookie,isLogin:true}

           
            return newState
            case DELETE_USER_INFO:
            newState = {user:{},cookie:"".cookie,isLogin:false}
            return newState

        default:
            return preState

           
    }
 


}