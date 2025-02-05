import fetch from "node-fetch";
export const addNewDebtor = async (req, res) => {
  const {
    customerID,
    token,
    clientBusinessName,
    companyName,
    mobile,
    email,
    whatsapp,
    telephone,
    position,
    city,
    stillTrading,
    balanceOutstanding,
    businessAddress,
    homeAddress,
    tradeLicenseNumber,
    typeOfCompany,
    notes,
  } = req.body;
  //
  const response = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtors_Details`,
    {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      body: JSON.stringify({
        data: [
          {
            Lead: customerID,
            Client_Company_Name: clientBusinessName,
            Name: companyName,
            Debtor_Phone_Number: mobile,
            Email: email,
            WhatsApp_Number: whatsapp,
            Debtor_Land_Line: telephone,
            Position_In_business: position,
            Debtor_City: city,
            Business_Still_trading: stillTrading,
            Balance_O_D: balanceOutstanding,
            Address_Of_Business: businessAddress,
            Home_Address_Of_Debtor: homeAddress,
            GST_number_of_Debtors_business: tradeLicenseNumber,
            Type_Of_Company: typeOfCompany,
            Debtors_Notes: notes,
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
};
