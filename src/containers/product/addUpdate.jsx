import React,{Component} from 'react'
import {Card,Form,Button} from 'antd'
import { ArrowLeftOutlined} from '@ant-design/icons'
export default class AddUpadate extends Component {
    goBack= ()=>{
       
    }
    render() {
        return (
            <div >
                <Card
                    title={ 
                        <div>
                            
                            {this.props.match.params.id ?'商品修改':'商品添加'}
                        </div>
                    }
                    extra={
                        <Button type='primary' onClick={()=>{
                           this.props.history.push("/admin/prod_about/product")
                        }} ><ArrowLeftOutlined />返回</Button>
                    }
                >
                    {this.props.match.params.id}
                    <Form>

                    </Form>
                </Card>
            </div>
        )
    }
}