import Counter from '../components/counter'

import {connect} from 'react-redux'
import {createIncrementAction,createDecrementAction,createIncrementAsyncAction} from '../redux/actions/counter_action'
// function mapStateToProps(state){
//     return {count:state}
// }
// function mapDispatchToProps(dispatch){
    
//     return {increment:(value)=>{dispatch(createIncrementAction(value))},
//     decrement:(value)=>{dispatch(createDecrementAction(value))}}
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Counter)



// export default connect((state)=>{
//     console.log(this)
//     return {count:state}},(dispatch)=>{
//     console.log(this)
//     return {increment:(value)=>{dispatch(createIncrementAction(value))},
//     decrement:(value)=>{dispatch(createDecrementAction(value))}}


// })(Counter)  




export default connect(
    state=>({count:state}),
    {
        increment:createIncrementAction,
        decrement:createDecrementAction,
        incrementAsync:createIncrementAsyncAction,

    }


)(Counter)  