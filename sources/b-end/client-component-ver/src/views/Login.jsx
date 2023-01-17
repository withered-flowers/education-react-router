import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const buttonOnClickHandler = () => {
    // Ini hanyalah simulasi login
    // In real case mungkin akan menggunakan fetch untuk melakukan login
    localStorage.setItem("token", "12345");
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={buttonOnClickHandler}>Login</button>
    </div>
  );
};

export default Login;
