import fetch from "node-fetch";

// no of debtors
export const noOfDebtors = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Leads/${customerID}/Debtors_Details?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, code: 401, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// number of invoices
export const noOfInvoices = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID}))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.status === 200) {
      const data = await response.json();
      const revised = data.data.map((item) => {
        const newObj = {};
        Object.keys(item).forEach((key) => {
          newObj[key] = item[key] === null ? "" : item[key];
        });
        return newObj;
      });
      return res.status(200).json({
        success: true,
        result: revised,
      });
    } else if (response.status === 401) {
      return res
        .status(200)
        .json({ success: false, code: 401, message: "Token expired" });
    } else if (response.status === 400) {
      return res.status(200).json({
        success: false,
        code: 400,
        message: "Token limits reached. Please try again after sometime.",
      });
    } else if (response.status === 204) {
      return res.status(200).json({
        success: false,
        code: 204,
        message: "No data found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// cash collected
export const cashCollected = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Partially. Paid,Paid))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// promise to pay
export const promiseToPay = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Promise To Pay))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// merits of cases
export const meritsOfCases = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${customerID})and(Debtor_Status:equals:Merit of the case))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// legal case
export const legalCase = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Legal Case))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// abscond cases
export const abscond = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${customerID})and(Debtor_Status:equals:Client Terminated,Company Closed,Refuse to Pay,TC Terminated))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// live invoices
export const liveInvoices = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Live))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// disputed
export const disputed = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:Disputed))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// visited
export const visited = async (req, res) => {
  try {
    const { token, customerID, page } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${customerID})and(Invoice_Status:equals:FOS Visited))&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    //
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        const revised = data.data.map((item) => {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            newObj[key] = item[key] === null ? "" : item[key];
          });
          return newObj;
        });
        return res.status(200).json({
          success: true,
          result: revised,
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
          code: 204,
          message: "No data found",
        });
      }
    } else {
      const data = await response.json();
      return res.status(200).json({
        success: false,
        message: "Something went wrong",
        result: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
