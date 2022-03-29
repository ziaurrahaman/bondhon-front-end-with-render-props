import { Typography } from "@mui/material";
import React from "react";
import Bride from "../../components/sections/bride/Bride";
import LandingLayout from "../../components/shared/layout/LandingLayout";
import Breadcrumbs from "../../components/shared/others/breadcrumbs";
import BrideGroomAndMarriageInfoRenderProps from "../../components/sections/groom/BrideGroomAndMarriageInfoRenderProps";

const index = () => {
  return (
    <>
      <LandingLayout>
        <Breadcrumbs>
          <Typography variant="h6">কনের তথ্য</Typography>
        </Breadcrumbs>
        <BrideGroomAndMarriageInfoRenderProps title="B">
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
            picOpenCloseLefRightFunction
          ) => (
            <Groom
              groomInfo={groomState}
              onChange={groomHandleChange}
              onSubmit={onSubmit}
              getUserById={groomGetUserById}
              title="Bride"
              onFetchNidData={onFetchNidData}
              formError={formError}
              data={dataFromBackend}
              picState={picState}
              picOpenCloseLefRightFunction={picOpenCloseLefRightFunction}
              onImageSelect={onImageSelect}
            />
          )}
        </BrideGroomAndMarriageInfoRenderProps>
      </LandingLayout>
    </>
  );
};

export default index;
