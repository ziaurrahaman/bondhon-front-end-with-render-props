import React from "react";
import BrideDashboard from "../../components/sections/dashboard/BrideDashboard";

import LandingLayout from "../../components/shared/layout/LandingLayout";

const index = () => {
  return (
    <>
      <LandingLayout>
        <BrideDashboard></BrideDashboard>
      </LandingLayout>
    </>
  );
};

export default index;
