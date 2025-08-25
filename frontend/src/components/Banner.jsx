import React from "react";

const Banner = () => {
  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        display: "flex",
        width: "50% ",
      }}
    >
      {/* Left Side: Login */}

      {/* Right Side: Business QR */}
      <div
        style={{
          flex: 1,
          background: "#7dceee",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <img
          src="/Banner.jpg"
          alt="Business QR"
          style={{
            width: "70%",
            maxWidth: 350,
            height: "auto",
            borderRadius: 10,
            marginBottom: 25,
          }}
        />
        <div
          style={{
            fontSize: 29,
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Business QR Liya Kya?
        </div>
        <div
          style={{
            fontSize: 15,
            color: "#ffffff",
            maxWidth: 340,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Create your custom QR code and connect customers to your business
          instantly!
        </div>
      </div>
    </div>
  );
};

export default Banner;
