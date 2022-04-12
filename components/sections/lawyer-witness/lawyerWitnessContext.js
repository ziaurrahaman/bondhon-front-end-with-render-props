import React, { Component } from "react";
import { createContext } from "react";
import {
  nidVerifyUrl,
  updateMarriageInfoUrl,
  nidServerGetDataUrl,
  updateLawyerAndWitnessUrl,
} from "../../../url/ApiList";
import axios from "axios";
export const LawyerWitnessFatherContext = createContext();
class LawyerWitnessFatherContextProvider extends Component {
  state = {
    lawyerFatherInfo: {
      lawyer_father_id: "",
      dob: "",
      name: "",
      division_id: "",
      district_id: "",
      upazila_id: "",
      post_code: "",
      union_id: "",
      detail_address: "",
    },
    formErrorsLawyer: {
      nid: "",
      dob: "",
      name: "",
      district_id: "",
      upazila_id: "",
      post_code: "",
      union_id: "",
      detail_address: "",
    },

    nidDataFatch: "",
  };
  giveValueToTextField = (index) => {
    const ids = [
      this.state.lawyerFatherInfo.division_id,
      this.state.lawyerFatherInfo.district_id,
      this.state.lawyerFatherInfo.upazila_id,
      this.state.lawyerFatherInfo.union_id,
    ];
    console.log("idINdex", index);
    return ids[index];
  };
  handlerOnFatchData = async (event) => {
    this.setState({ nidDataFatch: event.target.value });
    console.log("ffffffffffffffffffffffffffff");

    if (event.key === "Enter") {
      let nidVal = this.state.nidDataFatch;
      console.log(nidVal);
      try {
        const nidData = await axios.get(nidVerifyUrl + nidVal);
        console.log(nidData);
        const data = nidData.data.data;
        const date = this.formatDate(data.dob);
        console.log(date);

        if (data) {
          this.setState({
            lawyerFatherInfo: {
              ...lawyerFatherInfo,
              name: data.name,
              dob: date,
            },
          });
        } else {
          this.setState({
            lawyerFatherInfo: {
              ...lawyerFatherInfo,
              name: "",
              dob: "",
            },
          });
        }
      } catch (error) {
        console.log("error", error.response);
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            name: "",
            dob: "",
          },
        });
      }
    }
  };
  formatDateInString = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  onFetchNidServerData = async (e) => {
    if (
      this.state.lawyerFatherInfo.lawyer_father_id !== "" &&
      this.state.lawyerFatherInfo.dob
    ) {
      try {
        const nidServerData = await axios.get(
          nidServerGetDataUrl +
            "/" +
            this.state.lawyerFatherInfo.lawyer_father_id +
            "/" +
            this.state.lawyerFatherInfo.dob
        );
        console.log("nidserverdata", nidServerData.data.data);
        if (nidServerData.data.data.nidBasic) {
          console.log("In ifffffff");
          this.setState({
            lawyerFatherInfo: {
              ...this.state.lawyerFatherInfo,
              lawyer_father_id: nidServerData.data.data.nidBasic.nid,
              dob: this.formatDateInString(
                nidServerData.data.data.nidBasic.dob
              ),
              religion: "নির্বাচন করুন",
              name: nidServerData.data.data.nidBasic.nameEn,
              detail_address:
                nidServerData.data.data.nidAddress.unionOrWard +
                " " +
                nidServerData.data.data.nidAddress.upozila +
                " " +
                nidServerData.data.data.nidAddress.postOffice +
                " " +
                nidServerData.data.data.nidAddress.district,
            },
          });
        } else {
          this.setState({
            lawyerFatherInfo: {
              ...this.state.lawyerFatherInfo,
              lawyer_father_id: nidServerData.data.data.citizen_doc_no,

              dob: this.formatDateInString(nidServerData.data.data.citizen_dob),
              religion: "নির্বাচন করুন",
              name: nidServerData.data.data.citizen_name,
              detail_address: "Dhaka",
            },
          });
        }
      } catch (error) {
        console.log("nidServerError", error);
      }
    }
    // }
  };

  onSubmitLawyerInfoData = async () => {
    console.log("helooooooooooooooooo");

    try {
      const marriageInfoTablePrimaryKey = localStorage.getItem("mrg_info_id");

      const lawwitResult = await axios.put(updateLawyerAndWitnessUrl, {
        marriage_id: marriageInfoTablePrimaryKey,
        lawyer_father_id: localStorage.getItem("lawyer_father_id"),
        witness_id: {
          witnesses: JSON.parse(localStorage.getItem("witnesses")),
        },
      });

      console.log("lawWitPutResult", lawwitResult);
      NotificationManager.success("সফলভাবে ডেটা সংরক্ষণ করা হয়েছে৷");

      localStorage.setItem("groomNid", "");
      localStorage.setItem("brideNid", "");
    } catch (error) {
      console.log("lawfatherError", error);
    }
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (e.target.name) {
      case "lawyer_father_id":
        console.log("in case law fatherid");
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.nid =
          value.length == 10 ||
          value.length == 13 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";

        localStorage.setItem("lawyer_father_id", value);

        console.log("lawyer_father_id", value);

        break;
      case "dob":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.dob = value === "" && "জন্ম তারিখ দিন";
        break;
      case "name":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.name =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "division_id":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.district_id =
          value === "" && "জেলা এর ধরণ নির্বাচন করুন";
        break;
      case "district_id":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.district_id =
          value === "" && "জেলা এর ধরণ নির্বাচন করুন";
        break;
      case "upazila_id":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.upazila_id =
          value === "" && "উপজেলা/সিটি কর্পোরেশন নির্বাচন করুন";
        break;
      case "union_id":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.union_id =
          value === "" && "ইউনিয়ন/পৌরসভা/থানা নির্বাচন করুন";
        break;

      case "post_code":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });

        this.state.formErrorsLawyer.post_code =
          value === "" && "ওয়ার্ড নির্বাচন করুন";
        break;
      case "detail_address":
        this.setState({
          lawyerFatherInfo: {
            ...this.state.lawyerFatherInfo,
            [e.target.name]: e.target.value,
          },
        });
        console.log("In detail address");

        this.state.formErrorsLawyer.detail_address =
          value === "" && "বিস্তারিত ঠিকানা দিন";
        break;
    }
  };
  formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  render() {
    return (
      <LawyerWitnessFatherContext.Provider
        value={{
          ...this.state,
          handleOnChange: this.handleOnChange,
          formatDate: this.formatDate,

          giveValueToTextField: this.giveValueToTextField,
          onFetchNidServerData: this.onFetchNidServerData,
          handlerOnFatchData: this.handlerOnFatchData,
          onSubmitLawyerInfoData: this.onSubmitLawyerInfoData,
        }}
      >
        {this.props.children}
      </LawyerWitnessFatherContext.Provider>
    );
  }
}
export default LawyerWitnessFatherContextProvider;
