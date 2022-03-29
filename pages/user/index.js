import React from 'react';
import Registration from '../../components/sections/user/registration';
import LoginLayout from '../../components/shared/layout/LoginLayout';


const index = () => {
  return (
    <>
      <LoginLayout>
        <Registration title={'নিবন্ধন করুণ'}/>
      </LoginLayout>
    </>
  )
}

export default index
