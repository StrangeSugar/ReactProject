import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import {createDeleteuserInfoAction} from '../../redux/actions_creators/login_action'
import {reqCategoryList} from '../../api'




class Admin extends Component {
    categoryList = async() => {
        let result =await reqCategoryList()
        console.log(result)
    }
    componentDidMount() {
        console.log(this.props)
    }
    logOut = () => {
        this.props.deleteuserInfo()
        
    }

    render() {
        
        let { user, isLogin } = this.props.userInfo
        if (isLogin) {
            return (
                <div>
                    <div >
                        {user.username}
                    </div>
                    <button onClick={this.logOut} >注销</button>
                    <button onClick={this.categoryList} >获取商品列表</button>
                </div>

            )
        } else{
            return <Redirect to={'/login'} />
        }
       
        
        



    }
}

export default connect(
    state => ({
        userInfo: state.userInfo
    }),
    {
        deleteuserInfo:createDeleteuserInfoAction
    }


)(Admin)