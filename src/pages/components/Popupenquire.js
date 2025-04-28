import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Typography,
  Dialog,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useAddFormDataMutation } from "../../reduxSlice/apiSlice";
import Image from "next/image";
import elevation from "../../../public/ImageR/exterior/C3.jpg";
// import CloseIcon from "@mui/icons-material/Close";

const EMPTY_USERDATA = {
  userName: "",
  phoneNo: "",
  email: "",
  bhkType: "",
};

const EMPTY_ISDIRTY = {
  userName: false,
  email: false,
  phoneNo: false,
  bhkType: false,
};

const EMPTY_ERRORMSGS = {
  userName: "",
  email: "",
  phoneNo: "",
  bhkType: "",
};

export const ERROR_TEXT = {
  EMPTY_FIELD: "Cannot be empty",
  GENERIC_SOMETHINGWRONG: "Please check this field",
  EMAIL_WRONGFORMAT: "Email should be in example@email.com format",
  EMAIL_ALREADYTAKEN: "This email is already taken !",
  PHNO_10NUMS: "Should have 10 numbers",
  USERNAME_WRONGFORMAT: "Only letters with spaces in middle here",
  USERNAME_NUMCHARS: "Should be between 3 and 20 characters",
  TOAST_SOMETHINGWENTWRONG: "Something went wrong. Please try again",
};

export function checkEmailErrors(email) {
  if (!email) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  if (typeof email !== "string") {
    return ERROR_TEXT.GENERIC_SOMETHINGWRONG;
  }
  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return ERROR_TEXT.EMAIL_WRONGFORMAT;
  }

  return "";
}

export function checkPhNoErrors(phoneNo) {
  if (!phoneNo) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  if (typeof phoneNo !== "string") {
    return ERROR_TEXT.GENERIC_SOMETHINGWRONG;
  }
  if (!/^[6-9]\d{9}$/.test(phoneNo)) {
    return ERROR_TEXT.PHNO_10NUMS;
  }

  return "";
}

export function checkUserNameErrors(userName) {
  if (!userName) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  if (typeof userName !== "string") {
    return ERROR_TEXT.GENERIC_SOMETHINGWRONG;
  }
  if (!/^.{3,20}$/.test(userName)) {
    return ERROR_TEXT.USERNAME_NUMCHARS;
  }
  if (!/^[a-zA-Z]+[a-zA-Z\s]{1,20}[a-zA-Z]+$/.test(userName)) {
    return ERROR_TEXT.USERNAME_WRONGFORMAT;
  }

  return "";
}

export function checkUserTypeErrors(bhkType) {
  if (!bhkType) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  return "";
}

const getUtmParams = (pageQueryParams) => {
  let source = pageQueryParams?.utm_source || "Direct Traffic";
  if (Array.isArray(source) && source?.[0]) {
    [source] = source;
  }
  let medium = pageQueryParams?.utm_medium;
  if (Array.isArray(medium) && medium?.[0]) {
    [medium] = medium;
  }
  let campaign = pageQueryParams?.utm_campaign;
  if (Array.isArray(campaign) && campaign?.[0]) {
    [campaign] = campaign;
  }
  let content = pageQueryParams?.utm_content;
  if (Array.isArray(content) && content?.[0]) {
    [content] = content;
  }
  let ad = pageQueryParams?.utm_ad || pageQueryParams?.utm_Ad;
  if (Array.isArray(ad) && ad?.[0]) {
    [ad] = ad;
  }

  let adgroup = pageQueryParams?.utm_adgroup;
  if (Array.isArray(adgroup) && adgroup?.[0]) {
    [adgroup] = adgroup;
  }
  let keyword = pageQueryParams?.utm_keyword;
  if (Array.isArray(keyword) && keyword?.[0]) {
    [keyword] = keyword;
  }
  let location = pageQueryParams?.utm_location;
  if (Array.isArray(location) && location?.[0]) {
    [location] = location;
  }
  let device = pageQueryParams?.utm_device;
  if (Array.isArray(device) && device?.[0]) {
    [device] = device;
  }

  return {
    source,
    medium,
    campaign,
    content,
    ad,
    adgroup,
    keyword,
    location,
    device,
  };
};

