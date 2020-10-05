import axios from "./MyAxios"
import {BASE_URL} from '../config'

 
//登录请求
export const reqLogin=(values)=>axios.post(`${BASE_URL}/login`,values)

//商品列表请求
export const reqCategoryList = () =>axios.get(`${BASE_URL}/manage/category/list`,{parentId:"5f6f0568a783260ee4bc4a83"})

