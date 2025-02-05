import fetch from "node-fetch";

export const getLengths = async (req, res) => {
  const { token, customerID } = req.body;
  //
  const response1 = await fetch(
    `https://www.zohoapis.in/crm/v2/Leads/${customerID}/Debtors_Details?page=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response2 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID}))&page=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response3 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Partially. Paid,Paid))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response4 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Promise To Pay))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response5 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${customerID})and(Debtor_Status:equals:Merit of the case))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response6 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Legal Case))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response7 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${customerID})and(Debtor_Status:equals:Client Terminated,Company Closed,Refuse to Pay,TC Terminated))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response8 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Live))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response9 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Disputed))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const response10 = await fetch(
    `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:FOS Visited))`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );
  //
  const lengths = {
    noOfDebtors: 0,
    noOfInvoices: 0,
    cashCollected: 0,
    promiseTopay: 0,
    meritsOfCases: 0,
    legalActions: 0,
    abscondedCases: 0,
    liveInvoices: 0,
    disputedInvoices: 0,
    fieldVisits: 0,
  };
  //
  if (response1.status === 200) {
    const data1 = await response1.json();
    lengths.noOfDebtors = data1.data.length;
  }
  if (response2.status === 200) {
    const data2 = await response2.json();
    lengths.noOfInvoices = data2.data.length;
  }
  if (response3.status === 200) {
    const data3 = await response3.json();
    let amountPaid = 0;
    data3.data.forEach((item) => {
      amountPaid += item.Amount_Paid;
    });
    lengths.cashCollected = amountPaid;
  }
  if (response4.status === 200) {
    const data4 = await response4.json();
    let promised = 0;
    data4.data.forEach((item) => {
      promised += item.Promise_to_Pay_Amount;
    });
    lengths.promiseTopay = promised;
  }
  if (response5.status === 200) {
    const data5 = await response5.json();
    lengths.meritsOfCases = data5.data.length;
  }
  if (response6.status === 200) {
    const data6 = await response6.json();
    lengths.legalActions = data6.data.length;
  }
  if (response7.status === 200) {
    const data7 = await response7.json();
    lengths.abscondedCases = data7.data.length;
  }
  if (response8.status === 200) {
    const data8 = await response8.json();
    lengths.liveInvoices = data8.data.length;
  }
  if (response9.status === 200) {
    const data9 = await response9.json();
    lengths.disputedInvoices = data9.data.length;
  }
  if (response10.status === 200) {
    const data10 = await response10.json();
    lengths.fieldVisits = data10.data.length;
  }
  if (
    response1.status === 401 ||
    response2.status === 401 ||
    response3.status === 401 ||
    response4.status === 401 ||
    response5.status === 401 ||
    response6.status === 401 ||
    response7.status === 401 ||
    response8.status === 401 ||
    response9.status === 401 ||
    response10.status === 401
  ) {
    return res
      .status(200)
      .json({ success: false, code: 401, message: "Token expired" });
  } else if (
    response1.status === 400 ||
    response2.status === 400 ||
    response3.status === 400 ||
    response4.status === 400 ||
    response5.status === 400 ||
    response6.status === 400 ||
    response7.status === 400 ||
    response8.status === 400 ||
    response9.status === 400 ||
    response10.status === 400
  ) {
    return res
      .status(200)
      .json({ success: false, code: 400, message: "Token limit reached" });
  } else {
    return res.status(200).json({ success: true, result: lengths });
  }
};
