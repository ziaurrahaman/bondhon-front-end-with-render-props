import React, { Children } from "react";
import Title from "../../shared/others/HeadTitle";
import Address from "../../shared/others/addressNew";
import {
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TextField,
  Grid,
  Stack,
  Typography,
  Tooltip,
  Button,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { marriageInfoBasicInfoUrl } from "../../../url/ApiList";
import SaveIcon from "@mui/icons-material/Save";
import { set, setMilliseconds } from "date-fns";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  // SetGroomRegPayloadAction,
  RegisterGroom,
} from "../../../redux/actions/groom_action";
import { SetMarriageInfoPayloadAction } from "../../../redux/actions/mrg_info";
import ZoneComponent from "../../shared/others/ZoneComponent";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AllFormContext from "../../shared/others/zone_form_context.json";

export default function BasicMarriageInfoRenderProps(props) {
  const children = props.children;
  return children();
}
