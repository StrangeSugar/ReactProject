import {INCREMENT,DECREMENT} from "../action_types"

//创建同步的action，用于增加
export const createIncrementAction = value => ({type:INCREMENT,data:value*1})
//创建同步的action，用于减少
export  const createDecrementAction = value => ({type:DECREMENT,data:value*1})
//创建一个异步的action 用于增加
export  const createIncrementAsyncAction =( value,delay) => {
    return (dispatch)=>{
        setTimeout(()=>{
        dispatch(createIncrementAction(value))
    },delay)
       
    }
   
}


 