import React from "react";
import Witness from "../../components/sections/marriageInfo/BasicMarriageInformation";
import LandingLayout from "../../components/shared/layout/LandingLayout";
import MarriageInformation from "../../components/sections/marriageInfo/MarriageInformation";
import BrideGroomAndMarriageInfoRenderProps from "../../components/sections/groom/BrideGroomAndMarriageInfoRenderProps";

const index = () => {
  return (
    <>
      <LandingLayout>
        <BrideGroomAndMarriageInfoRenderProps>
          {(
            groomState,
            groomHandleChange,
            onSubmit,
            groomGetUserById,
            onFetchNidData,
            formError,
            dataFromBackend
          ) => (
            <MarriageInformation groomInfo={groomState} onSubmit={onSubmit} />
          )}
        </BrideGroomAndMarriageInfoRenderProps>
      </LandingLayout>
    </>
  );
};

export default index;
