const initState = {
 
    products:[],
    all_products:[]
}
const productReducer=(state=initState,action:any)=>{
    switch(action.type) {
       
        case 'All_PRODUCT_USER':
            return {
                ...state,
                products:action.products
        
            }
        case 'ALL_PRODUCTS':
            return {
                ...state,
                all_products:action.all_products
            }
        case 'CLEAR_PRODUCT' : 
            return  initState 
        default:
            return state
    }
}

export default productReducer
