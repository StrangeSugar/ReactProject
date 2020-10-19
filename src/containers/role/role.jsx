import React, { Component } from 'react'
import { Card, Button, Table, Modal ,Form,Input, message,Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import {PAGE_SIZE} from '../../config'
import menuList from '../../config/menu_config'
import {reqRoleList , reqAddRole,reqUpdateRole} from '../../api'


export default class Role extends Component {
    formRef = React.createRef();
    formRefAuth = React.createRef();
    state = { 
        visible: false ,
        visibleAuth: false ,
        dataSource:[],
        menuList:[{title:'平台权限',key:'all',children:menuList}],
        checkedKeys:[],
        role:{}
        
       
       

    };
    componentDidMount(){
        this.getRoleList()
    }
    

    
    
    onCheck = (checkedKeys)=>{
      console.log(checkedKeys)
      this.setState({checkedKeys})
    }
   
    setRole = async (name)=>{
        let result =  await reqAddRole(name)
        this.resultRender(result)
    }
    onFinish= (value)=>{
        
        this.setRole(value.name)
        this.setState({
            visible: false,
        });
    }
    setUpdateRole = async (role)=>{
     let result = await reqUpdateRole(role)
     this.resultRender(result)
    }
    onFinishAuth= ()=>{
        let {role,checkedKeys} = this.state
        role.menus = checkedKeys
        this.setUpdateRole(role)
        this.setState({
            visibleAuth: false,
        });

    }
    getRoleList= async()=>{
       let result =  await reqRoleList()
       const {status,data,msg} = result
       if(status===0){
           this.setState({dataSource:data})
       }else{
           message.error(msg)
       }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.formRef.current.submit()
    };

    handleCancel = e => {
        
        this.setState({
            visible: false,
        });
    };
    setAuth = (role)=>{
      
      let  newMenus =[]
      
      role.menus.forEach((item)=>{
        
        newMenus.push(item.split('/').reverse()[0]==='products'?'product':item.split('/').reverse()[0]) 
      })
      
      role.menus = newMenus
      
      this.setState({role,checkedKeys:newMenus})
    
    }
    showAuthModal = (role) => {
        this.setState({
            visibleAuth: true,
        });
        this.setAuth(role)

    };

    handleAuthOk = e => {

        this.formRef.current.submit()
    };

    handleAuthCancel = e => {
       
        this.setState({
            visibleAuth: false,
        });
    };
     //统一渲染操作
     resultRender= (result)=>{
        
       

        let { data, status,msg} = result
        console.log( data, status,msg)
        
        if (status === 0) {
            if(data){
                this.getRoleList()
                         
            }else{               
                
               
                
            }
            
        } else {
            message.error(msg)
            

        }
       
    }
    

    render() {
        

        const dataSource = this.state.dataSource
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(millisec)=>{
                    return dayjs(millisec).format('YYYY年 MM月DD日 HH:mm:ss')
                 }
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render:(millisec)=>{
                    if(millisec){
                        return dayjs(millisec).format('YYYY年 MM月DD日 HH:mm:ss')
                    }
                   
                 }
            },
            {
                title: '授权人',
                dataIndex: 'emName',
                key: 'emName',
            },
            {
                title: '操作',
               
                key: 'operation',
                render: (role) => {
                    return <Button type='primary'  onClick={()=>{this.showAuthModal(role)}}>设置权限</Button>
                }
            },
        ];
        const treeData = this.state.menuList
        return (
            <div>
                <Modal
                    title="新增角色"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        
                        >
                        <Form.Item
                            name = "name"
                            rules={[{ required: true, message: '请输入角色名!' }]}  
                        >
                            <Input  placeholder="请输入角色名"/>
                        </Form.Item>
                    </Form>
                    
                </Modal>
                <Modal
                    
                    title="角色授权"
                    visible={this.state.visibleAuth}
                    onOk={this.handleAuthOk}
                    onCancel={this.handleAuthCancel}
                    destroyOnClose
                    onCheck
                > 
                <Tree
                checkable
                onCheck={this.onCheck}                
                checkedKeys={this.state.checkedKeys}
                defaultExpandAll
                treeData={treeData}
                
              /> 
                  
                </Modal>
                <Card title={<Button type="primary"  onClick={this.showModal}><PlusOutlined />新增角色</Button>}>
                    <Table 
                         bordered
                          rowKey="_id"
                          dataSource={dataSource} 
                          columns={columns} 
                          pagination={{pageSize:PAGE_SIZE}}
                          />;
                </Card>
            </div>
        )
    }
}