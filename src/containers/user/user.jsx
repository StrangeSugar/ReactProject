import React, { Component } from 'react'
import { Button, Card, Table, message, Modal, Form, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import { PAGE_SIZE } from '../../config'

import { reqUserList ,reqAddUser,reqUpdateUser,reqDeleteUser} from '../../api'

const {Option} = Select
export default class User extends Component {
    fromRef= React.createRef()
    state = {
        users: [],
        isAdd:true,
        roles: [],
        visible: false,
        initialValues:{}

    }
    componentWillMount() {
        this.getUserList()
    }
    componentDidMount() {
        // this.getUserList()
    }
    deleteUser = async(userId)=>{
      let result = await reqDeleteUser(userId)
      this.resultRender(result)
    }
    getUserList = async () => {
        let result = await reqUserList()
        this.resultRender(result)

    }
    updateUser = async(values)=>{

        values._id =this.state.initialValues._id
       let result = await reqUpdateUser(values)
       this.resultRender(result)
    }
    updataUserButton = (user)=>{
        
        this.setState({initialValues:user, isAdd:false})
        this.showModal()
    }
    addUser = async (values)=>{
        
        let result = await reqAddUser(values)
       this.resultRender(result)
    }

    addUserButton = () => {
        this.setState({initialValues:{role_id:''}, isAdd:true})
        this.showModal()
    }
    onFinish = (values) => {
        
        if(this.state.isAdd){
            this.addUser(values)
        }else{
            this.updateUser(values)
        }
        
        

        
    };

    showModal = () => {
        this.setState({
            visible: true,
            
        });
    };

    handleOk = e => {
        
        this.fromRef.current.submit()
        
    };

    handleCancel = e => {
       
        this.setState({
            visible: false,
        });
    };
    //统一渲染操作
    resultRender = (result) => {

        let { data, status, msg } = result
       

        if (status === 0) {
            if (data) {
                let { roles, users } = data
                if(roles&&users){
                    users.reverse()
                    this.setState({ users, roles })
                    
                }else{
                    this.getUserList()
                    this.setState({
                        visible: false,
                    });
                    if(this.state.isAdd){
                        message.success("用户添加成功")
                    }else{
                        message.success("用户更新成功")
                    }
                    
                  

                }

            } else{
                this.getUserList()
                message.success("用户删除成功")
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
                width: "20%"

            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                width: "20%"
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                width: "20%",
                render: (time) => {
                    return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
                }
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                width: "10%",
                render: (roleId) => {

                   return this.state.roles[this.state.roles.findIndex((item)=>{
                    return item._id===roleId
                 })].name
 


                }


            },
            {
                title: '操作',


                width: "20%",
                render: (user) => {
                    return (
                        <div>
                            <Button type='link' onClick={()=>{
                               this.updataUserButton(user)
                            }} >修改</Button><Button type='link' onClick={()=>{
                               this.deleteUser(user._id)
                            }} >删除</Button>
                        </div>

                    )
                }

            },
        ];


        return (
            <div>
                <Modal
                   
                    title={this.state.isAdd?'添加用户':'修改用户'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                    
                >
                    <Form
                        ref= {this.fromRef}
                        name="addUser"
                        initialValues={this.state.initialValues}
                        onFinish={this.onFinish}
                        labelAlign='right'
                        labelCol={{span:4}}
                        wrapperCol={{span:10}}
                        
                    >


                        <Form.Item label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}><Input style={{width:"300px"}}/></Form.Item>
                            {
                                 this.state.isAdd ?  <Form.Item label="密码"
                                 name="password"
                                 rules={[
                                     {
                                         required: true,
                                         message: '请输入密码!',
                                     },
                                 ]}><Input type='password' style={{width:"300px"}}/></Form.Item>:''
                            }
                       
                        <Form.Item
                            label="手机号"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号!',
                                },
                            ]}><Input style={{width:"300px"}}/></Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱!',
                                },
                            ]}><Input style={{width:"300px"}}/></Form.Item>
                        <Form.Item
                            label="角色"
                            name="role_id"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择角色!',
                                }
                            ]}
                           
                            ><Select 
                            style={{width:"300px"}}
                            >
                                <Option  value={''}>请选择角色</Option>
                                {
                                     this.state.roles.map((item)=>{
                                   return <Option key={item._id} value={item._id}>{item.name}</Option>
                                   })
                                }
                                
                                </Select></Form.Item>

                    </Form>
                </Modal>
                <Card title={<Button type='primary' onClick={this.addUserButton}><PlusCircleOutlined />添加</Button>}>
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
