const express = require("express");
const africastalking = require("africastalking");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5050;


// initialize africastalking
const africasTalking = africastalking({
  apiKey: process.env.Africas_Talking_API,
  username: process.env.Africas_Talking_Username,
});


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


// send sms
app.post("/welcome",  (req, res) => {
  try {
    const { firstname, phone } = req.body;
    console.log("Received phone number:", phone);
    const internationalPhone = `+254${phone}`;
    async function sendSms(){
      try {
        const result = await africasTalking.SMS.send({
          to: internationalPhone,
          message: `Hello ${firstname},Welcome to Amani Sacco! \nThank you for registering with us.\nIf you need any assistance, please visit our website: [Your Website Link] \nor contact our support team at [Support Contact Information].
      `,
          from: "AMANI-SACCO",
        });
        console.log(result)
      } catch (err) {
        console.log(err);
      } 
    }
    sendSms();
    res.status(200).json({ message: "SMS sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while sending SMS" });
  }
});
app.post("/getLoan", (req, res) => {
  try {
    const { firstname, phone, ...additionalData } = req.body;
    console.log("Received phone number:", phone);
    const internationalPhone = `+254${phone}`;
    const loan = additionalData.loanAmount;
    async function sendSms() {
      try {
        const result = await africasTalking.SMS.send({
          to: internationalPhone,
          message: `Hello ${firstname},\nYour application for a loan of Ksh.${loan} has been received and is being processed.\nYou will receive a notification once your loan has been approved.\nThank you for choosing Amani Sacco!`,
          from: "AMANI-SACCO",
        });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
    sendSms();
    res.status(200).json({ message: "SMS sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while sending SMS" });
  }
});

app.post("/payment", (req, res) => {
  try {
    const { firstname, phone } = req.body;
    console.log("Received phone number:", phone);
    const internationalPhone = `+254${phone}`;
    async function sendSms() {
      try {
        const result = await africasTalking.SMS.send({
          to: internationalPhone,
          message: `Hello ${firstname},\nYour payment has been received and processed successfully.\nThank you for choosing Amani Sacco!`,
          from: "AMANI-SACCO",
        });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
    sendSms();
    res.status(200).json({ message: "SMS sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while sending SMS" });
  }
});








// run the server
app.listen(port, () => {
  console.log(`Server is Alive at port ${port}`);
});