import React from "react";
import Witness from "../../components/sections/Lawyer-Witness/Lawyer_Witness";
import LandingLayout from "../../components/shared/layout/LandingLayout";
import LawyerWitnessFatherContextProvider from "../../components/sections/lawyer-witness/lawyerWitnessContext";

const index = () => {
  return (
    <>
      <LandingLayout>
        {/* <LawyerWitnessFatherContextProvider> */}
        <Witness />
        {/* </LawyerWitnessFatherContextProvider> */}
      </LandingLayout>
    </>
  );
};

export default index;
