import React from "react";
import Witness from "../../components/sections/marriageInfo/BasicMarriageInformation";
import LandingLayout from "../../components/shared/layout/LandingLayout";
import MarriageInformation from "../../components/sections/marriageInfo/MarriageInformation";
import BrideGroomAndMarriageInfoRenderProps from "../../components/sections/groom/BrideGroomAndMarriageInfoRenderProps";
import LawyerWitnessFatherContextProvider from "../../components/sections/lawyer-witness/lawyerWitnessContext";
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
            dataFromBackend,
            picState,
            groomPicture,
            picOpenCloseLefRightFunction,
            goomPicSubmit,
            fingerVerify,
            LeftFP,
            picOpenRightLeftCameraFlagIForImage,
            marriageInfo,
            formErrorsMrg,
            hadnleChangeMrg,
            onSubmitDataMrg,
            performDevorcePermissionDevorcyFilesAlimonyStateObjMrg,
            marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg,
            checkFormErrorMrg,
            handleAddDeleteObjMrg,
            devorceConOnChagneMrg,
            khorposhOnchangeMrg
          ) => (
            <LawyerWitnessFatherContextProvider>
              <MarriageInformation
                groomInfo={groomState}
                onChange={groomHandleChange}
                onSubmit={onSubmit}
                getUserById={groomGetUserById}
                title="MarriageInfo"
                onFetchNidData={onFetchNidData}
                formError={formError}
                data={dataFromBackend}
                picState={picState}
                picOpenCloseLefRightFunction={picOpenCloseLefRightFunction}
                groomPicture={groomPicture}
                goomPicSubmit={goomPicSubmit}
                fingerVerify={fingerVerify}
                LeftFP={LeftFP}
                picOpenRightLeftCameraFlagIForImage={
                  picOpenRightLeftCameraFlagIForImage
                }
                marriageInfo={marriageInfo}
                formErrorsMrg={formErrorsMrg}
                hadnleChangeMrg={hadnleChangeMrg}
                onSubmitDataMrg={onSubmitDataMrg}
                performDevorcePermissionDevorcyFilesAlimonyStateObjMrg={
                  performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
                }
                marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg={
                  marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg
                }
                checkFormErrorMrg={checkFormErrorMrg}
                handleAddDeleteObjMrg={handleAddDeleteObjMrg}
                devorceConOnChagneMrg={devorceConOnChagneMrg}
                khorposhOnchangeMrg={khorposhOnchangeMrg}
              />
            </LawyerWitnessFatherContextProvider>
          )}
        </BrideGroomAndMarriageInfoRenderProps>
      </LandingLayout>
    </>
  );
};

export default index;
