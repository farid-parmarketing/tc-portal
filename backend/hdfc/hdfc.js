const fs = require("fs");
const express = require("express");
const { Juspay, APIError } = require("expresscheckout-nodejs");
const SANDBOX_BASE_URL = "https://smartgatewayuat.hdfcbank.com";
const PRODUCTION_BASE_URL = "https://smartgateway.hdfcbank.com";
const config = require("./config.json");
const publicKey = fs.readFileSync(config.PUBLIC_KEY_PATH);
const privateKey = fs.readFileSync(config.PRIVATE_KEY_PATH);
const paymentPageClientId = config.PAYMENT_PAGE_CLIENT_ID;

const juspay = new Juspay({
  merchantId: config.MERCHANT_ID,
  baseUrl: SANDBOX_BASE_URL,
  jweAuth: {
    keyId: config.KEY_UUID,
    publicKey,
    privateKey,
  },
});

app.post("/initiateJuspayPayment", async (req, res) => {
  const orderId = `order_${Date.now()}`;
  const amount = (1 + Math.random() * 100) | 0;

  // makes return url
  const returnUrl = `http://localhost:3000/handleJuspayResponse`;

  try {
    const sessionResponse = await juspay.orderSession.create({
      order_id: orderId,
      amount: amount,
      payment_page_client_id: paymentPageClientId, // [required] shared with you, in config.json
      customer_id: "hdfc-testing-customer-one", // [optional] your customer id here
      action: "paymentPage", // [optional] default is paymentPage
      return_url: returnUrl, // [optional] default is value given from dashboard
      currency: "INR", // [optional] default is INR
    });

    // removes http field from response, typically you won't send entire structure as response
    return res.json(makeJuspayResponse(sessionResponse));
  } catch (error) {
    if (error instanceof APIError) {
      // handle errors comming from juspay's api
      return res.json(makeError(error.message));
    }
    return res.json(makeError());
  }
});

app.post("/handleJuspayResponse", async (req, res) => {
  const orderId = req.body.order_id || req.body.orderId;

  if (orderId == undefined) {
    return res.json(makeError("order_id not present or cannot be empty"));
  }

  try {
    const statusResponse = await juspay.order.status(orderId);
    const orderStatus = statusResponse.status;
    let message = "";
    switch (orderStatus) {
      case "CHARGED":
        message = "order payment done successfully";
        break;
      case "PENDING":
      case "PENDING_VBV":
        message = "order payment pending";
        break;
      case "AUTHORIZATION_FAILED":
        message = "order payment authorization failed";
        break;
      case "AUTHENTICATION_FAILED":
        message = "order payment authentication failed";
        break;
      default:
        message = "order status " + orderStatus;
        break;
    }

    // removes http field from response, typically you won't send entire structure as response
    return res.send(makeJuspayResponse(statusResponse));
  } catch (error) {
    if (error instanceof APIError) {
      // handle errors comming from juspay's api,
      return res.json(makeError(error.message));
    }
    return res.json(makeError());
  }
});

function makeJuspayResponse(successRspFromJuspay) {
  if (successRspFromJuspay == undefined) return successRspFromJuspay;
  if (successRspFromJuspay.http != undefined) delete successRspFromJuspay.http;
  return successRspFromJuspay;
}
