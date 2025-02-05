import express from "express";
const router = express.Router();

import multer from "multer";

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

export default router;
