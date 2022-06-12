import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";

function GettAllProduct(props: any) {
 // console.log("ppp: ", props);
  const [search,setSearch]=useState('')
  const [name,setName]=useState("")
console.log("sss: ",search)
console.log("name: ",name)

  const userId=props.user._id
  // const search_product=()=>{
  //   return axios.post('http://localhost:3010/api/product/search',{
  //     name:name
  //   }).then(res=>{
  //     console.log("dd: ",res.data)
  //     setSearch(res.data)
  //   })
  // }
  const get_all_products=()=>{
    return axios.get(`http://localhost:3010/api/product/${userId}`).then(res=>{
        props.SAVE_PRODUCT(res.data)
    })
  }
  useEffect(()=>{
    get_all_products()
  },[])
  const handleChange =  (event:any) => {
    // const { name, value } = event.target;
    // setName((prevState:any) => {
    //   return {
    //     ...prevState,
    //     [name]: value,
    //   };
    // });
   // search_product()
  // setName(event.target.value)
  // search_product()
  };
const show_product=props.prod!==undefined || props.prod.length>0?
props.prod.map((item:any,key:any)=>{
  return <div className="card">
        <img className="card-img-top" src={`http://localhost:3010/${item.image}`} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <h3>{item.price}</h3>
          <h3>{item.quantity}</h3>
          <a href="#" className="btn btn-danger">
            Delete
          </a>
        </div>
      </div>
}):<></>

//const show=search !== ""?

  return (
    <div>
      <div>
      <Form.Control type="text" name='name' onChange={handleChange} placeholder="Search" />
   
      </div>
      {show_product}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    prod: state.prod.products,
    user:state.auth.user
  };
};

const mapDispatchToProps=(dispatch:any)=>{
  return {
    SAVE_PRODUCT:(products:any)=>{
      dispatch({
        type:"All_PRODUCT",
        products:products
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(GettAllProduct);
