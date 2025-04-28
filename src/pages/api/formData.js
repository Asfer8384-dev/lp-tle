import Joi from "joi";
import axios from "axios";
import handler from "../../lib/handler";
import config from "../../lib/config";
import { LpLead } from "../../../models/lplead";

export default handler({ checkAuthenticated: true }).post(async (req, res) => {
  req.validate(
    req.body,
    Joi.object({
      userName: Joi.string(),
      email: Joi.string().allow("").optional(),
      phoneNo: Joi.string(),
      source: Joi.string(),
      bhkType: Joi.string().valid("none", "2bhk", "3bhk"),
      utmParams: Joi.object({
        source: Joi.string(),
        subSource: Joi.string(),
        medium: Joi.string(),
        campaign: Joi.string(),
        content: Joi.string(),
        ad: Joi.string(),
        adgroup: Joi.string(),
        keyword: Joi.string(),
        device: Joi.string(),
        location: Joi.string(),
      }),
    })
  );

  const {
    userName,
    email,
    phoneNo,
    bhkType,
    utmParams: {
      source,
      medium,
      campaign,
      content,
      subSource,
      adGroup,
      keyword,
      device,
      location,
      adgroup,
    },
  } = req.body;
  let leadId;
  let leadPushedWithoutEmail = false;
  try {
    const leadDbResult = await new LpLead({
      FirstName: userName,
      EmailAddress: email,
      BHkType: bhkType,
      Phone: phoneNo,
      Source: source,
      SourceMedium: medium,
      SourceCampaign: campaign,
      SourceContent: content,
    }).save();
    leadId = leadDbResult?._id;
    console.log(leadDbResult);
  } catch (err) {
    console.log("Error saving to db");
  }

  const { lsqConfig } = config;
  const postBody = [
    {
      Attribute: "FirstName",
      Value: userName,
    },
    {
      Attribute: "EmailAddress",
      Value: email,
    },
    {
      Attribute: "Phone",
      Value: phoneNo,
    },
    {
      Attribute: "Source",
      Value: source,
    },
    ...(adgroup
      ? [
          {
            Attribute: "mx_Ad_Group",
            Value: adgroup,
          },
        ]
      : []),
    ...(bhkType
      ? [
          {
            Attribute: "mx_Preferred_BHK",
            Value: bhkType,
          },
        ]
      : []),
    ...(keyword
      ? [
          {
            Attribute: "mx_Term_Value",
            Value: keyword,
          },
        ]
      : []),
    ...(device
      ? [
          {
            Attribute: "mx_Device_Name",
            Value: device,
          },
        ]
      : []),
    ...(location
      ? [
          {
            Attribute: "mx_Location",
            Value: location,
          },
        ]
      : []),
    ...(subSource
      ? [
          {
            Attribute: "mx_First_Sub_Source",
            Value: subSource,
          },
        ]
      : []),
    ...(campaign
      ? [
          {
            Attribute: "SourceCampaign",
            Value: campaign,
          },
        ]
      : []),

    ...(medium
      ? [
          {
            Attribute: "SourceMedium",
            Value: medium,
          },
        ]
      : []),

    ...(content
      ? [
          {
            Attribute: "SourceContent",
            Value: content,
          },
        ]
      : []),
  ];
  const lsqStatues = {
    created: "created",
    updated: "updated",
    error: "error",
  };
  const query = {
    LsqStatus: "",
    LsqResponse: "",
    IsLeadPushedWithoutEmail: leadPushedWithoutEmail,
  };

  const promise = axios
    .post(lsqConfig.apiUrl, postBody, {
      params: {
        accessKey: lsqConfig.accessKey,
        secretKey: lsqConfig.secretKey,
      },
    })
    .then(async (result) => {
      query.LsqStatus = result?.data?.Message?.IsCreated
        ? lsqStatues?.created
        : lsqStatues?.updated;
      query.LsqResponse = result?.data?.Status;
      await LpLead.updateOne({ _id: leadId }, query);
    })
    .catch(async (err) => {
      const lsqMsg = err?.response?.data?.ExceptionMessage;
      query.LsqStatus = lsqStatues?.error;
      query.LsqResponse = lsqMsg;
      const bodyWithoutEmail = (postBody || []).filter(
        (obj) => obj?.Attribute !== "EmailAddress"
      );
      const lsqResult = await axios.post(lsqConfig.apiUrl, bodyWithoutEmail, {
        params: {
          accessKey: lsqConfig.accessKey,
          secretKey: lsqConfig.secretKey,
        },
      });
      if (lsqResult?.data?.Status === "Success") {
        leadPushedWithoutEmail = true;
        query.IsLeadPushedWithoutEmail = true;
      }

      const dbResult = await LpLead.updateOne({ _id: leadId }, query);
      console.log(dbResult);

      if (!leadPushedWithoutEmail) {
        throw err;
      }
    });
  res.sendPromise(promise);
});
