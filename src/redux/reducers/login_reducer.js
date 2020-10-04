import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

let user = JSON.parse(localStorage.getItem("user"))
let cookie = localStorage.getItem("cookie")




let initState = {
    user:user||"",
    cookie:cookie||'',
    isLogin:user&&cookie ? true:false
}

export default function test(preState = initState, action) {
    
    let newState ={ }

    let { type, data } = action

    switch (type) {
        case  SAVE_USER_INFO:
            newState = {user:data.data,cookie:data.cookie,isLogin:true}

            console.log(data)
            
            console.log(newState)

            console.log(localStorage)
            return newState
            case DELETE_USER_INFO:
            newState = {user:{},cookie:"".cookie,isLogin:false}
            return newState

        default:
            return preState

           
    }
 


}