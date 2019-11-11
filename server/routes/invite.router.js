const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const nodemailer = require('nodemailer');
let transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS
  }
}

let transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/', rejectUnauthenticated, (req, res, next) => {
    let sender = req.body.email.senderName;
    let recipiant = req.body.email.recipiantName;
    let fleet = req.body.email.groupname;
    let email = req.body.email.recipiantEmail
    let message = ` Ahoy, ${recipiant}! ${sender} has invited you to join the fleet, ${fleet}!  
        Please proceed to http://localhost:3000/#/home and register an account.
        Once registered, you may join ${fleet} with the following credentials: 
        Fleet Name: ${fleet},  
        Password: 6390.
        Safe travels! ~Ships in the Night Team `;
    let mail = {
      from: 'Ships in the Night',
      to: email,
      subject: `Invitation from ${sender}`,
      text: message
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  module.exports = router;