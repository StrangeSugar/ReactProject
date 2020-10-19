import React, { Component } from 'react'
import { Button, Card, Table ,message} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { PAGE_SIZE } from '../../config'
import {reqUserList} from '../../api'
export default class User extends Component {
    state = {
        users:[],
        roles:[]
    }
    getUserList =async ()=>{
        let result = await reqUserList ()
        this.resultRender(result)

    }
    componentWillMount(){
        this.getUserList()
    }
    componentDidMount(){
        // this.getUserList()
    }
    //统一渲染操作
    resultRender= (result)=>{

        let { data, status,msg} = result
        console.log( data, status,msg)
       
        if (status === 0) {
            if(data){
                let {roles,users} = data
                this.setState({users,roles})
                         
            }else{               
               
            }
            
        } else {
            message.error(msg)
            

        }
       
    }
    render() {
       
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: "10%"
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                width: "10%"

            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                width: "10%"
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                width: "10%"
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                width: "35%",
               
                
            },
            {
                title: '操作',
                
                
                width: "25%",
                render:(user)=>{
                   return (
                       <div>
                           <Button type='link' >修改</Button><Button type='link' >删除</Button>
                       </div>
                       
                   )
                }
                
            },
        ];
       
       
        return (
            <div>
                <Card title={<Button type='primary' onClick={this.demo}><PlusCircleOutlined />添加</Button>}>
                <Table
                        bordered
                        dataSource={this.state.users}
                        columns={columns}
                        pagination={{
                            defaultCurrent: 1,
                            defaultPageSize: PAGE_SIZE,
                            // total: this.state.total,
                            // onChange: this.paginationOnChange,
                            // current:this.state.pageNum
                        }}
                        
                        rowKey='_id'
                        // loading={this.state.isLoading}
                    />
                </Card>

            </div>
        )
    }
}
