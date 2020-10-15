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
    product = JSON.parse(localStorage.getItem('product'))
    state = {
        isLoading: true,
        categoryName: '',
        
    }
    
    componentDidMount() {
        
        
        this.getProductIdCategoryName()
    }
    getLocalStorage = ()=>{
       
        
    }
    getProductIdCategoryName = async () => {

        
        let result = await reqProductIdCategoryName(this.product.categoryId)
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
                

            } 

        } else {
            message.error('分类名获取失败')


        }

    }
    render() {
        
        
        
       
      
        

        return (
            <div>
                <Card

                    title="商品详情"
                    extra={
                        <Button type='primary' onClick={() => {
                            this.props.history.push("/admin/prod_about/product")
                            localStorage.removeItem('product')
                        }} ><ArrowLeftOutlined />返回</Button>
                    }
                    
                >

                    <List
                        loading={this.state.isLoading} 
                        bordered
                    >
                        <List.Item><span className='prod-name'>商品名称：{this.product.name}</span><span></span></List.Item>
                        <List.Item><span className='prod-desc'>商品描述：{this.product.desc}</span><span></span></List.Item>
                        <List.Item><span className='prod-price'>商品价格：{this.product.price+' 元'}</span><span></span></List.Item>
                        <List.Item><span className='prod-cate'>所属分类：{this.state.categoryName}</span><span></span></List.Item>
                        <List.Item><span className='prod-img'>商品图片：{this.product.imgs.map((item)=>{
                           return <img key={item} src={`/upload/`+item} alt='商品图片' />
                        })}</span></List.Item>
                        <List.Item>商品详情：<span dangerouslySetInnerHTML={{__html:this.product.detail}} ></span></List.Item>
                        {/* <List.Item><span className='prod-'></span><span>商品描述</span>{product.desc}</List.Item> */}

                    </List>



                </Card>
            </div>
        )
    }
}
export default Detail