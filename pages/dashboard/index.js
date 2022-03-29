import React from 'react';
import Dashboard from '../../components/sections/dashboard/Dashboard';
import LandingLayout from "../../components/shared/layout/LandingLayout";


const index = () => {
  return (
    <>
      <LandingLayout>
        <Dashboard />
      </LandingLayout>
    </>
  )
}

export default index