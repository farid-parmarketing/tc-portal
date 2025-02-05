import fetch from "node-fetch";

const GenerateTokenController = async (req, res) => {
  try {
    const options = {
      refresh_token: process.env.refresh_token,
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      grant_type: process.env.grant_type,
    };
    //
    var formBody = [];
    for (var option in options) {
      var encodedKey = encodeURIComponent(option);
      var encodedValue = encodeURIComponent(options[option]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //
    const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
    //
    const data = await response.json();
    //
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export default GenerateTokenController;
