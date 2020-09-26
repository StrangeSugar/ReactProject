import React, { Component } from 'react'
import "./css/login.less"
import logo from './imgs/logo2.png'

import { Form, Input, Button} from 'antd';
const { Item } = Form
const {Password} = Input
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header>
                    <img src={logo} alt="logo" />
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>

                    <Form onSubmit>
                        <Item>
                            <Input  placeholder="用户名"size="230px"/>
                        </Item>

                        <Item>
                            <Password placeholder="密码" size="230px"/>
                        </Item>



                        <Item>
                            <Button type="primary" className="login-sub-btn">
                                登录
                            </Button>
                        </Item>
                    </Form>

                </section>
            </div>
        )
    }
}