import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { useAddFormDataMutation } from "./reduxSlice/apiSlice";

const EMPTY_USERDATA = {
  userName: "",
  phoneNo: "",
  email: "",
};

const EMPTY_ISDIRTY = {
  userName: false,
  email: false,
  phoneNo: false,
};

const EMPTY_ERRORMSGS = {
  userName: "",
  email: "",
  phoneNo: "",
};

export const ERROR_TEXT = {
  EMPTY_FIELD: "Cannot be empty",
  GENERIC_SOMETHINGWRONG: "Please check this field",
  EMAIL_WRONGFORMAT: "Email should be in example@email.com format",
  EMAIL_ALREADYTAKEN:
    "This email already exists. Please provide a different one",
  PHNO_10NUMS: "Should have 10 numbers",
  PHNO_ALREADYTAKEN:
    "This number already exists. Please provide a different one",
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

function checkPhNoErrors(phoneNo) {
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

function checkUserNameErrors(userName) {
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

const getUtmParams = (pageQueryParams = {}) => {
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
  let adgroup = pageQueryParams?.utm_adgroup;
  if (Array.isArray(adgroup) && adgroup?.[0]) {
    [adgroup] = adgroup;
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
    adgroup,
  };
};

export default function useForm() {
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(EMPTY_USERDATA);
  const [isDirty, setIsDirty] = useState({
    userName: false,
    email: false,
    phoneNo: false,
  });
  const [errorMsgs, setErrorMsgs] = useState({
    userName: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (isDirty.email) {
      setErrorMsgs((m) => ({
        ...m,
        email: checkEmailErrors(userData?.email),
      }));
    }
    if (isDirty.phoneNo) {
      setErrorMsgs((m) => ({
        ...m,
        phoneNo: checkPhNoErrors(userData?.phoneNo),
      }));
    }
    if (isDirty.userName) {
      setErrorMsgs((m) => ({
        ...m,
        userName: checkUserNameErrors(userData?.userName),
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
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    const pageQueryParams = router?.query;
    const utmParams = getUtmParams(pageQueryParams);

    addFormData({ ...(userData || {}), utmParams })
      .unwrap()
      .then(() => {
        resetData();
        window.location.href = "/thanku";
      })
      .catch((err) => {
        let errMessage = ERROR_TEXT.TOAST_SOMETHINGWENTWRONG;
        if (err?.data?.status === 3001) {
          errMessage = ERROR_TEXT.EMAIL_ALREADYTAKEN;
          setErrorMsgs((m) => ({
            ...m,
            email: ERROR_TEXT.EMAIL_ALREADYTAKEN,
          }));
        }
        if (err?.data?.status === 3002) {
          errMessage = ERROR_TEXT.PHNO_ALREADYTAKEN;
          setErrorMsgs((m) => ({
            ...m,
            phoneNo: ERROR_TEXT.PHNO_ALREADYTAKEN,
          }));
        }
        enqueueSnackbar({
          variant: "error",
          message: errMessage,
        });
      });
  };

  return {
    userData,
    errorMsgs,
    isLoading,
    setUserData,
    setIsDirty,
    submitForm,
  };
}
