import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect,Route,Switch } from "react-router-dom"
import { Layout } from 'antd';
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
import LeftNav from './left_nav/left_nav'
import AddUpdate from '../product/addUpdate'
import Detail from '../product/detail'
import Order from '../order/order'
import menuList from '../../config/menu_config'
import {createSaveTitleAction} from '../../redux/actions_creators/left_nav_actions'


const { Footer, Sider, Content } = Layout;


class Admin extends Component {
    categoryList = async () => {
        let result = await reqCategoryList()
        console.log(result)
    }
    componentDidMount() {
       
    }
    path = ()=>{
        let menus=this.props.userInfo.user.role.menus.map((item)=>{
            return item.split('/').reverse()[0]
         })
         console.log(menus) //["/category", "/role", "/user"]
         // let {path} = this.findItem2(menuList,["/category", "/role", "/user"])
         let path =''
         let title =''
      menuList.findIndex((item)=>{
            if(item.children){
             return item.children.findIndex((cItem)=>{
                return menus.some((mItem)=>{
                 path=cItem.path
                 title=cItem.title
                    return mItem===cItem.key
                 })
             })!==-1
             
            }else{
             return menus.some((mItem)=>{
                 path=item.path
                 title=item.title
                    return mItem===item.key
                 })
            }
           

         })
         this.props.saveTitle(title)

         return path
    }
   
    

    render() {

        let {isLogin } = this.props.userInfo
        if (isLogin) {
            return (
               
                    <Layout className='admin'>
                        <Sider className='sider'>
                        <LeftNav/>
                        </Sider>
                        <Layout>
                            <Header className='header'>Header</Header>
                            <Content className='content'>
                                <Switch>
                                    <Route path = '/admin/home' component={Home} exact/>
                                    <Route path = '/admin/prod_about/category' component={Category}/>
                                    <Route path = '/admin/prod_about/product' component={Product} exact/>
                                    <Route path = '/admin/prod_about/product/add_update' component={AddUpdate} exact/> 
                                    <Route path = '/admin/prod_about/product/add_update/:id' component={AddUpdate}/>                                                                     
                                    <Route path = '/admin/prod_about/product/detail/:id' component={Detail}/>
                                    <Route path = '/admin/user' component={User}/>
                                    <Route path = '/admin/role' component={Role}/>
                                    <Route path = '/admin/charts/bar' component={Bar}/>
                                    <Route path = '/admin/charts/line' component={Line}/>
                                    <Route path = '/admin/charts/pie' component={Pie}/>
                                    <Route path = '/admin/order' component={Order}/>
                                    <Redirect to={this.path()}/>
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
    }),{
        saveTitle: createSaveTitleAction,
    }
    

)(Admin)