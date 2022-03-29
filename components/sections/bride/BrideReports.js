import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
  Paper,
  Box,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  Link,
  TablePagination,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Breadcrumb from "../../shared/others/breadcrumbs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { getBrideInforamtion } from "../../../url/ApiList";
import { nidVerifyUrl } from "../../../url/ApiList";
import { nidCitizenVerifyUrl } from "../../../url/ApiList";
import ReactToPrint from "react-to-print";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import SimCardDownloadTwoToneIcon from "@mui/icons-material/SimCardDownloadTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import BrideDtl from "./BrideDtl";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1050,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const modalStyle = {
  position: "absolute",
  top: "8%",
  // left:'10%',
  overflow: "scroll",
  height: "100%",
  display: "block",
};

const GroomReport = () => {
  let rows = [];
  const [groomRows, setGroomRows] = React.useState([]);
  const [filteredGroomrows, setFilteredGroomRowsData] =
    React.useState(groomRows);
  const [open, setOpen] = React.useState(false);
  const [docNo, setDocNo] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searched, setSearched] = React.useState("");

  React.useEffect(() => {
    createRowsForGroom();
  }, []);

  let componentRef = useRef();

  const columns = [
    { id: "citizen_name", label: "কনের নাম" },
    { id: "citizen_doc_no", label: "জন্ম নিবন্ধন / জাতীয় পরিচয়পত্র নাম্বার" },
    { id: "citizen_dob", label: "জন্ম তারিখ" },
    { id: "citizen_mobile", label: "মোবাইল নাম্বার" },
    { id: "citizen_email", label: "ইমেইল" },
  ];

  async function createRowsForGroom() {
    const result = await axios.get(getBrideInforamtion);
    const finalData = result.data.data;
    let dataObj = {
      name: finalData.citizen_name,
      nid: finalData.citizen_doc_no,
      dob: finalData.citizen_dob,
      mobile: finalData.citizen_mobile,
      mail: finalData.citizen_email,
    };

    setGroomRows(finalData);
    setFilteredGroomRowsData(finalData);
    console.log(dataObj);
    console.log(finalData);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenGroomData = (docNo) => {
    setOpen(true);
    setDocNo(docNo);
  };

  //------------------- Pagination Start------------------->

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //---------------- Pagination End ----------------------->

  //-------------- Data Search Start ------------------------------>

  const requestSearch = (e) => {
    const data = e.target.value;
    const filteredRows = groomRows.filter((row) => {
      return (
        row.citizen_doc_no.toLowerCase().includes(data.toLowerCase()) ||
        row.citizen_mobile.toLowerCase().includes(data.toLowerCase())
      );
    });
    setFilteredGroomRowsData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  //-------------- Data Search End ------------------------------>

  return (
    <>
      <Breadcrumb>
        <Typography variant="h6">কনের তথ্যাদি</Typography>
      </Breadcrumb>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          backgroundColor: "#fedcac",
          backgroundImage: "url('/artBride.png')",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <Container>
          <Paper
            sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
            elevation={3}
            rounded
            style={{ marginTop: "3%" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar variant="dense">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, mb: 1, fontWeight: "bold" }}
                >
                  কনের তথ্য
                </Typography>
                <TextField
                  placeholder="খোঁজ করুন"
                  size="small"
                  type="text"
                  variant="outlined"
                  onChange={requestSearch}
                  onCancelSearch={() => cancelSearch()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <div>
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant="contained"
                        sx={{ ml: 1 }}
                        startIcon={<PrintTwoToneIcon />}
                      >
                        মুদ্রণ করুন
                      </Button>
                    )}
                    content={() => componentRef}
                  />

                  <Button
                    variant="contained"
                    sx={{ ml: 1 }}
                    startIcon={<SimCardDownloadTwoToneIcon />}
                    color="success"
                  >
                    ডাউনলোড করুন
                  </Button>
                </div>
              </Toolbar>
            </Box>
            <div ref={(el) => (componentRef = el)}>
              <TableContainer px={2} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead sx={{ backgroundColor: "#E7EFFC" }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell sx={{ fontWeight: "bold" }}>
                        বিস্তারিত
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredGroomrows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value =
                                column.id === "citizen_dob"
                                  ? formatDate(row[column.id])
                                  : row[column.id];
                              return (
                                <>
                                  <TableCell key={column.id}>{value}</TableCell>
                                </>
                              );
                            })}
                            <TableCell align="center">
                              <a href="#">
                                <VisibilityIcon
                                  color="primary"
                                  onClick={() =>
                                    handleOpenGroomData(row.citizen_doc_no)
                                  }
                                />
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10, 25]}
                  component="div"
                  count={groomRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </div>
          </Paper>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            sx={modalStyle}
          >
            <Fade in={open}>
              <Box sx={style}>
                <BrideDtl docVal={docNo} />
              </Box>
            </Fade>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

export default GroomReport;
