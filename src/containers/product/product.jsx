import React, { Component } from 'react'
import { Card, Button, Select,  Input, Table, message } from 'antd';
import {connect} from 'react-redux'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import './css/product.less'
import { PAGE_SIZE } from '../../config'
import { reqProductList, reqProductSearch ,reqUpdateProduct } from '../../api'
import { INIT_PAGE } from '../../config'
import {createSaveProductItemAction} from '../../redux/actions_creators/detail_action' 

const { Option } = Select
const SELECT_NAME = "selectName"
const SELECT_DESC = "selectDesc"
@connect((state)=>{
   return state
},{
    saveProductItem:createSaveProductItemAction
})
class Product extends Component {
    state = {
        productLsit: [],//商品分页列表
        total: "",//商品总量
        isLoading:true,//加载中效果
        pageNum:1,//默认第1页
        pageSize:5,//默认每页5条数据
        selectType:'selectName',//搜索类型
    }
   
    
    componentDidMount() {
        this.getProductLsit(INIT_PAGE, PAGE_SIZE)

    }
    //发送请求获取商品分页列表
    getProductLsit = async (pageNum, pageSize) => {
        this.setState({isLoading:true})
        
        let result = await reqProductList(pageNum, pageSize)
        
        this.resultRender(result)

    }
    //翻页的操作 分页器的onChange 回调
    paginationOnChange = (page, pageSize) => {
        this.setState({isLoading:true})

        this.getProductLsit(page, pageSize)

    }
    //

    //搜索的操作
    search = async () => {
        this.setState({isLoading:true})
        const {selectType,inputValue } = this.state
       console.log(selectType,inputValue )
       

        let productName = ''
        let productDesc = ''
        if(inputValue===''){
            this.getProductLsit(INIT_PAGE, PAGE_SIZE)
        }else{
            if (selectType === SELECT_NAME) {
                productName = inputValue
                let result = await reqProductSearch(INIT_PAGE, PAGE_SIZE, productName, productDesc)
                console.log(result)
                this.resultRender(result)
    
            }
            if (selectType === SELECT_DESC) {
                productDesc = inputValue
                let result = await reqProductSearch(INIT_PAGE, PAGE_SIZE, productName, productDesc)
                console.log(result)
                this.resultRender(result)
            }
           
            
        }
        


    }
    
    //上下架操作
    statusChange =async(product)=>{
        this.setState({isLoading:true})
        let {_id,status} = product
        
        if(status===1){
            status=2
            let result = await reqUpdateProduct(_id,status)
            
            this.resultRender(result)
            
            return 
        }
        if(status===2){
            status=1
            let result = await reqUpdateProduct(_id,status)
            
            this.resultRender(result)
            return 
        }
        
    }
    //统一渲染操作
    resultRender= (result)=>{
        this.setState({isLoading:false})
       

        let { data, status} = result
        
        
        if (status === 0) {
            if(data){
                const { list,total,pageNum,pageSize} = data                
                this.setState({productLsit: list, total,pageNum,pageSize})    
                         
            }else{               
                
                this.getProductLsit(this.state.pageNum, this.state.pageSize)
                
            }
            
        } else {
            message.error('数据异常，请联系管理员')
            

        }
       
    }
    //详情查看操作
   
    //修改操作
    update =() =>{
       
    }
    selectType= (value)=>{
       this.setState({selectType:value})
    }
    input = (event)=>{
        this.setState({inputValue:event.target.value})
       
    }
    
    render() {


        const dataSource = this.state.productLsit


        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                width: "25%"
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
                width: "45%"

            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                align: 'center',
                render: (price) => {
                    price = "￥" + price
                    return price
                },
                width: "10%"
            },
            {
                title: '状态',
                key: 'status',
                align: 'center',
                render: (product) => {
                    return (
                        <div>
                            <Button type="primary" onClick={()=>{
                               this.statusChange(product)
                            }} style={
                               {backgroundColor:product.status===2 ? 'red':""}
                            }>{product.status === 1 ? '下架' : '上架'}</Button><br />
                            <span>{product.status === 1 ? '在售' : '已下架'}</span>
                        </div>
                    )
                },
                width: "10%"
            },
            {
                title: '操作',
                
                key: 'opera',
                width: "10%",
                align: 'center',
                render: (product) => {
                    return (
                        <div>
                          <Button type='link' onClick={()=>{
                              
                               this.props.saveProductItem(product)
                               this.props.history.push(`/admin/prod_about/product/detail/${product._id}`)
                            }}>详情</Button> <br />
                           <Button type='link' onClick={()=>{
                               this.update(product)
                               this.props.history.push(`/admin/prod_about/product/add_update/${product._id}`)
                            }} >修改</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <div className="product">
                <Card
                    title={
                        <div className="title">
                            <Select  defaultValue={SELECT_NAME} onChange={this.selectType}>
                                <Option value={SELECT_NAME}>按名称搜索</Option>
                                <Option value={SELECT_DESC}>按描述搜索</Option>
                            </Select>

                            <Input onChange={this.input} allowClear placeholder='关键字' style={{ width: "20%", margin: '0px 10px' }} />

                            <Button type='primary' onClick={
                                this.search
                            }><SearchOutlined />搜索</Button>
                        </div>

                    }
                    extra={
                       <Button type='primary' onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update`)}}><PlusCircleOutlined />添加商品</Button>
                    }
                >
                    <Table
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        pagination={{
                            defaultCurrent: 1,
                            defaultPageSize: PAGE_SIZE,
                            total: this.state.total,
                            onChange: this.paginationOnChange,
                            current:this.state.pageNum
                        }}
                        
                        rowKey='_id'
                        loading={this.state.isLoading}
                    />
                </Card>
            </div>
        )
    }
}
export default Product