export default function Popupenquire({ openEnquiry, setOpenEnquiry }) {
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();

  const closeTab = () => {
    setOpenEnquiry(false);
  };

  const [userData, setUserData] = useState(EMPTY_USERDATA);
  const [isDirty, setIsDirty] = useState({
    userName: false,
    email: false,
    phoneNo: false,
    bhkType: false,
  });
  const [errorMsgs, setErrorMsgs] = useState({
    userName: "",
    email: "",
    phoneNo: "",
    bhkType: "",
  });

  useEffect(() => {
    if (isDirty.email) {
      setErrorMsgs((m) => ({
        ...m,
        email: checkEmailErrors(userData.email),
      }));
    }
    if (isDirty.phoneNo) {
      setErrorMsgs((m) => ({
        ...m,
        phoneNo: checkPhNoErrors(userData.phoneNo),
      }));
    }
    if (isDirty.userName) {
      setErrorMsgs((m) => ({
        ...m,
        userName: checkUserNameErrors(userData.userName),
      }));
      if (isDirty.bhkType) {
        setErrorMsgs((m) => ({
          ...m,
          userName: checkUserTypeErrors(userData.bhkType),
        }));
      }
    }
  }, [isDirty, userData]);

  const resetData = () => {
    setUserData(EMPTY_USERDATA);
    setIsDirty(EMPTY_ISDIRTY);
    setErrorMsgs(EMPTY_ERRORMSGS);
  };

  const router = useRouter();

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    const pageQueryParams = router?.query;
    const utmParams = getUtmParams(pageQueryParams);
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "EC_form_submit",
        enhanced_conversion_data: {
          email: userData.email,
        },
      });
    }
    localStorage.setItem("userEmail", userData.email);

    addFormData({ ...(userData || {}), utmParams })
      .unwrap()
      .then(() => {
        resetData();
        window.location.href = "/thank-you";
      })
      .catch(() => {
        enqueueSnackbar({
          variant: "error",
          message: ERROR_TEXT.TOAST_SOMETHINGWENTWRONG,
        });
      });
  };

  const textFieldStyles = {
    width: { xs: "100%", md: "48%" },
    borderRadius: "5px",
    "& .MuiOutlinedInput-root .MuiInputBase-input": {
      background: "#ffffff",
      padding: "8px",
      borderRadius: "5px",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "12px",
    },
    marginBottom: { xs: "5px", md: "0px" },
  };

  return (
    <Dialog
      open={openEnquiry}
      onClose={closeTab}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        // background: "rgba(0, 0, 0, 0.88)",

        height: "100vh",
        ".MuiDialog-paper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          background: "black",
          maxWidth: { xs: "md", md: "480px" },
          // height: { xs: "50%", sm: "50%" },
          width: "100%",
          borderRadius: { xs: "5px", sm: "10px", md: "15px" },

          "::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Grid
        container
        item
        xs={12}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        {/* <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "15%", background: "#1976d2", padding: "10px 20px" }}
        >
          <Typography
            component="h1"
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#fff",
              width: "90%",
              // border: "1px solid white",
            }}
          >
            {" "}
            I&apos;m interested
          </Typography>
          <CloseIcon
            onClick={closeTab}
            sx={{ fontSize: 30, color: "#fff", cursor: "pointer" }}
          />
        </Grid> */}
        {/* <Grid
          sx={{
            width: { xs: "md", md: "480px" },
            height: { xs: "30vh", md: "40vh" },
          }}
        >
          <Image
            src={elevation}
            priority={true}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "relative",
            }}
          />
          <Grid sx={{ position: "absolute", top: 10, right: 10 }}>
            <Box
              onClick={closeTab}
              sx={{
                border: "0px solid lightgray",
                background: "lightgray",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <CloseIcon style={{ color: "black", cursor: "pointer" }} />
            </Box>
          </Grid>
        </Grid> */}
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            // height: "85%",
            background: "#fff",
            padding: "0px",
            border: "1px solid black",
          }}
        >
          {/* <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              border: "0px solid black",
              padding: "0px",
              width: "95%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                color: "gray",
                // border: "1px solid black",
                width: "100%",
                padding: "2px",
                textAlign: "center",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              2BHK starts from 80*Lacs
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                color: "gray",
                // border: "1px solid black",
                width: "100%",
                padding: "2px",
                textAlign: "center",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              3BHK starts from 1.04*Cr.
            </Typography>
          </Grid> */}
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              border: "0px solid black",
              padding: "0px",
              width: "95%",
              marginTop: "10px",
              marginBottom: "0px",
              alignItems: "center",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                color: "gray",
                width: "100%",
                padding: "2px",
                textAlign: "center",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              2BHK starts from 85*Lacs
            </Typography>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: "25px",
                borderColor: "lightgray",
                marginX: "20px",
              }}
            />

            <Typography
              component="p"
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                color: "gray",
                width: "100%",
                padding: "2px",
                textAlign: "center",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              3BHK starts from 1.04*Cr.
            </Typography>
          </Grid>

          <Typography
            component="p"
            sx={{
              fontSize: "14px",
              color: "#000",
              marginBottom: "12px",
              marginTop: "12px",
            }}
          >
            Register Here And Avail The{" "}
            <span
              style={{
                color: "rgb(220, 53, 69)",
                animation: "blink 1s infinite",
              }}
            >
              Best Offers!!
            </span>
          </Typography>
          <style>
            {`
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
    `}
          </style>
          <Grid
            container
            item
            xs={11}
            display="flex"
            justifyContent="center"
            style={{
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              item
              xs={12}
              style={{ margin: "0px 0", border: "0px solid black" }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  // margin: "10px 0 0 0",
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "50px",
                  // border: "1px solid black",
                  marginBottom: "5px",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <TextField
                  type="text"
                  id="outlined-basic1"
                  value={userData.userName}
                  error={!!errorMsgs.userName}
                  helperText={errorMsgs?.userName || ""}
                  // onBlur={() => {
                  //   setIsDirty((d) => ({
                  //     ...d,
                  //     userName: true,
                  //   }));
                  // }}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      userName: e.target.value || "",
                    });
                  }}
                  placeholder="Full Name*"
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                    marginBottom: { xs: "10px", md: "0px" },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                />
                {/* <TextField
                  type="text"
                  id="outlined-basic2"
                  value={userData.phoneNo}
                  error={!!errorMsgs.phoneNo}
                  helperText={errorMsgs?.phoneNo || ""}
                  onBlur={() => {
                    setIsDirty((d) => ({
                      ...d,
                      phoneNo: true,
                    }));
                  }}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\D/g, "");
                    if (inputValue.length <= 10) {
                      setUserData({
                        ...userData,
                        phoneNo: inputValue,
                      });
                    }
                  }}
                  placeholder="Phone Number*"
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                    marginBottom: { xs: "5px", md: "0px" },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                /> */}
                <TextField
                  type="text"
                  id="outlined-basic2"
                  value={userData.phoneNo}
                  error={!!errorMsgs.phoneNo}
                  helperText={errorMsgs?.phoneNo || ""}
                  // onBlur={() => {
                  //   setIsDirty((d) => ({
                  //     ...d,
                  //     phoneNo: true,
                  //   }));
                  //   setErrorMsgs((prev) => ({
                  //     ...prev,
                  //     phoneNo:
                  //       userData.phoneNo.length === 10 &&
                  //       /^[6-9]\d{9}$/.test(userData.phoneNo)
                  //         ? ""
                  //         : "Phone number must start with 6-9 and be 10 digits long",
                  //   }));
                  // }}
                  onChange={(e) => {
                    let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

                    // Ensure the first digit is 6-9 and max length is 10
                    if (
                      inputValue.length === 1 &&
                      !/^[6-9]$/.test(inputValue)
                    ) {
                      return; // Prevent entering invalid first digit
                    }

                    if (inputValue.length <= 10) {
                      setUserData({
                        ...userData,
                        phoneNo: inputValue,
                      });
                    }
                  }}
                  placeholder="Phone Number*"
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                    marginBottom: { xs: "5px", md: "0px" },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} style={{ margin: "0px 0" }}>
              <Grid
                item
                xs={12}
                sx={{
                  // margin: "10px 0",
                  // borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  // alignItems: "center",
                  // border: "1px solid black",
                  minHeight: "50px",
                  marginBottom: "10px",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <TextField
                  type="email"
                  id="outlined-basic3"
                  value={userData.email}
                  error={!!errorMsgs.email}
                  helperText={errorMsgs?.email || ""}
                  // onBlur={() => {
                  //   setIsDirty((d) => ({
                  //     ...d,
                  //     email: false,
                  //   }));
                  // }}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      email: e.target.value || "",
                    });
                  }}
                  placeholder="Email"
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                    marginBottom: { xs: "10px", md: "0px" },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                />
                {/* <TextField
                  type="email"
                  id="outlined-basic3"
                  value={userData.email}
                  error={!!errorMsgs.email}
                  helperText={errorMsgs?.email || ""}
                  onBlur={() => {
                    setIsDirty((d) => ({
                      ...d,
                      email: false,
                    }));
                  }}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      email: e.target.value || "",
                    });
                  }}
                  placeholder="Email"
                  sx={{
                    width: "48%",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                /> */}
                <TextField
                  select
                  label="Type*"
                  name="Type*"
                  value={userData.bhkType}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      bhkType: e.target.value || "",
                    });
                  }}
                  sx={{
                    width: { xs: "100%", md: "48%" },
                    height: "39px",
                    "& .MuiOutlinedInput-root": {
                      height: "39px !important",
                      display: "flex",
                      alignItems: "center",
                      padding: "0px",
                    },
                    "& .MuiSelect-select": {
                      padding: "8px !important",
                      height: "39px",
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  size="small"
                >
                  <MenuItem value="2bhk">2 BHK - 85*Lacs onwards</MenuItem>
                  <MenuItem value="3bhk">3 BHK - 1.04*Cr onwards</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
              <LoadingButton
                loading={isLoading}
                onClick={() => submitForm()}
                sx={{
                  width: "100%",
                  height: "40px",
                  background: "#1976d2",
                  textTransform: "capitalize",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  borderRadius: "10px",
                }}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

Popupenquire.propTypes = {
  openEnquiry: PropTypes.bool.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};
