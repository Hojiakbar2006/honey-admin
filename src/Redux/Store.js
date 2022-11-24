import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reProduct, reRelodeProduct } from "./Product";
import { reMoreSeen } from "./MoreSeen";
import { reSearch } from "./Search";
import { reOrder } from "./Order";
import { reGuest } from "./Guest";
import { reLoading, reUpload } from "./Loading";
import { reAdmin } from "./Admin";

const reducer = combineReducers({
  loading: reLoading,
  product: reProduct,
  moreSeen: reMoreSeen,
  search: reSearch,
  order: reOrder,
  guest: reGuest,
  upload: reUpload,
  admin: reAdmin,
  relodeProduct: reRelodeProduct,
});

export const Store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
