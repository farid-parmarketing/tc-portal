import fetch from "node-fetch";

export const deleteDetails = async (req, res) => {
  try {
    const {
      token,
      Full_Name,
      Email,
      Phone_Number,
      Company_Name,
      List_Delete_Data,
    } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Delete_App_Data`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        body: JSON.stringify({
          data: [
            {
              Full_Name,
              Email,
              Phone_Number,
              Company_Name,
              List_Delete_Data,
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
        .json({ success: true, message: "Data saved", result: data });
    } else {
      if (response.status === 400) {
        return res.status(200).json({
          success: false,
          code: 400,
          message: "Token limits reached. Please try again after sometime.",
        });
      } else if (response.status === 401) {
        return res.status(200).json({
          success: false,
          code: 401,
          message: "Token expired. Please try again",
        });
      }
      F;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
