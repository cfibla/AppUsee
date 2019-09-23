'use strict';

const nodemailer = require('nodemailer');

exports.sendEmail = function (req, res) {

  let mail = req.body.mail;
  let msg = req.body.msg;
  let missatge = 'TEXT: ' + msg + '\n' + 'EMAIL: ' + mail;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'charliesuper@gmail.com',
      pass: 'alternativa'
    }
  });

  let mailOptions = {
    from: mail,
    to: 'charliesuper@gmail.com',
    subject: 'AppEscola',
    text: missatge
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/');
    }
  });
};
