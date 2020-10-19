import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Form, Button, Input, Select, Upload, Modal, message } from 'antd'
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { reqCategoryList } from '../../api'
import { BASE_URL } from '../../config'
import { reqUploadRemoveImage, reqAddProduct ,reqUpdateProductItem} from '../../api'
import Editor from './rich_text_editor'

const { Option } = Select

@connect((state) => ({
    productItem: state.saveProductItem
}))
class AddUpadate extends Component {

    state = {
        RemoveImgs: [],
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        categoryList: [],
        imgs: [],
        name: '',
        productItem: {},
        operaType: 'add'



    }
    componentWillMount() {
        const { id } = this.props.match.params
        if (id) {
            this.setState({ operaType: 'update', productItem: this.props.productItem })

        }
        this.setState({ name: '1' })
        console.log(this.state.name)
    }
    componentDidMount() {
        console.log(this.state.name)
        let fileList = []
        if(this.state.operaType==='update'){
            this.state.productItem.imgs.forEach(item => {
                fileList.push({ uid: item, name: item, url: `${BASE_URL}/upload/` + item })
            })
            this.refs.editorValue.setValue(this.state.productItem.detail)
        }
        
        this.setState({ fileList, imgs: this.state.productItem.imgs })


        this.getCategoryList()
        


    }

    onFinish = async (product) => {
        console.log(product)
        product.price = parseInt(product.price)
        // console.log(this.refs)
        product.detail = this.refs.editorValue.getValue()
        product.pCategoryId = "0"
        product.imgs = this.state.imgs
        product._id = this.state.productItem._id


        let removeImgs = this.state.RemoveImgs
        removeImgs.forEach(async (item) => {
            let result = await reqUploadRemoveImage(item)
            const { status } = result
            if (status === 0) {
                console.log('删除了')
            } else {
                message.error("删除失败")
            }

        })

        if (this.state.operaType === 'add') {
            let result = await reqAddProduct(product)
            const { status,  msg } = result
            if (status === 0) {
                message.success('商品添加成功')
                this.props.history.replace('/admin/prod_about/product')
            } else {
                message.error(msg)
            }
        }else{
            console.log(product)
            let result = await reqUpdateProductItem(product)
            const { status,  msg } = result
            if (status === 0) {
               
                message.success('商品更新成功')
                this.props.history.replace('/admin/prod_about/product')
            } else {
                message.error(msg)
            }
        }






    }
    getCategoryList = async () => {

        let result = await reqCategoryList()
        const { status, data } = result
        if (status === 0) {

            this.setState({ categoryList: data })

        } else {
            message.error('获取商品列表失败')
        }
    }
    getBase64 = (file) => {
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
    onRemove = (file) => {
        //把要删除的图片先不提交，先记录
        let newRemoveImgs = [...this.state.RemoveImgs]
        newRemoveImgs.push(file.name)
        this.setState({ RemoveImgs: newRemoveImgs })

        //更新需要上传的图片名
        let newDelImgs = [...this.state.imgs]
        newDelImgs.splice(newDelImgs.findIndex((item) => {
            return item === file.name
        }), 1)
        this.setState({ imgs: newDelImgs })



    }

    handleChange = ({ file, fileList }) => {
        // console.log(file)
        if (file.status === "done") {
            if (file.response.status === 0) {
                message.success('图片上传成功')
                let newAddImgs = [...this.state.imgs]
                fileList[fileList.length - 1].url = file.response.data.url
                fileList[fileList.length - 1].name = file.response.data.name
                newAddImgs.push(file.response.data.name)
                this.setState({ imgs: newAddImgs })
            } else {
                message.error(file.response.msg)
            }


        }

        this.setState({ fileList });
    }

    goBack = () => {

    }
    render() {

        const { previewVisible, previewImage, fileList, previewTitle, operaType } = this.state;

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 10 }}>上传商品图片</div>
            </div>
        );
        return (
            <div >
                <Card
                    title={
                        <div>

                            {operaType === 'update' ? '商品修改' : '商品添加'}
                        </div>
                    }
                    extra={
                        <Button type='primary' onClick={() => {
                            this.props.history.push("/admin/prod_about/product")
                        }} ><ArrowLeftOutlined />返回</Button>
                    }
                >

                    <Form
                        onFinish={this.onFinish}
                        initialValues={this.state.productItem}
                    // initialValues={this.props.match.params.id ?this.props.productItem:{categoryId:""}}
                    >
                        <Form.Item
                            label="商品名称："
                            name="name"
                            rules={[{ required: true, message: '内容不能为空' }]}

                        >
                            <Input style={{ width: "300px" }} placeholder="商品名称"></Input>
                        </Form.Item>
                        <Form.Item
                            label="商品描述："
                            name="desc"
                            rules={[{ required: true, message: '内容不能为空' }]}>
                            <Input style={{ width: "300px" }} placeholder="商品描述"></Input>
                        </Form.Item>
                        <Form.Item
                            label="商品价格："
                            name="price"

                            rules={[{ required: true, message: '内容不能为空' }]}>

                            <Input prefix='￥' addonAfter="元" type='number' min={0} placeholder="商品价格" style={{ width: "300px" }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="商品分类："
                            name="categoryId"
                            rules={[{ required: true, message: '请选择分类' }]}

                        >
                            <Select style={{ width: "300px" }} >
                                <Option value=''>请选择分类</Option>
                                {this.state.categoryList.map((item) => {
                                    return <Option key={item._id} value={item._id} >{item.name}</Option>
                                })}

                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="商品图片："


                        >
                            <Upload
                                method='post'
                                name='image'
                                action={`${BASE_URL}/manage/img/upload`}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                onRemove={this.onRemove}
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
                            <Editor ref='editorValue' />

                        </Form.Item>

                        <Form.Item> <Button type='primary' htmlType='submit'>提交</Button></Form.Item>
                    </Form>

                </Card>
            </div>
        )
    }
}
export default AddUpadate