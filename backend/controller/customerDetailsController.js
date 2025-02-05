import fetch from "node-fetch";
import Documents from "../model/documentsSchema.js";

export const businessDetails = async (req, res) => {
  try {
    const {
      customerID,
      website,
      entity,
      whatsapp,
      position,
      building,
      city,
      street,
      tradeLicenseNumber,
      msmeRegistered,
      msmeNumber,
      token,
    } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Leads/${customerID}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        body: JSON.stringify({
          data: [
            {
              Website: website,
              Type_of_Entity: entity,
              WhatsApp_Number: whatsapp,
              Position: position,
              Flat_no_Building_name: building,
              City: city,
              Street: street,
              CIN: tradeLicenseNumber,
              MSME: msmeRegistered,
              MSME_Certificate: msmeRegistered,
              MSME_Number: msmeNumber,
              Step: "1",
              //
              flat_no: "",
              state: "",
              telephone_no: "",
              aadhar_no: "",
              pan_no: "",
              gst_no: "",
              created_at: "",
            },
          ],
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return res
        .status(200)
        .json({ success: true, message: "Details saved", result: data });
    } else {
      const data = await response.json();
      console.log(response.status);
      //
      if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
          result: data,
        });
      } else if (response.status === 401) {
        return res.status(200).json({
          success: false,
          code: 401,
          message: "Token expired. Please try again",
          result: data,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const bankDetails = async (req, res) => {
  try {
    const {
      bankName,
      accountNumber,
      accountType,
      IFSC,
      branch,
      nameOnBankAccount,
      customerID,
      token,
    } = req.body;
    //
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Leads/${customerID}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        body: JSON.stringify({
          data: [
            {
              Bank_Name: bankName,
              Account_Number: accountNumber,
              Account_Type: accountType,
              IFSC: IFSC,
              Branch_Name: branch,
              Name_on_Account: nameOnBankAccount,
              Step: "2",
            },
          ],
        }),
      }
    );
    //
    if (response.ok) {
      const data = await response.json();
      return res
        .status(200)
        .json({ success: true, message: "Details saved", result: data });
    } else {
      const data = await response.json();
      //
      if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
          result: data,
        });
      } else if (response.status === 401) {
        return res.status(200).json({
          success: false,
          code: 401,
          message: "Token expired. Please try again",
          result: data,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadDocuments = async (req, res) => {
  try {
    const { tradeLicenseNumber, msmeNumber, cancelledCheque } = req.files;

    const newDocuments = new Documents({
      tradeLicenseNumber: tradeLicenseNumber[0],
      msmeNumber: msmeNumber[0],
      cancelledCheque: cancelledCheque[0],
    });
    await newDocuments.save();
    return res.status(200).json({
      success: true,
      message: "Documents uploaded",
      result: {
        tradeLicenseNumberURL: newDocuments.tradeLicenseNumber.filename,
        msmeNumberURL: newDocuments.msmeNumber.filename,
        cancelledChequeURL: newDocuments.cancelledCheque.filename,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmDocuments = async (req, res) => {
  try {
    const {
      tradeLicenseNumber,
      msmeNumber,
      cancelledCheque,
      customerID,
      token,
    } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Leads/${customerID}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        body: JSON.stringify({
          data: [
            {
              CIN_Number_URL: tradeLicenseNumber,
              Cancel_Cheque_URL: cancelledCheque,
              MSME_Number_URL: msmeNumber,
              Step: "3",
              //
              Pan_Card_URL: "",
              Aadhar_Card_URL: "",
              GST_URL: "",
              Company_Pan_URL: "",
              Discription: "",
            },
          ],
        }),
      }
    );
    //
    if (response.ok) {
      const data = await response.json();
      return res
        .status(200)
        .json({ success: true, message: "Documents uploaded", result: data });
    } else {
      const data = await response.json();
      //
      if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
          result: data,
        });
      } else if (response.status === 401) {
        return res.status(200).json({
          success: false,
          code: 401,
          message: "Token expired. Please try again",
          result: data,
        });
      }
    }
  } catch (error) {
    console.log(first);
  }
};
