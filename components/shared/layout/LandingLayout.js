import React from "react";
import Footer from "../others/Footer";
import AppBar from "../others/appBar";

const LandingLayout = (props) => {
  return (
    <>
      <AppBar />
      <>
        <div style={{ marginTop: "60px" }}>{props.children}</div>
      </>
      <Footer />
    </>
  );
};

export default LandingLayout;
