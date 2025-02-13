import express from "express";
const router = express.Router();

import request from "request";
import multer from "multer";
import cron from "node-cron";
import fetch from "node-fetch";

import Token from "../model/token.js";

// generate token
const generateToken = async () => {
  try {
    const options = {
      refresh_token: process.env.refresh_token,
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      grant_type: process.env.grant_type,
    };

    var formBody = [];
    for (var option in options) {
      var encodedKey = encodeURIComponent(option);
      var encodedValue = encodeURIComponent(options[option]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (response.status === 200) {
      const data = await response.json();
      await Token.deleteMany(); // Delete existing tokens
      const newToken = new Token({ token: data.access_token });
      await newToken.save();
    } else {
      console.log(
        "Failed to fetch token:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
cron.schedule("*/10 * * * *", generateToken);

// generate token manually
router.get("/token/generate", async (req, res) => {
  try {
    let latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
    if (!latestToken) {
      await generateToken();
      latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
    }
    return res.json({ token: latestToken.token });
  } catch (error) {
    console.error("Error fetching or generating token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET token
router.get("/token", async (req, res) => {
  try {
    const token = await Token.find({});
    if (!token) {
      return res.status(400).json({ message: "Failed to fetch token" });
    } else {
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

// GET request
router.get("/proxy", (req, res) => {
  let url = req.query.url;
  const email = req.query.email;
  const authorization = req.header("Authorization");
  //
  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  //
  const headers = {
    Authorization: authorization,
  };
  if (email) {
    const urlObj = new URL(url);
    urlObj.searchParams.append("email", email);
    url = urlObj.toString();
  }

  const options = {
    url: url,
    headers: headers,
  };
  request(options).pipe(res);
});

// POST request
const upload = multer();
router.post("/proxy", upload.any(), async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
});

// PUT request
router.put("/proxy", upload.any(), async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
});

//
async function fetchAllPages(
  zohoURL,
  authorization,
  accumulatedData = [],
  page = 1
) {
  try {
    // Append or update the page parameter in URL
    const apiUrl = new URL(zohoURL);
    apiUrl.searchParams.set("page", page);

    // Fetch data from the given URL
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: { Authorization: authorization },
    });

    // Handle 204 No Content case
    if (response.status === 204) {
      return []; // Return empty array immediately
    }

    // Read response text to check if it's empty
    const text = await response.text();

    if (!text) {
      return [];
    }

    // Parse JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      return []; // Return empty array if parsing fails
    }

    if (!data || !data.data) {
      return accumulatedData; // Return already fetched data if no valid response
    }

    // Store current page data
    accumulatedData.push(...data.data);

    // Check if there are more records
    if (data.info?.more_records) {
      return await fetchAllPages(
        zohoURL,
        authorization,
        accumulatedData,
        page + 1
      );
    }
    accumulatedData.map((obj) => {
      for (let i in obj) {
        if (obj[i] === null) {
          obj[i] = "-";
        }
      }
    });
    return accumulatedData;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return []; // Return empty array in case of error
  }
}

router.get("/data-proxy", async (req, res) => {
  try {
    const { zohoURL } = req.query;
    const authorization = req.header("Authorization");

    if (!zohoURL) {
      return res
        .status(400)
        .json({ error: "'url' query parameter is required" });
    }

    if (!authorization) {
      return res
        .status(401)
        .json({ error: "Authorization header is required" });
    }

    const results = await fetchAllPages(zohoURL, authorization);

    return res.json({ data: results });
  } catch (error) {
    console.error("Error in proxy:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
