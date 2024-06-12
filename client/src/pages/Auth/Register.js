import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Otpform } from "./../../components/Otpform";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState(false);
  const navigate = useNavigate();
  // const [showOtpInput, setShowOtpInput] = useState(false);

  const navigator = () => {
    // setTimeout(() => {data
    //   navigate("/verify-email", { state: data });
    // }, 2000);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setShowOtpInput(true);

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
        role,
      });

      if (res || res.data.success) {
        toast.success(res.data && res.data.message);

        navigator(); //res.data.newUser
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        {/* {!showOtpInput ? ( */}
        <form onSubmit={handleSubmit}>
          <h4 className="title">Register</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
            />
          </div>
          <div className="mb-2">
            <div className="verify-tick">
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
          </div>
          <div className="mb-3">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPasssword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="What is your favourite sport"
              required
            />
          </div>
          <button className="black-button btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

// ) : (
//   <form>
//     <h4 className="title">OTP Verification</h4>
//     <Otpform />
//   </form>
// )}
