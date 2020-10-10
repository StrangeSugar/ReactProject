import axios from "./MyAxios"
import {BASE_URL,BAIDU_WEATHER_KEY,BAIDU_WEATHER_CITY} from '../config'
import jsonp from 'jsonp'
import { message } from "antd"

 
//登录请求
export const reqLogin=(values)=>axios.post(`${BASE_URL}/login`,values)

//商品分类列表请求
export const reqCategoryList = (parentId) =>axios.get(`${BASE_URL}/manage/category/list`,parentId)

//获取天气信息
export const reqWeather = () =>{
    
    return new Promise((resolve,reject)=>{
        jsonp( `http://api.map.baidu.com/telematics/v3/weather?location=${BAIDU_WEATHER_CITY}&output=json&${BAIDU_WEATHER_KEY}`,(err,data)=>{
            if(err){
                message.error("请求天气接口失败，请联系管理员")
                return new Promise(()=>{})
            }else {
                let weatherInfo = data.results[0].weather_data[0]
                resolve(weatherInfo)
            }
        })       
    })  
}
//新增商品分类
export const reqAddCategory = ({categoryName}) =>axios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更新商品分类名
export const reqUpdateCategory = ({categoryId,categoryName}) =>axios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})
