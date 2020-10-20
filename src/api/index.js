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
//获取商品分页列表
export const reqProductList = (pageNum,pageSize) =>axios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//商品搜索
export const reqProductSearch = (pageNum, pageSize, productName, productDesc) =>axios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum, pageSize, productName, productDesc}})
//更新商品状态
export const reqUpdateProductStatus = (productId,status) =>axios.post(`${BASE_URL}/manage/product/updateStatus`,{productId, status})
//根据商品id获取分类名
export const reqProductIdCategoryName = (productId) =>axios.get(`${BASE_URL}/manage/category/info`,{params:{categoryId:productId}})
//删除已上传图片
export const reqUploadRemoveImage = (name)=>axios.post(`${BASE_URL}/manage/img/delete`,{name})
//添加商品
export const reqAddProduct = (product)=>axios.post(`${BASE_URL}/manage/product/add`,{...product})
//更新商品
export const reqUpdateProductItem = (product)=>axios.post(`${BASE_URL}/manage/product/update`,{...product})
//获取角色列表
export const reqRoleList = () =>axios.get(`${BASE_URL}/manage/role/list`)
//添加角色
export const reqAddRole = (roleName)=>axios.post(`${BASE_URL}/manage/role/add`,{roleName})
//更新角色
export const reqUpdateRole = (role)=>axios.post(`${BASE_URL}/manage/role/add`,{role})
//获取用户列表
export const reqUserList = () =>axios.get(`${BASE_URL}/manage/user/list`)
//添加用户
export const reqAddUser = (user)=>axios.post(`${BASE_URL}/manage/user/add`,{...user} )
//更新角色
export const reqUpdateUser = (user)=>axios.post(`${BASE_URL}/manage/user/update`,{...user})
//更新角色
export const reqDeleteUser = (userId)=>axios.post(`${BASE_URL}/manage/user/delete`,{userId})
 

