var nodemailer = require('nodemailer');

exports.sendEmail = function (req, res) {

  var mail = req.body.mail;
  var msg = req.body.msg;
  var missatge = 'TEXT: ' + msg + '\n' + 'EMAIL: ' + mail;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'charliesuper@gmail.com',
      pass: 'alternativa'
    }
  });

  var mailOptions = {
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
