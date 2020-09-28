

let constState = 0;
export default function operaCount(preState = constState, action) {
    console.log("reducer", action)
    const { type, data } = action
    let newState
    switch (type) {
        
        case "increment":
            return newState = preState + data

        case "decrement":
            return newState = preState - data
        case "incrementIfOdd":
            if (preState % 2 === 1) {
                return newState = preState + data
            }else
            return preState
        case "incrementAsync":
             return newState = preState + data
            
           

        default:
            return preState

    }

}   