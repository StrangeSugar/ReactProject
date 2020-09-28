import React, { Component } from 'react'

export default class Hello extends Component {
    store = this.props.store
    componentDidMount(){
        console.log(this.store.getState())
       
    }
    
    //加法
    increment = () => {
        let { value } = this.refs.selectNumber
        
        this.store.dispatch({type:"increment",data:value*1})
        
    
        // this.setState({ count: count + value * 1 })
    }

    //减法
    decrement = () => {
        let { value } = this.refs.selectNumber
        this.store.dispatch({type:"decrement",data:value*1})
        // this.setState({ count: count - value * 1 })
    }

    incrementIfOdd = () => {
        let { value } = this.refs.selectNumber
        this.store.dispatch({type:"incrementIfOdd",data:value*1})
        // let { count } = this.state
        // if (count % 2 === 1) {
        //     // this.setState({ count: count + value * 1 })
        // }
    }

    incrementAsync = () => {
        let { value } = this.refs.selectNumber
       
        setTimeout(() => {
            this.store.dispatch({type:"incrementAsync",data:value*1})
        }, 1000)
    }

    render() {
        let  count  = this.store.getState()
        // let { count } = this.state
        return (
            <div>
                <h3>当前计数为{count}</h3>
                <select ref="selectNumber">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>&nbsp;
            </div>
        )
    }
}