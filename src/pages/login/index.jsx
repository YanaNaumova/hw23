import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetState } from "../../redux/slice/authSlice";
import styles from "./styles.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
    return () => {
      dispatch(resetState()); //call on dismantling component
    };
  }, [isSuccess, navigate, dispatch]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ email, password }));
  }

  if (isLoading) return <h2> loading... </h2>;

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          style={{ padding: "5px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          style={{ padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px" }}>
          Login
        </button>
      </form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Login successful</p>}
    </div>
  );
}
export default Login;
