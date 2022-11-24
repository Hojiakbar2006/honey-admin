import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import trash from "../../Assets/Images/trash.svg";
import addIcon from "../../Assets/Images/Add Img.svg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { acLoading } from "../../Redux/Loading";
import { acRelodeProduct } from "../../Redux/Product";

export function AddProduct() {
  const [imagesData, setImagesData] = useState([]);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    about: "",
    price: "",
    territory: "",
    weight: "",
  });

  const newproduct = JSON.stringify(product);
  const dispatch = useDispatch();

  return (
    <section id="crudContainer">
      <form
        onSubmit={(e) => {
          dispatch(acLoading(true));
          e.preventDefault();
          const formData = new FormData();

          for (let i = 0; images.length > i; i++) {
            formData.append("img", images[i]);
          }
          formData.append("data", newproduct);

          axios("https://honey.pandashop.uz/product/add", {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          })
            .then((res) => {
              toast(res.data.message);
              dispatch(acLoading(false));
              dispatch(acRelodeProduct());
            })
            .catch((err) => {
              dispatch(acRelodeProduct());
              toast(err.reponse.message);
            });
          setProduct({
            name: "",
            about: "",
            price: "",
            territory: "",
            weight: "",
          });
          setImages([]);
          setImagesData([]);
        }}
      >
        <input
          placeholder="Nomi"
          type="text"
          name="name"
          value={product.name}
          onChange={(e) => {
            setProduct({ ...product, name: e.target.value });
          }}
        />
        <input
          placeholder="Narxi"
          type="number"
          name="price"
          value={product.price}
          onChange={(e) => {
            setProduct({ ...product, price: e.target.value });
          }}
        />
        <input
          placeholder="Xududi"
          type="text"
          name="territory"
          value={product.territory}
          onChange={(e) => {
            setProduct({ ...product, territory: e.target.value });
          }}
        />
        <input
          placeholder="Weight"
          type="text"
          name="weight"
          value={product.weight}
          onChange={(e) => {
            setProduct({ ...product, weight: e.target.value });
          }}
        />
        <div>
          <div>
            {imagesData.map((img, index) => {
              return (
                <figure className="mapImgCard" key={index} id="figure">
                  <button
                    type="button"
                    className="trashBtn"
                    onClick={() => {
                      setImagesData(
                        imagesData.filter((item, i) => i !== index)
                      );
                    }}
                  >
                    <img src={trash} alt="trash" />
                  </button>
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </figure>
              );
            })}
          </div>
          <label
            className="card"
            style={imagesData.length === 4 ? { display: "none" } : {}}
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple="multiple"
              onChange={(e) => {
                setImages([...images, ...e.target.files]);
                const MyFiles = [...imagesData];
                for (let i = 0; i < e.target.files.length; i++) {
                  if (MyFiles.length < 4) {
                    MyFiles.push(e.target.files[i]);
                  } else {
                    MyFiles.splice(0, 1);
                    MyFiles.push(e.target.files[i]);
                  }
                }
                setImagesData(MyFiles);
              }}
            />
            <img src={addIcon} alt="" />
          </label>
        </div>
        <textarea
          placeholder="Message"
          name="about"
          value={product.about}
          onChange={(e) => {
            setProduct({ ...product, about: e.target.value });
          }}
        />
        <input type="submit" value="Maxsulotni Qo'shish" />
      </form>
    </section>
  );
}
