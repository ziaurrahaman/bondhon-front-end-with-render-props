import { localIp } from "./IpAddress";

export const userSignup = localIp + "reg";
export const bridesBasicInfo = localIp + "bride_groom_registration";
export const bridesAddressInfo = localIp + "address";
export const userLoginUrl = localIp + "login/login";
export const groomeReportUrl = localIp + "allCitizen/user_type/groom";
export const brideeReportUrl = localIp + "allCitizen/user_type/bride";
export const marriageInfoBasicInfoUrl = localIp + "marriage_info";
export const nidVerifyUrl = localIp + "nidverifyById/";
export const sendOtpUrl = localIp + "phone/otp";
export const otpUrlLogin = localIp + "phone/otp/";
export const BrideOrGroomAllInfoGetUrl = localIp + "BrideOrGroomInfo/";
export const getGroomInforamtion = localIp + "getGroomInfo";
export const getBrideInforamtion = localIp + "getGroomInfo/bride";
export const getGroomInforamtionByDoc = localIp + "getGroomInfo/groomInfoById";
export const getMarriageInfoReportUrl = localIp + "getMarriageInfoReport";
export const getMarriageInfoReportByIdUrl = localIp + "getMarriageInfoReport/";
export const checkCitizenAndAddressUrl = localIp + "CheckExistance/check/";
export const updateLawyerAndWitnessUrl =
  localIp + "update_marriage_info/lawyerWitness";
export const citizenUpdateUrl = localIp + "updateCitizen/up";
export const citizenCreateUrl = localIp + "createCitizen/post";
export const addressUpdateUrl = localIp + "updateAddress/address/up";
export const addressCreateUrl = localIp + "createAddress/createAddress/post";
export const updateMarriageInfoUrl = localIp + "update_marriage_info";

export const marriageInofUniqueCheckUrl = localIp + "checkUniqueMarriage/";
export const marriageAndSpecialMarriageInfoUpdateUrl =
  localIp + "updateMarriageInfo";

// Document Upload Url
export const postDocumentUploadUrl = localIp + "docInfo/uploadDoc";
export const postDocumentUploadUrlDummy = localIp + "docInfo/uploadDocDummy";
export const getDocumentUrl = localIp + "docInfo/base64docimg";
export const getDocumentUrlDummy = localIp + "getGroomInfo/base64docimg";
export const getNumberOfGroomsUrl = localIp + "getNumberOfGroom/groomNumber";
export const getNumberOfBridesUrl = localIp + "getNumberOfBride/brideNumber";
export const geoDataUrl = localIp + "master-data/geo-code?isPagination=false";
export const nidServerGetDataUrl = localIp + "fetchNidServerData/nidData";
export const getNumberOfMarraigesUrl =
  localIp + "getNumberOfMarriage/marriaeNumber";

export const getCertificateDataUrl =
  localIp + "getMarriageNikahnama/certificate/";
export const getPaymentUrl = localIp + "getMarriageNikahnama/count/";

export const getNikahnamaNmberUrl =
  localIp + "getMarriageNikahnama/getNikahnama/";
export const sslPaymentRequestUrl = localIp + "ssl-request";
export const fingerSdkApi = "http://localhost:20000/api/info/fingerdata";
export const livenessDetectionApi =
  "http://10.11.200.74:5000/faceapi/v1/is-face-live"; //"https://evision.erainfotechbd.com/faceapi/detect/liveliness";
export const faceMatchingApi =
  "http://10.11.200.74:5000/faceapi/v1/compare-face"; //"https://evision.erainfotechbd.com/faceapi/compare";
