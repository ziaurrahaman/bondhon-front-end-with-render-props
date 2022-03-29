import { Typography } from "@mui/material";
import React from "react";
import Groom from "../../components/sections/groom/Groom";
import LandingLayout from "../../components/shared/layout/LandingLayout";
import Breadcrumbs from "../../components/shared/others/breadcrumbs";
import BrideGroomAndMarriageInfoRenderProps from "../../components/sections/groom/BrideGroomAndMarriageInfoRenderProps";
const index = () => {
  return (
    <>
      <LandingLayout>
        <Breadcrumbs>
          <Typography variant="h6">বরের তথ্য</Typography>
        </Breadcrumbs>
        <BrideGroomAndMarriageInfoRenderProps title="G">
          {(
            groomState,
            groomHandleChange,
            onSubmit,
            groomGetUserById,
            onFetchNidData,
            formError,
            dataFromBackend,
            picState,
            onImageSelect,
            picOpenCloseLefRightFunction,
            goomPicSubmit,
            fingerVerify,
            LeftFP
          ) => (
            <Groom
              groomInfo={groomState}
              onChange={groomHandleChange}
              onSubmit={onSubmit}
              getUserById={groomGetUserById}
              title="G"
              onFetchNidData={onFetchNidData}
              formError={formError}
              data={dataFromBackend}
              picState={picState}
              picOpenCloseLefRightFunction={picOpenCloseLefRightFunction}
              onImageSelect={onImageSelect}
              goomPicSubmit={goomPicSubmit}
              fingerVerify={fingerVerify}
              LeftFP={LeftFP}
            />
          )}
        </BrideGroomAndMarriageInfoRenderProps>
      </LandingLayout>
    </>
  );
};

export default index;
