import React, { Component } from 'react'
import { Card, Button, List, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { reqProductIdCategoryName } from '../../api'
import './css/detail.less'
@connect((state) => ({
    productItem: state.saveProductItem
}))
class Detail extends Component {
    state = {
        isLoading: true,
        categoryName: '',
        imgs:[]
    }
    componentDidMount() {
        
        
        this.getProductIdCategoryName()
    }
    getProductIdCategoryName = async () => {

        
        let result = await reqProductIdCategoryName(this.props.productItem.categoryId)
        this.resultRender(result)
    }
    resultRender = (result) => {
        console.log(result)
        this.setState({ isLoading: false })


        let { data, status } = result


        if (status === 0) {
            if (data) {
                const { name  } = data

                this.setState({ categoryName: name })
                this.setState({imgs:this.props.productItem.imgs})

            } 

        } else {
            message.error('分类名获取失败')


        }

    }
    render() {
        
        let product = this.props.productItem
        
       
      
        

        return (
            <div>
                <Card

                    title="商品详情"
                    extra={
                        <Button type='primary' onClick={() => {
                            this.props.history.push("/admin/prod_about/product")
                        }} ><ArrowLeftOutlined />返回</Button>
                    }
                    loading={this.state.isLoading} 
                >

                    <List
                        bordered
                    >
                        <List.Item><span className='prod-name'>商品名称：{product.name}</span><span></span></List.Item>
                        <List.Item><span className='prod-desc'>商品描述：{product.desc}</span><span></span></List.Item>
                        <List.Item><span className='prod-price'>商品价格：{product.price}</span><span></span></List.Item>
                        <List.Item><span className='prod-cate'>所属分类：{this.state.categoryName}</span><span></span></List.Item>
                        <List.Item><span className='prod-img'>商品图片：{this.state.imgs.map((item)=>{
                           return <img key={item} src={`/upload/`+item} alt='商品图片' />
                        })}</span></List.Item>
                        <List.Item>商品详情：<span dangerouslySetInnerHTML={{__html:product.detail}} ></span></List.Item>
                        {/* <List.Item><span className='prod-'></span><span>商品描述</span>{product.desc}</List.Item> */}

                    </List>



                </Card>
            </div>
        )
    }
}
export default Detail