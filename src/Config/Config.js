import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acProduct } from "../Redux/Product";
import { acMoreSeen } from "../Redux/MoreSeen";
import { acOrder } from "../Redux/Order";
import { acGuest } from "../Redux/Guest";
import { acLoading } from "../Redux/Loading";

export function Config() {
  const dispatch = useDispatch();

  const relodeProduct = useSelector((state) => state.relodeProduct);

  useEffect(() => {
    dispatch(acLoading(true));
    axios
      .get("https://honey.pandashop.uz/product/view", {
        headers: {
          token: "token",
        },
      })
      .then((res) => {
        dispatch(acProduct(res.data));
        dispatch(acLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(acLoading(false));
      });
  }, [dispatch, relodeProduct]);

  useEffect(() => {
    dispatch(acLoading(true));

    axios
      .get("https://honey.pandashop.uz/order/view", {
        headers: {
          token: "token",
        },
      })
      .then((res) => {
        dispatch(acOrder(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(acLoading(true));
      });
  }, [dispatch, relodeProduct]);

  useEffect(() => {
    dispatch(acLoading(true));

    axios
      .get("https://honey.pandashop.uz/product/mostviewed", {
        headers: {
          token: "token",
        },
      })
      .then((res) => {
        dispatch(acMoreSeen(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(acLoading(true));
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(acLoading(true));
    axios(`https://honey.pandashop.uz/guest/view/10`)
      .then((res) => {
        dispatch(acGuest(res.data));
        dispatch(acLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(acLoading(false));
      });
  }, [dispatch, relodeProduct]);

  return null;
}
