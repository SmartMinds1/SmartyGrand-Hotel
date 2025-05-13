const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../db");

// Environment variables
const {
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_CALLBACK_URL,
} = process.env;

// 🔐 Helper: Get OAuth Token
async function getAccessToken() {
  const auth = Buffer.from(
    `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
}

// 🔁 Route: POST /api/mpesa/stk-push
router.post("/stk-push", async (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount) {
    return res
      .status(400)
      .json({ error: "Phone number and amount are required." });
  }

  try {
    const accessToken = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14); // YYYYMMDDHHMMSS

    const password = Buffer.from(
      `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CALLBACK_URL, // e.g., https://yourdomain.com/api/mpesa/callback
      AccountReference: "Payment",
      TransactionDesc: "Payment via STK Push",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error("❌ STK Push Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to initiate STK Push",
      details: err.response?.data || err.message,
    });
  }
});

/**
 * 🔔 Route: POST /api/mpesa/callback
 * This is called by Safaricom after STK Push
 */
router.post("/callback", async (req, res) => {
  try {
    const callbackData = req.body;
    console.log(
      "🔔 M-Pesa Callback received:",
      JSON.stringify(callbackData, null, 2)
    );

    const stkCallback = callbackData?.Body?.stkCallback;
    if (!stkCallback) {
      console.warn("⚠️ Malformed callback payload");
      return res.status(400).json({ error: "Invalid callback data" });
    }

    const {
      MerchantRequestID: merchantRequestID,
      CheckoutRequestID: checkoutRequestID,
      ResultCode: resultCode,
      ResultDesc: resultDesc,
      CallbackMetadata,
    } = stkCallback;

    let amount = null;
    let mpesaReceiptNumber = null;
    let phoneNumber = null;

    if (CallbackMetadata?.Item && Array.isArray(CallbackMetadata.Item)) {
      for (const item of CallbackMetadata.Item) {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
        if (item.Name === "PhoneNumber") phoneNumber = item.Value;
      }
    }

    // Optional: Skip failed transactions
    if (parseInt(resultCode) !== 0) {
      console.log(`⚠️ Transaction failed. ResultCode: ${resultCode}`);
    }

    // Store transaction in DB
    await pool.query(
      `INSERT INTO mpesa_transactions (
        merchant_request_id,
        checkout_request_id,
        result_code,
        result_desc,
        amount,
        mpesa_receipt_number,
        phone_number
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        merchantRequestID || null,
        checkoutRequestID || null,
        resultCode || null,
        resultDesc || null,
        amount || null,
        mpesaReceiptNumber || null,
        phoneNumber || null,
      ]
    );

    console.log("✅ M-Pesa transaction saved to PostgreSQL ✅");
    return res
      .status(200)
      .json({ message: "Callback processed successfully." });
  } catch (err) {
    console.error("❌ Error handling M-Pesa callback:", err.message);
    return res
      .status(500)
      .json({ error: "Server error while processing callback." });
  }
});

module.exports = router;
