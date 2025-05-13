require("dotenv").config();
const axios = require("axios");
const moment = require("moment");

const { CONSUMER_KEY, CONSUMER_SECRET, SHORTCODE, PASSKEY } = process.env;

async function getAccessToken() {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (err) {
    console.error(
      "❌ Error getting access token:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
}

async function simulateStkPush() {
  const accessToken = await getAccessToken();
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString(
    "base64"
  );

  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: "1",
    PartyA: "254708374149",
    PartyB: SHORTCODE,
    PhoneNumber: "254708374149",
    CallBackURL: "https://bce3-41-81-177-215.ngrok-free.app/api/mpesa/callback",
    AccountReference: "Test",
    TransactionDesc: "Test",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ STK Push Initiated:", response.data);
  } catch (err) {
    if (err.response) {
      console.error("❌ STK Push API responded with error:", err.response.data);
    } else if (err.request) {
      console.error("❌ No response received from Safaricom:", err.message);
    } else {
      console.error("❌ Error setting up request:", err.message);
    }
  }
}

simulateStkPush();
