import {SAVE_PRODUCT_ITEM} from '../action_types'

let initState ={}
export default function (preState=initState,action) { 
    const {type,data} = action
    switch (type) {
        case SAVE_PRODUCT_ITEM:
            return data
            
    
        default:
            return preState 
    }

 }