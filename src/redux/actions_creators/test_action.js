import {TEST1,TEST2} from "../action_types"



export const createDemo1Action = (value) => {
    return {type:TEST1,data:value}

}

export const createDemo2Action = (value) => {
    return {type:TEST2,data:value}

}