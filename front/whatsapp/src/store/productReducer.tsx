const initState = {
 
    products:null
}
const productReducer=(state=initState,action:any)=>{
    switch(action.type) {
       
        case 'All_PRODUCT':
            return {
                ...state,
                products:action.products
        
            }
        case 'CLEAR_PRODUCT' : 
            return  initState 
        default:
            return state
    }
}

export default productReducer
