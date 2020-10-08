import {SAVE_TITLE} from '../action_types'
//导航栏title 保存
export const createSaveTitleAction = (value)=> {
    return {type:SAVE_TITLE,data:value}

}