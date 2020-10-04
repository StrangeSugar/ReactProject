import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'
import NProgress from 'nprogress'
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
    message.error(err.message)

    return new Promise(()=>{})
})




export default instanse