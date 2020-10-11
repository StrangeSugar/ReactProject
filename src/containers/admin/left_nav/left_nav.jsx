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
@connect((state)=>({}),
{
    saveTitle:createSaveTitleAction
}
)
@withRouter
class LeftNav extends Component {



    state = {
        mode: 'inline',
        theme: 'dark',
        key: {}
    };
    componentDidMount() {
        
        
    
    }
    
 


    createMenu = (menuList) => {


        return (
            

            <Menu


                selectedKeys={[this.props.location.pathname.split('/').reverse()[0]]}
                defaultOpenKeys={this.props.location.pathname.split('/').splice(2,this.props.location.pathname.split('/').length-3)}
                mode={this.state.mode}
                theme={this.state.theme}
                // inlineCollapsed={true}
            >
                {
                    menuList.map((item) => {

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
