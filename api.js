const express = require("express");
const Razorpay = require("razorpay");
var cors = require('cors')

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_Lz6gMyauxbNG3y", // your `KEY_ID`
  key_secret: "YZZ8snL8nmuABENJLvQgIMrf", // your `KEY_SECRET`
});


const headers = {
  'X-OEM-TOKEN-tenant_id': "",
  'Content-Type': 'application/octet-stream',
  'X-File-Metadata': {
    "address_proof" : "AADHAAR",
    "order_id": "OET-818254023251121-FQI182",
    "file": {
      "type": "AADHAAR",
      "view": "FRONT",
      "data": {"documentNumber": "934325901805","pincode": "560050"}
    }
  }
}

const app = express();


app.use(cors())


app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post(`/razorpay/initiate`, async (req, res, next) => {
  try {
    // In payload we will get order-id
    let resp = await razorpayInstance.orders.create({
      amount: 1 * 100, // 1 Rupee
      receipt: "receipt#1",
    //   receipt: v1(),
      payment_capture: false,
      currency: "INR",
    });
    res.status(200).send({ data: resp });
  } catch (error) {
    next(error);
  }
});

app.post(`/razorpay/success`, async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(200).send({ msg: "Success" });
    // Handle Success
  } catch (error) {
    next(error);
  }
});

app.listen(8080);
