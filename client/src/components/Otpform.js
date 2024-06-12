import React, { useState, useRef, useEffect } from "react";

export const Otpform = ({ length = 4 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const onOtpSubmit = () => {
    //console.log("hjfj");
  };

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newotp = [...otp];
    // allow only one input
    newotp[index] = value.substring(value.length - 1);
    setOtp(newotp);

    //submit
    const combinedOtp = newotp.join("");

    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // optional
    if (value && index <= length - 1 && !otp[index + 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to the previous input field on backspacel

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    )
      inputRefs.current[index - 1].focus();
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            style={InputStyles}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

const InputStyles = {
  height: "40px",
  width: "40px",
  margin: "10px",
  border: "2px solid red",
  textAlign: "center",
};
