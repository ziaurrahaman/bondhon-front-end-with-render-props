import React, { useState } from "react";
import {
  Paper,
  Container,
  TextField,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Stack,
  InputAdornment,
} from "@mui/material";
import Title from "../../shared/others/HeadTitle";
import AddIcons from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { SetLawyerFatherAndWitnessAction } from "../../../redux/actions/lawyerFatherAndWitnessAction";
import { nidServerGetDataUrl } from "../../../url/ApiList";
import axios from "axios";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const WitnessForm = () => {
  const dispatch = useDispatch();

  const [dynamicInput, setDynamicInput] = useState([
    {
      nid: "",
      name: "",
      dob: "",
      detailAddress: "",
    },
  ]);

  const [witnessId, setWitnessId] = useState({
    id: "",
  });
  function formatDateInString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  let witnessArray = [{}];
  const onFetchNidServerData = async (e, i) => {
    if (dynamicInput[i].nid !== "" && dynamicInput[i].dob) {
      try {
        const nidServerData = await axios.get(
          nidServerGetDataUrl +
            "/" +
            dynamicInput[i].nid +
            "/" +
            dynamicInput[i].dob
        );

        if (nidServerData.data.data.nidBasic) {
          let newArray = [...dynamicInput];

          newArray[i]["nid"] = nidServerData.data.data.nidBasic.nid;
          (newArray[i]["name"] = nidServerData.data.data.nidBasic.nameEn
            ? nidServerData.data.data.nidBasic.nameEn
            : nidServerData.data.data.citizen_name),
            (newArray[i]["dob"] = formatDateInString(
              nidServerData.data.data.nidBasic.dob
                ? nidServerData.data.data.nidBasic.dob
                : nidServerData.data.data.citizen_dob,
              (newArray[i]["detailAddress"] =
                nidServerData.data.data.nidAddress.unionOrWard +
                " " +
                nidServerData.data.data.nidAddress.upozila +
                " " +
                nidServerData.data.data.nidAddress.postOffice +
                " " +
                nidServerData.data.data.nidAddress.district)
            )),
            setDynamicInput(newArray);
        } else {
          let newArray = [...dynamicInput];

          newArray[i]["nid"] = nidServerData.data.data.citizen_doc_no;
          (newArray[i]["name"] = nidServerData.data.data.citizen_name),
            (newArray[i]["dob"] = formatDateInString(
              nidServerData.data.data.citizen_dob,
              (newArray[i]["detailAddress"] = "Dhaka")
            )),
            setDynamicInput(newArray);
        }
      } catch (error) {
        console.log("nidServerError", error);
      }
    }
    // }
  };
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const witnessList = [];
    let newArray = [...dynamicInput];

    newArray[index][name] = value;
    console.log("Array is=====", newArray);
    setDynamicInput(newArray);

    localStorage.setItem("witnesses", JSON.stringify(newArray));
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...dynamicInput];
    list.splice(index, 1);
    setDynamicInput(list);
    dispatch(SetLawyerFatherAndWitnessAction({ witness_id: dynamicInput }));
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setDynamicInput([
      ...dynamicInput,
      { name: "", nid: "", dob: "", detailAddress: "" },
    ]);
    // dispatch(SetLawyerFatherAndWitnessAction({ witness_id: dynamicInput }));
  };
  console.log("Dynamic Input=====", dynamicInput);
  return (
    <Container>
      <Grid container spacing={2} py={2}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "25%", p: "3px" }}>
                  জাতীয় পরিচয়পত্র নাম্বার
                </TableCell>
                <TableCell sx={{ width: "10%", p: "3px" }}>
                  জন্ম তারিখ
                </TableCell>
                <TableCell sx={{ width: "25%", p: "3px" }}>নাম</TableCell>
                <TableCell sx={{ width: "25%", p: "3px" }}>ঠিকানা</TableCell>
                <TableCell sx={{ width: "10%", p: "3px" }}>পক্ষ</TableCell>
                <TableCell sx={{ width: "5%", p: "5px", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddClick}
                    size="small"
                  >
                    <AddIcons sx={{ display: "block" }} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            {dynamicInput.map((x, i) => {
              return (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: "25%", p: "3px" }}>
                        <TextField
                          required
                          name="nid"
                          fullWidth
                          size="small"
                          autoComplete="family-name"
                          variant="outlined"
                          onChange={(e) => handleInputChange(e, i)}
                          value={x.nid}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "10%", p: "3px" }}>
                        <TextField
                          fullWidth
                          size="small"
                          type="date"
                          name="dob"
                          // defaultValue="2021-12-27"
                          onKeyUp={(e) => onFetchNidServerData(e, i)}
                          onChange={(e) => handleInputChange(e, i)}
                          value={x.dob}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "25%", p: "3px" }}>
                        <TextField
                          required
                          name="name"
                          fullWidth
                          size="small"
                          autoComplete="given-name"
                          variant="outlined"
                          value={x.name}
                          onChange={(e) => handleInputChange(e, i)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "25%", p: "3px" }}>
                        <TextField
                          required
                          name="detailAddress"
                          fullWidth
                          size="small"
                          autoComplete="given-name"
                          variant="outlined"
                          onChange={(e) => handleInputChange(e, i)}
                          value={x.detailAddress}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AddLocationIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: "10%", p: "3px" }}>
                        <Stack direction="row" spacing={1}>
                          <Typography>বর</Typography>
                          <AntSwitch
                            inputProps={{ "aria-label": "ant design" }}
                          />
                          <Typography>কনে</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {dynamicInput.length !== 1 && (
                          <Button
                            variant="contained"
                            onClick={() => handleRemoveClick(i)}
                            color="error"
                            sx={{ textAlign: "center" }}
                          >
                            <RemoveIcon sx={{ display: "block" }} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              );
            })}
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};

export default WitnessForm;
