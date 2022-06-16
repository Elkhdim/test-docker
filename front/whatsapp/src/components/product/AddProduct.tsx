import { EntityId } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import URL from "../../config";
function AddProduct(props: any) {
  console.log("url: ", URL);
  const id_User = props.user._id;
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
  });
  const onFileChange = (fileChangeEvent: any) => {
    const img = fileChangeEvent.target.files[0];
    setFormValue({
      ...formValue,
      image: img,
    });
    console.log("image: ", Image);
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (ev: any) => {
    ev.preventDefault();

    let formData = new FormData();

    formData.append("id_User", id_User);
    formData.append("name", formValue.name);
    formData.append("price", formValue.price);
    formData.append("quantity", formValue.quantity);
    formData.append("image", formValue.image);

    axios
      .post(`${URL}/api/product/add/${id_User}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("res: ", response);
        props.SAVE_PRODUCT(
          [response.data]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nom: </Form.Label>

        <Form.Control
          type="text"
          name="name"
          onChange={handleChange}
          placeholder=""
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Prix: </Form.Label>
        <Form.Control
          name="price"
          onChange={handleChange}
          type="number"
          placeholder=""
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantité: </Form.Label>

        <Form.Control
          type="number"
          name="quantity"
          onChange={handleChange}
          placeholder=""
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image: </Form.Label>
        <Form.Control onChange={onFileChange} name="file" type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    SAVE_PRODUCT: (products:any) => {
      dispatch({
        type: "All_PRODUCT_USER",
        products:products
      });
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddProduct);
