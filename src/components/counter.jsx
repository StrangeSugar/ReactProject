import React, { Component } from 'react'




export default class Counter extends Component {
   
    componentDidMount(){
      
       console.log(this.props)
    }
    
    //加法
    increment = () => {
        let { value } = this.refs.selectNumber
        const {increment} = this.props
        increment(value)
        // this.store.dispatch(createIncrementAction(value))
        
    
        // this.setState({ count: count + value * 1 })
    }

    //减法
    decrement = () => {
        let { value } = this.refs.selectNumber
        const {decrement} = this.props
        decrement(value)
        // this.store.dispatch(createDecrementAction(value))
        // this.setState({ count: count - value * 1 })
    }

    incrementIfOdd = () => {
        let { value } = this.refs.selectNumber
        const {increment} = this.props
        
            increment(value)
        
       
        // let { count } = this.state
      // this.store.dispatch(createIncrementAsyncAction(value))
       
    }

    incrementAsync = () => {
        let { value } = this.refs.selectNumber
       
        
            const {incrementAsync} = this.props
            incrementAsync(value,1000)
        
    }

    render() {
        // let  count  = this.store.getState()
        let { count } = this.props.count
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