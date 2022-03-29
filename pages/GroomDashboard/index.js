import React from "react";
import GroomDashboard from "../../components/sections/dashboard/GroomDashboard";

import LandingLayout from "../../components/shared/layout/LandingLayout";

const index = () => {
  return (
    <>
      <LandingLayout>
        <GroomDashboard></GroomDashboard>
      </LandingLayout>
    </>
  );
};

export default index;
