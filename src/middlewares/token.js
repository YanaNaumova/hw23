import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/slice/authSlice";

const isTokenExpired = (token) => {
  if (!token) return true;

  const decoded = jwtDecode(token);
  const currentTime = Date.now / 1000;

  return decoded.exp < currentTime;
};

export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token = store.getState().auth.token;

  if (token && isTokenExpired(token)) {
    store.dispatch(logout());
  }

  return next(action);
};
