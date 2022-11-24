import React, { useState, useEffect } from "react";
import trash from "../../Assets/Images/trash.svg";
import addIcon from "../../Assets/Images/Add Img.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { acLoading, acUpload } from "../../Redux/Loading";

export function EditProduct() {
  const [imagesData, setImagesData] = useState([]);
  const [reload, setReload] = useState(false);
  const [images, setImages] = useState([]);
  const [imageDelete, setImageDelete] = useState([]);
  const [product, setProduct] = useState({});

  const Location = useLocation();
  const id = Location.pathname.split("/").pop();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acLoading(true));
    axios
      .get(`https://honey.pandashop.uz/product/view/${id}`, {
        headers: {
          token: "token",
        },
      })
      .then((res) => {
        toast(res.data.message);
        setProduct(res.data);
        setImagesData(res.data.img || []);
        setImages(res.data.img || []);
        dispatch(acLoading(false));
      })
      .catch((err) => {
        toast(err.response.message);
        dispatch(acLoading(false));
      });
  }, [id, reload, dispatch]);

  function updateImg() {
    const formData = new FormData();
    const newImgArr = [...images];
    const deleteImg = [imageDelete]; // img url

    for (let i = 0; i < newImgArr.length; i++) {
      formData.append("img", newImgArr[i]);
    }
    formData.append("data", JSON.stringify({ delete: [...deleteImg] }));

    axios(`https://honey.pandashop.uz/product/update/img/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        token: "Admin tokeni",
      },
      data: formData,
      onUploadProgress: (e) => {
        dispatch(
          acUpload({
            jami: e.total,
            yuklandi: e.loaded,
            start: e.total !== e.loaded,
          })
        );
        console.log(e.total !== e.loaded);
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(acUpload({ jami: 0, yuklandi: 0, start: false }));
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch(acUpload({ jami: 0, yuklandi: 0, start: false }));
      });
  }
  const data = product;
  return (
    <section id="crudContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios(`https://honey.pandashop.uz//product/update/text`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: "Admin tokeni",
            },
            data,
          })
            .then((res) => {
              toast(res.data.message);
              setReload(!reload);
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
          updateImg();
        }}
      >
        <input
          placeholder="Nomi"
          type="text"
          name="name"
          value={product.name || ""}
          onChange={(e) => {
            setProduct({ ...product, name: e.target.value });
          }}
        />
        <input
          placeholder="Narxi"
          type="number"
          name="price"
          value={product.price || ""}
          onChange={(e) => {
            setProduct({ ...product, price: e.target.value });
          }}
        />
        <input
          placeholder="Xududi"
          type="text"
          name="territory"
          value={product.territory || ""}
          onChange={(e) => {
            setProduct({ ...product, territory: e.target.value });
          }}
        />
        <input
          placeholder="Weight"
          type="text"
          name="weight"
          value={product.weight || ""}
          onChange={(e) => {
            setProduct({ ...product, weight: e.target.value });
          }}
        />
        <div>
          {imagesData.map((img, index) => {
            return (
              <figure className="mapImgCard" key={index} id="figure">
                <button
                  type="button"
                  className="trashBtn"
                  onClick={() => {
                    setImagesData(imagesData.filter((img, i) => i !== index));
                    setImageDelete(img.img);
                  }}
                >
                  <img src={trash} alt="trash" />
                </button>
                <img src={img} alt={img} />
              </figure>
            );
          })}
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
                    MyFiles.push(URL.createObjectURL(e.target.files[i]));
                  } else {
                    MyFiles.splice(0, 1);
                    MyFiles.push(URL.createObjectURL(e.target.files[i]));
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
          value={product.about || ""}
          onChange={(e) => {
            setProduct({ ...product, about: e.target.value });
          }}
        />
        <input type="submit" value="Maxsulotni Taxrirlash" />
      </form>
    </section>
  );
}
