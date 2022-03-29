import React from "react";
import Profile from "../../components/sections/user/profile";
import LandingLayout from "../../components/shared/layout/LandingLayout";

const userProfile = () => {
  return (
    <>
      <LandingLayout>
        <Profile />
      </LandingLayout>
    </>
  );
};

export default userProfile;