import { TEST1, TEST2 } from '../action_types'


let initState = ''
export default function test(preState = initState, action) {
    
    let newState = ''

    let { type, data } = action

    switch (type) {
        case TEST1:
            newState = preState + data+"!"
            return newState

           
        case TEST2:
            newState = preState + data+"!"
            return newState

            

        default:
            return preState

           
    }



}