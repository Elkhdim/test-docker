import React from 'react'
import { connect } from 'react-redux'

function UpdateProduct(props:any) {
    console.log("prrrrrr: ",props)
  return (
    <div>UpdateProduct</div>
  )
}
const mapStateToProps=(state:any)=>{
    return {
        prod:state.prod.all_products
    }
}
export default connect(mapStateToProps)(UpdateProduct) 