import { generate } from "otp-generator";

const generateOTP = () => {
  const OTP = generate(6, {
    lowerCaseAlphabets:false,
    upperCaseAlphabets: false,
    specialChars: false,
    digits:true,
  });

  return OTP;
};

export default generateOTP;
