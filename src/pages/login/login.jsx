import React, { Component } from 'react'
import "./css/login.less"
import logo from './imgs/logo2.png'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';




export default class Login extends Component {
    //密码的验证器
    checkPrice = (rule, value) => {
        
        if (!value.length >= 4 &&!value.length <= 12) {
            return Promise.reject('密码为4-12位');
        }
        if(!/^\w+$/.test(value)){
            return Promise.reject('密码必须由英文、数字、下划线组成');
        }
        
        return Promise.resolve();
      };
    
    
      onFinish = values => {
        console.log('Received values of form: ', values);
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
                        onFinish={this.onFinish}
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
                            <Input.Password visibilityToggle
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