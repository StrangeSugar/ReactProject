import {SAVE_TITLE} from '../action_types'

let initTitle = ''
export default function (preState=initTitle,action) {
    
    let {data,type} = action
    
    switch (type) {
        case SAVE_TITLE:
            
            
            return data

            
    
        default:

           return preState
    }
}