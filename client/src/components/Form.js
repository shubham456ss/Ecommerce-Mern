import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./Layouts/Layout";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyForm() {
  const [putOTP, setPutOTP] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const userId = data._id;

  const navigator = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/verify-email", {
        userId,
        putOTP,
      });

      if (res.data && res.data.success) {
        toast.success(res.data.message);
        navigator();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong in verification");
    }
  };

  return (
    <Layout title={"Verify - Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Email Verification</h4>

          <div className="mb-2">
            <div className="verify-tick">
              <h5 style={InputStyles}>
                Email has been sent on <br /> {data.email}
              </h5>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg">
              <input
                type="text"
                onChange={(e) => {
                  setPutOTP(e.target.value);
                }}
                className="form-control mb-3"
                id="exampleInputPassword1"
                placeholder="OTP"
                required
              />

              <div className="row ">
                <div className="col"></div>
                <button type="submit" className="btn btn-outline-success col ">
                  Verify
                </button>
                <div className="col"></div>
              </div>

              <div class="modal-dialog modal-dialog-centered"></div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

const InputStyles = {
  fontSize: "15px",
};
