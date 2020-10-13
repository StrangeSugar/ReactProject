import React, { Component } from 'react'
import { Card, Form, Button, Input,Select, Upload, Modal, message} from 'antd'
import { ArrowLeftOutlined, PlusOutlined} from '@ant-design/icons'
import {reqCategoryList} from '../../api'
const { Option } = Select
export default class AddUpadate extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }
        ],
        categoryList:[]

    }
    componentDidMount(){
        this.getCategoryList()

    }

    onFinish = (value)=>{
       console.log(value)
    }
    getCategoryList = async()=>{
        let result = await reqCategoryList()
        const {status,data} = result
        if(status===0){
            this.setState({categoryList:data})
            console.log(data)
        }else{
            message.error('获取商品列表失败')
        }
    }
    getBase64=(file)=> {
        return new Promise((resolve, reject) => {
            
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    goBack = () => {

    }
    render() {
        
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div >
                <Card
                    title={
                        <div>

                            {this.props.match.params.id ? '商品修改' : '商品添加'}
                        </div>
                    }
                    extra={
                        <Button type='primary' onClick={() => {
                            this.props.history.push("/admin/prod_about/product")
                        }} ><ArrowLeftOutlined />返回</Button>
                    }
                >
                    {this.props.match.params.id}
                    <Form 
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="商品名称："
                            name="productName"
                            rules={[{ required: true, message: '内容不能为空' }]}
                        >
                            <Input style={{ width: "300px" }} placeholder="商品名称"></Input>
                        </Form.Item>
                        <Form.Item
                            label="商品描述："
                            name="productDesc"
                            rules={[{ required: true, message: '内容不能为空' }]}>
                            <Input style={{ width: "300px" }} placeholder="商品描述"></Input>
                        </Form.Item>
                        <Form.Item
                            label="商品价格："
                            name="productPrice"
                            
                            rules={[{ required: true, message: '内容不能为空' }]}>
                                
                            <Input prefix='￥'  addonAfter="元" type='number' min={0} placeholder="商品价格" style={{ width: "300px" }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="商品分类："
                            name="categoryId"
                            rules={[{ required: true, message: '请选择分类' }]}
                            initialValue=''
                        >
                            <Select style={{ width: "300px" }}>
                                <Option value=''>请选择分类</Option>
                                {this.state.categoryList.map((item)=>{
                                   return  <Option key={item._id} value={item._id}>{item.name}</Option>
                                })}

                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="商品图片："
                           
                        >
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={this.handleCancel}
                            >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </Form.Item>
                        <Form.Item
                            label="商品描述："
                            >

                        </Form.Item>
                        
                        <Form.Item> <Button type='primary' htmlType='submit'>添加</Button></Form.Item>
                    </Form>
                   
                </Card>
            </div>
        )
    }
}