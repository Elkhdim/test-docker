import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'

 function AllProduct(props:any) {
console.log("props: ",props)
const [name,setName]=useState("")
const idUser=props.user._id
const all_product=()=>{///all/:id
    return axios.get(`http://localhost:3010/api/product/all/${idUser}`).then(res=>{
        props.ALL_PROD(res.data)
    })
}
  const search_product=()=>{
    return axios.post('http://localhost:3010/api/product/search',{
      name:name
    }).then(res=>{

      props.ALL_PROD(res.data)
    })
  }
  const handleChange =  (event:any) => {

    setName(event.target.value)
    //search_product()
    };
useEffect(()=>{
    all_product()
  //  search_product()
},[name])

const show_product= props.allprod !== undefined || props.allprod.length >0  ?
props.allprod.map((item:any,index:any)=>{
  return <div key={index} className="card">
        <img className="card-img-top" src={`http://localhost:3010/${item.image}`} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <h3>{item.price}</h3>
          <h3>{item.quantity}</h3>
          <Button >Message</Button>
        </div>
      </div>
}):<></>
  return (
    <div>
        <Form.Control type="text" name='name' onChange={(ev:any)=>handleChange(ev)} placeholder="Search" />
   
        {show_product}
        </div>
  )
}

const mapStateToProps=(state:any)=>{
    return {
        allprod:state.prod.all_products,
        user:state.auth.user
    }
}
const mapDispatchToProps=(dispatch:any)=>{
    return {
        ALL_PROD:(products:any)=>{
            dispatch({
                type:'ALL_PRODUCTS',
                all_products:products
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllProduct)