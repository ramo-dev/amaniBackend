const africastalking = require("africastalking");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5005;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// initialize the SDK
const africasTalking = africastalking({
  apiKey: process.env.Africas_Talking_API,
  username: process.env.Africas_Talking_Username,
});


// Send SMS function
async function sendSms() {
    try {
        const phone = "0706228494";
        const internationalPhone = `+254${phone}`;
        const result = await africasTalking.SMS.send({
          to: internationalPhone,
          message: "Hello, this is a test message from Me!!.",
          from: "AMANI-SACCO",
        });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
    }


// custom function to send sms after 5 seconds
function Timer() {
    setTimeout(() => {
        sendSms();
    }, 5000); 
}

Timer();


// Server to listen on port 5005 or any other port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Dependencies:
// africastalking
// express
// cors
// body-parser

