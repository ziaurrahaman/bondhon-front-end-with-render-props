import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import Title from "../../shared/others/HeadTitle";
import EditIcon from "@mui/icons-material/Edit";

function createAddressData(
  addType,
  division,
  district,
  upazila,
  union,
  postalCode,
  village
) {
  return { addType, division, district, upazila, union, postalCode, village };
}
const rows = [
  createAddressData(
    "বর্তমান ঠিকানা",
    "চট্টগ্রাম",
    "কুমিল্লা",
    "বরুড়া",
    "আড্ডা",
    "3500",
    "রাজাপাড়া"
  ),
  createAddressData(
    "স্থায়ী ঠিকানা",
    "চট্টগ্রাম",
    "কুমিল্লা",
    "বরুড়া",
    "আড্ডা",
    "3500",
    "রাজাপাড়া"
  ),
];

function AddressDetails(props) {
  return (
    <>
      <Title>
        <Typography variant="h6">{props.title}</Typography>
      </Title>
      <TableContainer px={2}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">&nbsp;</TableCell>
              <TableCell>
                <b>ঠিকানার ধরন</b>
              </TableCell>
              <TableCell align="right">
                <b>জেলা</b>
              </TableCell>
              <TableCell align="right">
                <b>উপজেলা/সিটি কর্পোরেশন</b>
              </TableCell>
              <TableCell align="right">
                <b>ইউনিয়ন/পৌরসভা/থানা</b>
              </TableCell>
              <TableCell align="left">
                <b>ওয়ার্ড</b>
              </TableCell>
              <TableCell align="left">
                <b>বিস্তারিত ঠিকানা</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <EditIcon color="primary" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.addType}
                </TableCell>
                <TableCell align="right">{row.district}</TableCell>
                <TableCell align="right">{row.upazila}</TableCell>
                <TableCell align="right">{row.union}</TableCell>
                <TableCell align="left">{row.postalCode}</TableCell>
                <TableCell align="left">{row.village}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AddressDetails;
