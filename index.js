var express = require("express");
var cors = require("cors");
var nodemailer = require("nodemailer");

var app = express();
app.use(express.json());
app.use(cors());
var port = 8080;

//pdosptijtsiucfyf -> App Password

app.post("/contact", (req, res) => {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var phoneNumber = req.body.phoneNumber;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "apinews9@gmail.com",
      pass: "pdosptijtsiucfyf",
    },
  });

  var mailOptions = {
    from: "apinews9@gmail.com",
    to: "sultanhuzaifa0@gmail.com",
    subject: subject,
    html: `
    <html>
      <body>
        <h2>${userName}</h2>
        <h3>Contact info. </h3>
        <p>Email: ${userEmail}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <h3>Message: </h3>
        <p>${message}</p>
      </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(404).send("Email not sent!");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send(info.response)
    }
  });
});

app.listen(port, () => {
  console.log("Your api is running on port: " + port);
});
