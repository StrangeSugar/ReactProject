import axios from "axios"


//登录请求
export const reqLogin=(values)=>{
    let {username,password} = values
    axios.post('http://localhost:3000/login',{
        username,
        password
    }).then((result)=>{
        console.log(result.data)
        
        

    }).catch((reson)=>{
        console.log(reson)
    })

}