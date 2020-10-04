import { SAVE_USER_INFO,DELETE_USER_INFO} from "../action_types"



export const createSaveUserInfoAction = (value) => {
    
    localStorage.setItem("user",JSON.stringify(value.data))
    
    localStorage.setItem("cookie",document.cookie)
    
    return {type:SAVE_USER_INFO,data:value}

}

export const createDeleteuserInfoAction = () => {
    
    localStorage.removeItem('user')
    localStorage.removeItem('cookie')

    return {type:DELETE_USER_INFO}

}

