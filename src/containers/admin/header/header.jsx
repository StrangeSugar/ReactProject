import React,{Component} from 'react'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import screenfull from 'screenfull'
import './css/header.less'

export default class Header extends Component {
    state = {
        isFull:false
    }
    componentDidMount(){
        if (screenfull.isEnabled) {
            screenfull.on('change',()=>{
                let newState = !this.state.isFull
            this.setState({isFull:newState})

            })
     
        }
        
    }
    fullScreen = () => {
        
        if (screenfull.isEnabled) {
            screenfull.toggle()
     
        }
        
    }

    render() {
        return (
            <header className='header'>

                <div className = 'header-top'>
                <Button size='small' onClick={this.fullScreen}>
                    {/* 这个地方不能写if  但是可以写三目运算  用于随着状态的改变来改变需要显示的组件 */}
                    {this.state.isFull ?  <FullscreenExitOutlined/>:<FullscreenOutlined/> }
                   
                </Button>  
                
                
                    <span className='username'>欢迎佩奇</span>
                    <Button type="link" >退出登录</Button>

                </div>
                <div className = 'header-bottom'>
                    <div className='header-bottom-left'>
                        <span>主页</span>

                    </div>
                    <div className='header-bottom-right'>
                        <span>2019-11-16   11:50:56</span>
                        
                        <span>晴</span><span>温度: 2~5</span>
                        <img src = '' alt='天气信息'></img>



                    </div>
                    
                </div>
            </header>
        )
    }
}