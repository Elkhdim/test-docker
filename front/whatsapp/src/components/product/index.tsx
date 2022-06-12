import React from "react";
import { Col, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import SideBar from "../sidebar";
import AddProduct from "./AddProduct";
import GettAllProduct from "./GettAllProduct";
import UpdateProduct from "./UpdateProduct";

function Product() {
  return (
    <div>
      <Row>
        <Col>
          <SideBar />
        </Col>
        <Col>
          <Routes>
            <Route path="/products" element={<GettAllProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<UpdateProduct />} />

          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default Product;
