import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import {createDeleteuserInfoAction} from '../../redux/actions_creators/login_action'




class Admin extends Component {
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