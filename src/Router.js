import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { NavBar } from "./Components/NavBar/NavBar";
import { Order } from "./Pages/Order/Order";
import { Config } from "./Config/Config";
import { OrderView } from "./Pages/View/OrderView";
import { ProductView } from "./Pages/View/ProductView";
import { AddProduct } from "./Pages/Crud/AddProduct";
import Product from "./Pages/Product/Product";
import { EditProduct } from "./Pages/Crud/EditProduct";
import { Loading } from "./Components/Loading/Loading";

export function Router() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product" element={<Product />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/edit_product/:id" element={<EditProduct />} />
        <Route path="/order_view/:id" element={<OrderView />} />
        <Route path="/product_view/:id" element={<ProductView />} />
      </Routes>
      <Config />
      <Loading />
    </>
  );
}
