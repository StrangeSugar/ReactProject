import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect,Route,Switch } from "react-router-dom"
import { Layout } from 'antd';
import { createDeleteuserInfoAction } from '../../redux/actions_creators/login_action'
import { reqCategoryList } from '../../api'
import './css/admin.less'
import Header from './header/header.jsx'
import Home from '../../components/home/home.jsx' 
import Category from '../category/category' 
import Product from '../product/product' 
import User from '../user/user' 
import Role from '../role/role' 
import Bar from '../bar/bar' 
import Line from '../line/line' 
import Pie from '../pie/pie' 
const { Footer, Sider, Content } = Layout;





class Admin extends Component {
    categoryList = async () => {
        let result = await reqCategoryList()
        console.log(result)
    }
    componentDidMount() {
        console.log(this.props)
    }
    logOut = () => {
        this.props.deleteuserInfo()

    }

    render() {

        let {isLogin } = this.props.userInfo
        if (isLogin) {
            return (
                
                    <Layout className='admin'>
                        <Sider className='sider'>Sider</Sider>
                        <Layout>
                            <Header className='header'>Header</Header>
                            <Content className='content'>
                                <Switch>
                                    <Route path = '/admin/home' component={Home}/>
                                    <Route path = '/admin/prod_about/category' component={Category}/>
                                    <Route path = '/admin/prod_about/product' component={Product}/>
                                    <Route path = '/admin/user' component={User}/>
                                    <Route path = '/admin/role' component={Role}/>
                                    <Route path = '/admin/charts/bar' component={Bar}/>
                                    <Route path = '/admin/charts/line' component={Line}/>
                                    <Route path = '/admin/charts/pie' component={Pie}/>
                                    <Redirect to='/admin/home'/>
                                </Switch>
                            </Content>
                            <Footer className='footer'>推荐使用谷歌浏览器，获取最佳用户体验</Footer>
                        </Layout>
                    </Layout>

                

            )
        } else {
            return <Redirect to={'/login'} />
        }






    }
}

export default connect(
    state => ({
        userInfo: state.userInfo
    }),
    {
        deleteuserInfo: createDeleteuserInfoAction
    }


)(Admin)