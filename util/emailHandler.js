const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
      
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Seesight travel</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Seesight travel. Click on the following link to reset your password</p>
        <a style="background:#50C878; padding: 0.5rem 4rem; margin: 0 auto; text-decoration:none; color:white" href=http://localhost:3000/users/resetPassword/${options.resetToken}>Reset password</a>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
        <p style="font-size:0.9em;">Regards,<br />Seesight travel</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Seesight travel Inc</p>
          <p>75280 Kladanj</p>
          <p>Bosnia</p>
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
