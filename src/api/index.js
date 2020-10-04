import axios from "./MyAxios"
import {BASE_URL} from '../config'

 
//登录请求
export const reqLogin=(values)=>axios.post(`${BASE_URL}/login`,values)
    

