import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import {connect} from 'react-redux'
import * as Icon from '@ant-design/icons'
import './css/left_nav.less'
import logo from '../../../static/imgs/logo2.png'
import menuList from '../../../config/menu_config'
import {createSaveTitleAction} from '../../../redux/actions_creators/left_nav_actions'
const { SubMenu } = Menu;
@connect((state)=>({
    user:state.userInfo.user
}),
{
    saveTitle:createSaveTitleAction
}
)
@withRouter
class LeftNav extends Component {



    state = {
        mode: 'inline',
        theme: 'dark',
        key: {},
        userRoleMenuList:[]
    };

   componentWillMount(){
    
       let userRoleMenuList = this.props.user.role.menus.map((item)=>{
        return  item.split('/').reverse()[0]
           
           
       })
      
       
       
      
       this.setState({userRoleMenuList})
       

   }
   hasAuth = (menu)=>{
    //    let userRoleMenuList = this.state.userRoleMenuList
    //   if(userRoleMenuList.findIndex(((item)=>{
    //       console.log(item,menu.key)
    //     return item===menu.key
    //   }))===-1){
    //     return false
    //   }else{
    //       return true
    //   }
   
    if(this.props.user.username==='admin'){
        return true
    }else{
        let userRoleMenuList = this.state.userRoleMenuList
        
        if(menu.children){
           
            return menu.children.some((item)=>{
                return userRoleMenuList.indexOf(item.key)!==-1
            })
        }else{
            return userRoleMenuList.indexOf(menu.key)!==-1
        }
        

        
    }
    
     
   }

    
 


    createMenu = (menuList) => {
        
        return (
            

            <Menu


                selectedKeys={[this.props.location.pathname.indexOf('product')!== -1 ? 'product':this.props.location.pathname.split('/').reverse()[0]]}
                defaultOpenKeys={this.props.location.pathname.split('/').splice(2,this.props.location.pathname.split('/').length-3)}
                // openKeys={[this.props.location.pathname.split('/')[2]]}
                mode={this.state.mode}
                theme={this.state.theme}
                // inlineCollapsed={true}
            >

                
                {
                    
                    menuList.map((item) => {
                        
                            // console.log(this.state.userRoleMenuList.findIndex(item.key)!==-1)
                        if(this.hasAuth(item)){

                        if (!item.children) {

                            return (
                                <Menu.Item key={item.key} onClick= {()=>{this.props.saveTitle(item.title)}} icon={React.createElement(
                                    Icon[item.icon]
                                )}>
                                    <Link to={item.path}>
                                        {item.title}
                                    </Link>

                                </Menu.Item>
                            )
                        } else {
                            return (
                                <SubMenu key={item.key} title={item.title} icon={React.createElement(
                                    Icon[item.icon]
                                )}>
                                    {
                                        this.createMenu(item.children)
                                    }
                                </SubMenu>
                            )
                        }
                    }else{
                        return ''
                    }
                    })
                }
            </Menu>
        )
    }

    render() {
        return (
            <div className='left_nav'>
                <header>
                    <img src={logo} alt="logo" />
                    <h1>商品管理系统</h1>


                </header>

                {

                    this.createMenu(menuList)

                }



                {/* <Menu 


                    defaultSelectedKeys={['home']}

                    mode={this.state.mode}
                    theme={this.state.theme}
                >

                    <Menu.Item key="home" icon={<HomeFilled />}>
                        <Link to={'/admin/home'}>
                            首页
                        </Link>

                    </Menu.Item>

                    <SubMenu key="appstore" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="prod_about">
                        <Link to={'/admin/prod_about/product'}>
                            <ToolOutlined />商品管理
                            
                            </Link>
                            </Menu.Item>
                        <Menu.Item key="categroy">
                        <Link to={'/admin/prod_about/category'}>
                            <UnorderedListOutlined />分类管理
                            </Link>
                            </Menu.Item>
                    </SubMenu>


                    <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                    </SubMenu>

                </Menu>
                */}
            </div>

        );
    }
}
export default LeftNav
