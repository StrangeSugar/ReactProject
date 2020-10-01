import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createDemo1Action,createDemo2Action} from '../../redux/actions_creators/test_action'
class Admin extends Component{
           render(){
               return (
                 <div >
                     admin
                  </div>
        )
    }
}

export default connect(
    state => ({
        adminState:state
    }), 
    {
        adminDemo1:createDemo1Action,
        adminDemo2:createDemo2Action
    }
)(Admin)