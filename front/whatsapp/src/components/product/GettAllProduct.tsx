import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

function GettAllProduct(props: any) {
  console.log("props2: ",props)

  const userId=props.user._id
  // const search_product=()=>{
  //   return axios.post('http://localhost:3010/api/product/search',{
  //     name:name
  //   }).then(res=>{

  //     props.SAVE_PRODUCT(res.data)
  //   })
  // }

  useEffect(()=>{
    const prod_user = async ()=>{
      await axios.get(`http://localhost:3010/api/product/${userId}`).then((res:any)=>{
      console.log("hghgh: ",res.data)
        props.SAVE_PRODUCT(res.data)
    })
  }
   prod_user()
   // search_product() name
  },[])

const show_product= props.prod !== undefined || props.prod.length >0  ?
props.prod.map((item:any,index:any)=>{
  return <div key={index} className="card">
        <img className="card-img-top" src={`http://localhost:3010/${item.image}`} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <h3>{item.price}</h3>
          <h3>{item.quantity}</h3>
          <Button >Modifier</Button>
        </div>
      </div>
}):<></>


  return (
    <div>
      <div>

      </div>
      {
      show_product
      }
    </div>
  );
}

const mapStateToProps = (state: any) => {
  console.log("vv: ",state.prod)
  return {
    prod: state.prod.products,
    user:state.auth.user
  };
};

const mapDispatchToProps=(dispatch:any)=>{
  return {
    SAVE_PRODUCT:(products:any)=>{
      dispatch({
        type:"All_PRODUCT_USER",
        products:products
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(GettAllProduct);
