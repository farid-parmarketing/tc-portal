import fetch from "node-fetch";

// sign up
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, companyName, token } =
      req.body;
    const response = await fetch(`https://www.zohoapis.in/crm/v2/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      body: JSON.stringify({
        data: [
          {
            First_Name: firstName,
            Last_Name: lastName,
            Full_Name: `${firstName} ${lastName}`,
            Email: email,
            Password: password,
            Mobile: mobile,
            Company: companyName,
            Created_Time: "",
          },
        ],
      }),
    });
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Account created" });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, message: "Server error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password, token } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Email:equals:${email}))`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, message: "Token expired" });
      }
      //
      const data = await response.json();
      if (data.data[0].Password === password) {
        //
        for (const key in data.data[0]) {
          if (data.data[0][key] === null) {
            data.data[0][key] = "";
          }
        }
        //
        return res.status(200).json({
          success: true,
          message: "Login successful",
          result: data.data[0],
        });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "Account not found" });
  }
};

// get user
export const getUser = async (req, res) => {
  try {
    const { customerID, token } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Leads/${customerID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    if (response.ok) {
      if (response.status === 401) {
        return res
          .status(200)
          .json({ success: false, code: 400, message: "Token expired" });
      } else if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limit reached",
        });
      } else if (response.status === 200) {
        const data = await response.json();
        for (const key in data.data[0]) {
          if (data.data[0][key] === null) {
            data.data[0][key] = "";
          }
        }
        //
        return res.status(200).json({
          success: true,
          message: "Login successful",
          result: data.data[0],
        });
      } else if (response.status === 204) {
        return res.status(200).json({
          success: false,
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
    return res
      .status(200)
      .json({ success: false, message: "Account not found" });
  }
};

// edit profile
export const editProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const { profilePic } = req.file;
  } catch (error) {
    console.log(error);
  }
};
