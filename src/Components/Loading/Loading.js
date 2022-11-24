import React from "react";
import "./Loading.css";
import { useSelector } from "react-redux";

export function Loading() {
  const loading = useSelector((state) => state.loading);
  const upload = useSelector((state) => state.upload);

    if (upload) {
      document.querySelector("body").style.position = "fixed";
    } else if (loading) {
      document.querySelector("body").style.position = "fixed";
    } else {
      document.querySelector("body").style.position = "";
    }
  return (
    <section
      className="loading"
      style={
        loading
          ? { display: "flex" }
          : { display: "none" } && upload.start
          ? { display: "flex" }
          : { display: "none" }
      }
    >
      <div
        className="lds-spinner"
        style={loading ? { display: "flex" } : { display: "none" }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <progress
        style={upload.start ? { display: "flex" } : { display: "none" }}
        value={upload.yuklandi}
        max={upload.jami}
      >
      </progress>
    </section>
  );
}
