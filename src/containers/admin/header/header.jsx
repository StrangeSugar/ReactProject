import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FullscreenOutlined, FullscreenExitOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import dayjs from 'dayjs'
import screenfull from 'screenfull'
import {withRouter} from "react-router-dom"
import './css/header.less'
import { createDeleteuserInfoAction } from '../../../redux/actions_creators/login_action'
import {reqWeather} from '../../../api'
import menuList from '../../../config/menu_config'


//在非路由组件中，要使用路由组件的api

@connect((state) => ({ 
    userInfo: state.userInfo ,
    saveTitle:state.saveTitle

}), {
    deleteuserInfo: createDeleteuserInfoAction
})
@withRouter
class Header extends Component {
    state = {
        //控制是否全屏
        isFull: false,
        //退出登录的控制弹窗的状态
        visible: false,
        //控制时间
        date:dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'),
        //天气状态
        weatherInfo:{},
        //主题标签名
        title:""

    } 
    getWeather=  async() =>{
       
            
            // reqWeather((err,data)=>{

                
            //     console.log(data)
            //     this.setState({weatherInfo:data.results[0].weather_data[0]})
            //     console.log(this.state)
            // })
           let result = await reqWeather()
           
           this.setState({weatherInfo:result})
        

        

    }
    
    componentDidMount() {
        
        
       //是否全屏
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                let newState = !this.state.isFull
                this.setState({ isFull: newState })

            })

        }
       this.timeID = setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
        },1000)
        this.getWeather()
        this.getTitle()
        
        
        
    }
    
    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    
    logOut = () => {
        this.props.deleteuserInfo()

    }
    fullScreen = () => {

        if (screenfull.isEnabled) {
            screenfull.toggle()

        }

    }
    getTitle = () =>{
        
        let title = this.props.location.pathname.indexOf('product')!==-1 ? "product":this.props.location.pathname.split('/').reverse()[0]
       
        menuList.forEach((item)=>{
            if(item.children&&item.children instanceof Array ){
                
                item.children.forEach((childrenItem)=>{
                    if(childrenItem.key===title){   
                        title = childrenItem.title
                        
                    }

                })
            }else{
                if(item.key===title){
                    title = item.title
                }
            }

        })
       
        
       
        this.setState({title})


    }
  
  




    render() {
        
        let {weather,dayPictureUrl,temperature} = this.state.weatherInfo
        
      
        return (
            <header className='header'>

                <div className='header-top'>
                    <Button size='small' onClick={this.fullScreen}>
                        {/* 这个地方不能写if  但是可以写三目运算  用于随着状态的改变来改变需要显示的组件 */}
                        {this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}

                    </Button>


                    <span className='username'>欢迎：{this.props.userInfo.user.username}</span>

                    <Button type="link" onClick={() => {
                        this.setState({
                            visible: true,
                        });

                    }}>
                        退出登录
                    </Button>
                    <Modal
                        cancelText='取消'
                        okText='确认'
                        title={<QuestionCircleOutlined style={{ color: 'orange', fontSize: "25px" }} />}

                        visible={this.state.visible}
                        onOk={e => {

                            this.setState({
                                visible: false,
                            });
                            this.logOut()
                        }}
                        onCancel={e => {

                            this.setState({
                                visible: false,
                            });
                        }}
                    >
                        <p style={{ textAlign: "center", fontSize: "20px" }}>确认退出登录吗？</p>
                    </Modal>


                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                    <span>{this.props.saveTitle?this.props.saveTitle:this.state.title}</span>

                    </div>
                    <div className='header-bottom-right'>
                    <span>{this.state.date}</span>
                    <img src={dayPictureUrl} style={{width:"35px",height:"25px"}} alt='天气信息'></img>


                    <span>{weather}</span><span>气温：{temperature}</span>
                       

 
                    </div>

                </div> 
            </header>
        )
    }
}
export default Header