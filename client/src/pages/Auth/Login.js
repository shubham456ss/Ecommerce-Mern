import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/AuthStyles.css";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { BiShow, BiHide } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [auth, setAuth] = useAuth();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        //console.log(res.data);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <div>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPasssword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                style={{ display: "inline-flex" }}
                required
              />
              <i
                style={{
                  display: "flex",
                  position: "relative",
                  top: "-25px",
                  left: "225px",
                  topcursor: "pointer",
                }}
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? <BiShow /> : <BiHide />}
              </i>
            </div>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="black-button btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="black-button  btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
