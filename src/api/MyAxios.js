import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'
import NProgress from 'nprogress'
import store from '../redux/store'
import {createDeleteuserInfoAction} from '../redux/actions_creators/login_action'
import 'nprogress/nprogress.css'


const instanse = axios.create({
    timeout:4000
})

instanse.interceptors.request.use((config)=>{
    NProgress.start()
   
    if(config.method.toLowerCase()==="post"){
        if(config.data instanceof Object){
            config.data=qs.stringify(config.data)
        }
        
    }
   
    return config
})

instanse.interceptors.response.use((response)=>{
    
    NProgress.done()
    return response.data
},(err)=>{
    NProgress.done()
    if(err.response.status===401){
        message.error("身份验证失败，请重新登录")
        store.dispatch(createDeleteuserInfoAction())
        


    }else{
        message.error(err.message)
    }
    

    return new Promise(()=>{})
})




export default instanse