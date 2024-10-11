import { configureStore } from "@reduxjs/toolkit";
import auth from "./slice/authSlice";
import { checkTokenExpirationMiddleware } from "../middlewares/token";

const store = configureStore({
  reducer: {
    auth,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(checkTokenExpirationMiddleware);
  },
});

export default store;
