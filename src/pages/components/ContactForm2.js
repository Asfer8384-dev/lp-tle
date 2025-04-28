import React, { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
} from "@mui/material";
import { useAddFormDataMutation } from "../../reduxSlice/apiSlice";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

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

  return {
    source,
    medium,
    campaign,
    content,
    ad,
  };
};

export default function ContactForm2() {
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();
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

  const formRef = useRef(null);
  useEffect(() => {
    import("gsap").then((gsap) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.default.registerPlugin(ScrollTrigger);

        const getStartPosition = () =>
          window.innerWidth < 768 ? "top 95%" : "top 85%";

        gsap.default.fromTo(
          formRef.current,
          { y: 160, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: getStartPosition(),
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }, []);

  return (
    <Box
      id="contact"
      sx={{
        // backgroundImage: "url('/images/new-york-city.jpg')",
        // backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: { md: "90vh", xs: "40vh" },
        display: { xs: "flex", md: "none" },
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        mt: { md: 0, xs: "0px" },
        padding: { xs: "10px", sm: "0px", md: "0px" },
        boxShadow: "none",
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 283.5 27.8"
        preserveAspectRatio="xMidYMax slice"
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "auto",
          zIndex: 1,
        }}
      >
        <path
          fill="white"
          d="M0 0v6.7c1.9-.8 4.7-1.4 8.5-1 9.5 1.1 11.1 6 11.1 6s2.1-.7 4.3-.2c2.1.5 2.8 2.6 2.8 2.6s.2-.5 1.4-.7c1.2-.2 1.7.2 1.7.2s0-2.1 1.9-2.8c1.9-.7 3.6.7 3.6.7s.7-2.9 3.1-4.1 4.7 0 4.7 0 1.2-.5 2.4 0 1.7 1.4 1.7 1.4h1.4c.7 0 1.2.7 1.2.7s.8-1.8 4-2.2c3.5-.4 5.3 2.4 6.2 4.4.4-.4 1-.7 1.8-.9 2.8-.7 4 .7 4 .7s1.7-5 11.1-6c9.5-1.1 12.3 3.9 12.3 3.9s1.2-4.8 5.7-5.7c4.5-.9 6.8 1.8 6.8 1.8s.6-.6 1.5-.9c.9-.2 1.9-.2 1.9-.2s5.2-6.4 12.6-3.3c7.3 3.1 4.7 9 4.7 9s1.9-.9 4 0 2.8 2.4 2.8 2.4 1.9-1.2 4.5-1.2 4.3 1.2 4.3 1.2.2-1 1.4-1.7 2.1-.7 2.1-.7-.5-3.1 2.1-5.5 5.7-1.4 5.7-1.4 1.5-2.3 4.2-1.1c2.7 1.2 1.7 5.2 1.7 5.2s.3-.1 1.3.5c.5.4.8.8.9 1.1.5-1.4 2.4-5.8 8.4-4 7.1 2.1 3.5 8.9 3.5 8.9s.8-.4 2 0 1.1 1.1 1.1 1.1 1.1-1.1 2.3-1.1 2.1.5 2.1.5 1.9-3.6 6.2-1.2 1.9 6.4 1.9 6.4 2.6-2.4 7.4 0c3.4 1.7 3.9 4.9 3.9 4.9s3.3-6.9 10.4-7.9 11.5 2.6 11.5 2.6.8 0 1.2.2c.4.2.9.9.9.9s4.4-3.1 8.3.2c1.9 1.7 1.5 5 1.5 5s.3-1.1 1.6-1.4c1.3-.3 2.3.2 2.3.2s-.1-1.2.5-1.9 1.9-.9 1.9-.9-4.7-9.3 4.4-13.4c5.6-2.5 9.2.9 9.2.9s5-6.2 15.9-6.2 16.1 8.1 16.1 8.1.7-.2 1.6-.4V0H0z"
        />
      </Box>
      <Paper
        ref={formRef}
        elevation={6}
        sx={{
          //   mt: { md: 9, xs: 5 },
          paddingY: "20px",
          paddingX: "20px",
          width: { md: "350px", xs: "100%" },
          textAlign: "center",
          //   borderTopLeftRadius: "80px",
          //   borderBottomRightRadius: "80px",
          boxShadow: "none",
          // border: "1px solid lightgray",
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{
            background:
              "linear-gradient(90deg, rgba(21, 100, 53, 1) 0%, rgba(0, 162, 216, 1) 50%, rgba(21, 100, 53, 1) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Old Standard TT",
          }}
        >
          Enquire Now
        </Typography>
        <form>
          <TextField
            type="text"
            id="outlined-basic1"
            value={userData.userName}
            error={!!errorMsgs.userName}
            helperText={errorMsgs?.userName || ""}
            onBlur={() => {
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
              margin: "10px 0 0 0",
              width: "100%",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root .MuiInputBase-input": {
                background: "#ffffff",
                padding: "8px",
                borderRadius: "5px",
                boxShadow: "none",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "12px",
              },
              marginBottom: "15px",
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
              setUserData({
                ...userData,
                phoneNo: e.target.value || "",
              });
            }}
            placeholder="Phone*"
            sx={{
              margin: "20px 0 0 0",
              width: "100%",
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
              let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

              // Ensure the first digit is 6-9 and max length is 10
              if (inputValue.length === 1 && !/^[6-9]$/.test(inputValue)) {
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
              width: { xs: "100%", md: "100%" },
              marginBottom: "15px",
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
          />

          <TextField
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
              //   margin: "20px 0 0 0",
              width: "100%",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root .MuiInputBase-input": {
                background: "#ffffff",
                padding: "8px",
                borderRadius: "5px",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "12px",
              },
              marginBottom: "15px",
            }}
            InputProps={{
              sx: {
                height: "40px",
              },
            }}
            variant="outlined"
          />
          <TextField
            onBlur={() => {
              setIsDirty((d) => ({
                ...d,
                bhkType: true,
              }));
            }}
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
              width: { xs: "100%", md: "100%" },
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
          <LoadingButton
            loading={isLoading}
            onClick={() => submitForm()}
            style={{
              width: "100%",
              height: "40px",
              background: "primary",
              textTransform: "capitalize",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
              margin: "40px 0 0 0",
              fontFamily: "Open Sans",
            }}
            variant="contained"
          >
            SUBMIT
          </LoadingButton>
        </form>
      </Paper>
    </Box>
  );
}
