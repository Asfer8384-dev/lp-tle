import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useAddFormDataMutation } from "../../reduxSlice/apiSlice";
import { themeColor } from "..";

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
  if (!/^\d{10}$/.test(phoneNo)) {
    return ERROR_TEXT.PHNO_10NUMS;
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

export default function BottomEnquire({ setIsSelectForm }) {
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(EMPTY_USERDATA);
  const [isDirty, setIsDirty] = useState(EMPTY_ISDIRTY);
  const [errorMsgs, setErrorMsgs] = useState(EMPTY_ERRORMSGS);

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
    }
  }, [isDirty, userData]);

  const resetData = () => {
    setUserData(EMPTY_USERDATA);
    setIsDirty(EMPTY_ISDIRTY);
    setErrorMsgs(EMPTY_ERRORMSGS);
  };

  const router = useRouter();

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.phoneNo || errorMsgs?.bhkType) {
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

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        position: "relative",
        height: "fit-content",
        gap: { xs: "20px", md: "0px" },
      }}
    >
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "#156435",
            paddingX: "20px",
            paddingY: "13px",
            // border: "1px solid white",
            gap: "20px",
          }}
        >
          <Grid item xs={1.9}>
            <TextField
              type="text"
              id="outlined-basi01"
              value={userData.userName}
              error={!!errorMsgs.userName}
              helperText={errorMsgs?.userName || ""}
              // onBlur={() => {
              //   setIsDirty((d) => ({
              //     ...d,
              //     userName: true,
              //   }));
              // }}
              onFocus={() => {
                setIsSelectForm(true); // When clicked or focused
              }}
              onBlur={() => {
                if (!userData.userName) {
                  setIsSelectForm(false);
                }

                setIsDirty((d) => ({
                  ...d,
                  userName: true,
                }));
              }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  userName: e.target.value || "",
                });
              }}
              placeholder="Full Name*"
              sx={{
                input: {
                  color: "#000000",
                },
                width: "100%",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  background: "#ffffff",
                  padding: "6px",
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
            />
          </Grid>
          <Grid item xs={1.9}>
            {/* <TextField
              type="text"
              id="outlined-basic02"
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
                input: {
                  color: "#000000",
                },
                width: "100%",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  background: "#ffffff",
                  padding: "6px",
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
              type="text"
              id="outlined-basic2"
              value={userData.phoneNo}
              error={!!errorMsgs.phoneNo}
              helperText={errorMsgs?.phoneNo || ""}
              onFocus={() => {
                setIsSelectForm(true); // When clicked or focused
              }}
              // onBlur={() => {
              //   if (!userData.bhkType) {
              //     setIsSelectForm(false);
              //   },
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
              onBlur={() => {
                if (!userData.phoneNo) {
                  setIsSelectForm(false);
                }

                setIsDirty((d) => ({
                  ...d,
                  phoneNo: true,
                }));

                setErrorMsgs((prev) => ({
                  ...prev,
                  phoneNo:
                    userData.phoneNo.length === 10 &&
                    /^[6-9]\d{9}$/.test(userData.phoneNo)
                      ? ""
                      : "Phone number must start with 6-9 and be 10 digits long",
                }));
              }}
              onChange={(e) => {
                let inputValue = e.target.value.replace(/\D/g, "");

                if (inputValue.length === 1 && !/^[6-9]$/.test(inputValue)) {
                  return;
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
                width: { xs: "100%", md: "100%" },
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
          <Grid item xs={1.9}>
            <TextField
              type="email"
              id="outlined-basic03"
              value={userData.email}
              // error={!!errorMsgs.email}
              // helperText={errorMsgs?.email || ""}
              onFocus={() => {
                setIsSelectForm(true); // When clicked or focused
              }}
              onBlur={() => {
                if (!userData.email) {
                  setIsSelectForm(false);
                }

                setIsDirty((d) => ({
                  ...d,
                  email: true,
                }));
              }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value || "",
                });
              }}
              placeholder="Email ID"
              sx={{
                input: {
                  color: "#000000",
                },
                width: "100%",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  background: "#ffffff",
                  padding: "6px",
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
            />
          </Grid>
          <Grid item xs={1.9}>
            {/* <TextField
              select
              label="Type*"
              name="Type*"
              value={userData.bhkType}
              error={!!errorMsgs.bhkType}
              helperText={errorMsgs?.bhkType || ""}
              onFocus={() => {
                setIsSelectForm(true); // When clicked or focused
              }}
              onBlur={() => {
                if (!userData.bhkType) {
                  setIsSelectForm(false);
                }

                setIsDirty((d) => ({
                  ...d,
                  bhkType: true,
                }));
              }}
              sx={{
                width: { xs: "100%", md: "100%" },
                height: "39px",
                "& .MuiOutlinedInput-root": {
                  height: "39px !important",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px",
                  color: "black",
                  backgroundColor: "#ffffff", // <-- Add this line
                },
                "& .MuiSelect-select": {
                  padding: "8px !important",
                  height: "39px",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                },
                input: {
                  color: "black",
                },
              }}
              size="small"
            >
              <MenuItem value="2bhk">2 BHK - 85*Lacs onwards</MenuItem>
              <MenuItem value="3bhk">3 BHK - 1.04*Cr onwards</MenuItem>
            </TextField> */}
            <TextField
              select
              label="Type*"
              name="Type*"
              value={userData.bhkType}
              error={!!errorMsgs.bhkType}
              helperText={errorMsgs?.bhkType || ""}
              onFocus={() => {
                setIsSelectForm(true);
              }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  bhkType: e.target.value || "",
                });
              }}
              onBlur={() => {
                if (!userData.bhkType) {
                  setIsSelectForm(false);
                }

                setIsDirty((d) => ({
                  ...d,
                  bhkType: true,
                }));
              }}
              sx={{
                width: { xs: "100%", md: "100%" },
                "& .MuiOutlinedInput-root": {
                  height: "39px !important",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px",
                  backgroundColor: "#ffffff",
                  color: "black",
                },
                "& .MuiInputBase-input": {
                  color: "black", // <-- This sets the selected text color
                  padding: "8px !important",
                },
                "& .MuiSelect-select": {
                  padding: "8px !important",
                  display: "flex",
                  alignItems: "center",
                  color: "black", // <-- Also important here
                },
                "& .MuiSvgIcon-root": {
                  color: "black", // <-- Optional: make dropdown arrow black too
                },
              }}
              size="small"
            >
              <MenuItem value="2bhk" sx={{ color: "black" }}>
                2 BHK - 85*Lacs onwards
              </MenuItem>
              <MenuItem value="3bhk" sx={{ color: "black" }}>
                3 BHK - 1.04*Cr onwards
              </MenuItem>
            </TextField>
          </Grid>

          {/* <Grid item xs={3.6}>
            <FormControlLabel
              control={<Checkbox sx={{ color: "#fff" }} />}
              label={
                <Typography variant="body2" color={"#fff"}>
                  I authorize Urbanrise to contact me via call, SMS, email, or
                  WhatsApp, even if my number is on DND.
                </Typography>
              }
            />
          </Grid> */}

          <Grid item xs={1}>
            <LoadingButton
              onClick={() => submitForm()}
              loading={isLoading}
              variant="contained"
              sx={{
                textTransform: "none",
                padding: "8px 20px",
                fontWeight: "bold",
                background: "primary",
                borderRadius: "10px",
                color: "#fff",
                ":hover": {
                  background: "primary",
                  color: "#000000",
                },
              }}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
