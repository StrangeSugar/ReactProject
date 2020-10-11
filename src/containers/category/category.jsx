import React, { Component } from 'react'
import { Card, Button, Table, message, Modal, Input, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { reqCategoryList, reqAddCategory ,reqUpdateCategory} from '../../api'
import { PAGE_SIZE } from '../../config'




export default class Category extends Component {

    state = {
        categoryList: [],//商品分类列表
        visible: false,//控制弹窗,
        isLoading: true,//控制加载效果
        operType: '',//控制 新增||修改 分类显示
        modalCurrentValue: '',//弹窗显示的值
        modalCurrentId:''//_id 更新需要的id
    }
    formRef = React.createRef();
   


    componentDidMount() {

        this.getCategory()

    }
    checkPrice = (rule, value) => {
        if (!value || value.length <= 0) {

            return Promise.reject('分类名必须输入')
        } else {
            return Promise.resolve()
        }

    }
    showAdd = () => {

        this.setState({
            operType: 'add',
            modalCurrentValue:'',
            visible: true,
        });
        

    };
    showUpdata = (item) => {
        const { _id, name } = item


        this.setState({
            operType: 'updata',
            modalCurrentValue: name,
            modalCurrentId:_id,
            visible: true,
        });
    };
    toUpdate= async (categoryName)=>{
        let categoryId = this.state.modalCurrentId
        let result = await reqUpdateCategory({categoryId,categoryName})
        console.log(result)
        const { status ,msg} = result
        if (status === 0) {
            this.getCategory()

            this.setState({
                visible: false,
            });
            message.success('更新成功')
            // this.formRef.current.resetFields()
        } else {
            message.error(msg, 1)
        }
    }
    //输入验证器
    
    toAdd = async(values)=>{
        let result = await reqAddCategory(values)
        const { status, data, msg } = result

        if (status === 0) {

            let categoryList = [...this.state.categoryList]
            categoryList.unshift(data)
            this.setState({ categoryList })
            message.success("新增分类成功", 1)
            this.setState({
                visible: false,
            });
            // this.formRef.current.resetFields()
        } else {
            message.error(msg, 1)
        }
    }
    

    onFinish =  (values) => {

        let { operType } = this.state


        if (operType === 'add') {
            
            this.toAdd(values)


        }
        if (operType === 'updata') {
            let {categoryName} = values
            this.toUpdate(categoryName)

        }




    }

    handleOk = () => {



        this.formRef.current.submit()
        



    };

    handleCancel = () => {

        
        this.setState({
            visible: false,
        });
       


    };
   




    getCategory = async () => {
        let result = await reqCategoryList()
        const { status, data, msg } = result

        if (status === 0) {
            this.setState({ isLoading: false })
            this.setState({ categoryList: data.reverse() })
        } else {
            message.error(msg, 2)

        }

    }



    render() {

        const dataSource = this.state.categoryList;
        

        const columns = [
            {
                title: '分类名称',

                dataIndex: 'name',
            },
            {
                title: '操作',
                render: (item) => { return <Button type="link" onClick={() => { this.showUpdata(item) }}>修改分类</Button> },
                width: "25%",
                align: "center"
            },

        ];
        let {modalCurrentValue} = this.state
        return (
            <div>
                <Modal
                    title={this.state.operType === "add" ? '新增分类' : "修改分类"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    
                    okText='确定'
                    cancelText='取消'
                    destroyOnClose={true}


                >
                    <Form
                        onFinish={this.onFinish}

                        name='form'
                        initialValues={{
                            categoryName:modalCurrentValue
                            
                        }}

                        ref={this.formRef}
                    >
                        <Form.Item
                            
                           
                            name="categoryName"
                            rules={[{ validator: this.checkPrice }]}
                        >
                            <Input placeholder={this.state.operType === 'add' ? '请输入类名' : ''} />
                        </Form.Item>
                    </Form>
                </Modal>

                <Card title="分类管理" extra={<Button type='primary' onClick={this.showAdd}><PlusCircleOutlined />添加</Button>}>

                    <Table
                        dataSource={dataSource}
                        columns={columns} bordered
                        rowKey='_id'
                        loading={this.state.isLoading}
                        pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}

                    />

                </Card>
            </div>
        )
    }
}