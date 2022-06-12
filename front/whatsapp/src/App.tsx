import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Product from "./components/product";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

function App(props: any) {
  const { token, user } = props;
  console.log("token: ", token);
  console.log("user: ", user);
  return (
    <Container>
      {token ? (
        <Product />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(App);
