import  {SAVE_PRODUCT_ITEM} from '../action_types'
//保存需要显示详情的商品

export const createSaveProductItemAction =(value)=>{
  
   localStorage.removeItem('product')
   
   localStorage.setItem('product',JSON.stringify(value))
   return ({type:SAVE_PRODUCT_ITEM,data:value})
}