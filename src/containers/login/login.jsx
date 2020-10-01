import React, { Component } from 'react'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from  'react-redux'
import "./css/login.less"
import logo from './imgs/logo2.png'
import {createDemo1Action,createDemo2Action} from '../../redux/actions_creators/test_action'
import {reqLogin} from '../../api'



class Login extends Component {

    componentDidMount(){
        console.log(this.props)
    }


    //密码的验证器
    checkPrice = (rule, value) => {
        
        if (value.length >= 4 &&value.length <= 12 && /^\w+$/.test(value)) {
          return Promise.resolve();
        }else{
            if(!/^\w+$/.test(value)){
                return Promise.reject("密码必须由英文、数字、下划线组成")
            }
            if(!value.length >= 4 || !value.length <= 12){
                return Promise.reject("密码为4-12位")
            }
        }
      };
    
    
    onFinish = (values) => { 
        
        reqLogin(values)
 

    }
    render() {
        
        return (

            <div className="login">
                <header>
                    <img src={logo} alt="logo" />
                    <h1>商品管理系统</h1>
                </header>
                <section>
        <h1>用户登录</h1>
                    

                    <Form
                        onFinish={ this.onFinish}
                        name="normal_login"
                        className="login-form"
                        
                       

                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '用户名不能为空'},
                            {min:4,message:'用户名不能少于4位'},
                            {max:12,message:'用户名不能大于12位'},
                            {pattern:/^\w+$/,message:"用户名必须由英文、数字、下划线组成"}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ validator: this.checkPrice}]}
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

export default connect(
    state=>({
        loginState:state.test
    }),
    {
        loginDemo1:createDemo1Action,
        loginDemo2:createDemo2Action

    })(Login)