import React from "react";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Link, Route, Routes } from "react-router-dom";
import Product from "../product";
import AddProduct from "../product/AddProduct";

function SideBar() {
  return (
    <div>
        <ul>
            <li><Link to='/products' >Acceuil</Link></li>
            <li><Link to='/add' >Ajouter</Link></li>
            <li><Link to='/update' >Modifier</Link></li>

        </ul>
      
     
    </div>
  );
}
export default SideBar;
