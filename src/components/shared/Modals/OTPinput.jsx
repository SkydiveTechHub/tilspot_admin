import React, { useState } from 'react';

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {  // restrict input to digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join("")); // pass OTP as a single string

      // focus on the next input
      if (value && index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "18px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
