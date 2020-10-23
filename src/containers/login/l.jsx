import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import "./css/login.less"
import logo from '../../static/imgs/logo2.png'
import { createSaveUserInfoAction } from '../../redux/actions_creators/login_action'
import { createSaveTitleAction } from '../../redux/actions_creators/left_nav_actions'
import { reqLogin } from '../../api'
import menuList from '../../config/menu_config'
import Title from 'antd/lib/skeleton/Title';


@connect(state => ({
    userInfo: state.userInfo,
   

}),
    {
        saveUserInfo: createSaveUserInfoAction,
        saveTitle: createSaveTitleAction

    }
)


class Login extends Component {
    state={
        Item:{},
        result:{}
    }

    componentDidMount() {

    }


    //密码的验证器
    checkPrice = (rule, value) => {

        if (!value) {
            return Promise.reject("密码不能为空");
        }
        if (value.length >= 4 && value.length <= 12 && /^\w+$/.test(value)) {
            return Promise.resolve();
        } else {
            if (!/^\w+$/.test(value)) {
                return Promise.reject("密码必须由英文、数字、下划线组成")
            }
            if (!value.length >= 4 || !value.length <= 12) {
                return Promise.reject("密码为4-12位")
            }
        }


    };
    // return userRoleMenuList.some((uItem)=>{
    //     return uItem===cItem.key
    //  })
    // let cItemIndex
    // menuList.findIndex((item)=>{
    //    if(item.children){
    //     return item.children.findIndex((cItem)=>{
    //          if(cItem.children){
    //             this.findItem(cItem.children)
    //          }else{
    //             let userRoleMenuList = result.data.role.menus.map((item) => {
    //                 return item.split('/').reverse()[0]
    //             })
    //             return userRoleMenuList.some((uItem)=>{
    //                     return uItem===cItem.key
    //                  })
    //          }
    //     })

    //    }

    // })
    findItem2 = (menuList,menus) => {
        let Item = ''
        let index = ''
        index =  menuList.findIndex((menuItem) => {
            if (menuItem.children) {
                Item = this.findItem(menuItem.children,menus)
                if(Item!==''){
                    return true
                }
            } else {
                let userRoleMenuList = menus.map((item) => {
                    return item.split('/').reverse()[0]
                })
               return userRoleMenuList.some((userItem)=>{
                   if(userItem===menuItem.key){
                       Item = {path:menuItem.path,title:menuItem.title}
                       return true
                   }
                   else{
                       return false
                   }
                })
                
            }
           
        })
        console.log(Item)
        console.log(index)
       this.setState({Item},()=>{
          this.render()
       })
        return Item
        
        
       

    }
    findItem = (menuList,result) => {
        let Item = ''
        let index = ''
        index =  menuList.findIndex((menuItem) => {
            if (menuItem.children) {
                Item = this.findItem(menuItem.children,result)
                if(Item!==''){
                    return true
                }
            } else {
                let userRoleMenuList = result.data.role.menus.map((item) => {
                    return item.split('/').reverse()[0]
                })
               return userRoleMenuList.some((userItem)=>{
                   if(userItem===menuItem.key){
                       Item = {path:menuItem.path,title:menuItem.title}
                       return true
                   }
                   else{
                       return false
                   }
                })
                
            }
           
        })
        console.log(Item)
        console.log(index)
       this.setState({Item},()=>{
          this.render()
       })
        return Item
        
        
       

    }
    



    onFinish = async (values) => {

        // reqLogin(values).then((result)=>{
        //     console.log(result.data)

        // }).catch((reson)=>{
        //     console.log(reson)
        // })


        let result = await reqLogin(values)



        if (result.status === 0) {
            this.setState({result},()=>{
                console.log(this.state)
               this.render()
            })
            if (result.data.username !== 'admin') {
                result.data.role.menus.forEach((item, index) => {

                    if (item === '/products') {
                        result.data.role.menus[index] = '/prod_about'
                    }

                })
                console.log(result.data)
            }

            result.cookie = document.cookie
            
            if (result.data.username === 'admin') {
                this.props.history.replace('/admin/home')
               
            } else {
                let { path, title} =  this.findItem(menuList,result)
               
                console.log( path, title)
                this.props.history.replace(path)

                this.props.saveTitle(title)

            }

            this.props.saveUserInfo(result)


        } else {
            message.warning(result.msg)
        }


    }

    render() {
        if (this.props.isLogin) {
          let {path} = this.findItem2(menuList,this.props.userInfo.user.role.menus)
console.log(path)
         
            return <Redirect to={'/admin/home'} />
          
            
        }

        return (

            <div className="login">
                <header>
                    <img src={logo} alt="logo" />
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>


                    <Form
                        onFinish={this.onFinish}
                        name="normal_login"
                        className="login-form"



                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '用户名不能为空' },
                            { min: 4, message: '用户名不能少于4位' },
                            { max: 12, message: '用户名不能大于12位' },
                            { pattern: /^\w+$/, message: "用户名必须由英文、数字、下划线组成" }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ validator: this.checkPrice }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                                </Button>

                        </Form.Item>
                    </Form>






                </section>
            </div>
        )



    }

}

export default Login