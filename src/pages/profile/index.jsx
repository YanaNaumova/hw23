import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";
import { useEffect } from "react";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(jwtDecode(token));
  const tokenData =
    token && jwtDecode(token).exp * 1000 > Date.now() ? jwtDecode(token) : null;

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    !tokenData && handleLogout();
  }, []);
  // const tokenData = token ? jwtDecode(token) : null;

  if (!tokenData) return <h2>Login into account</h2>;

  return (
    <div>
      <h2>{tokenData && tokenData.user.id}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
