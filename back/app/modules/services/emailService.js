import { createTransport } from 'nodemailer';

export class EmailService {
  static sendPasswordResetEmail = async (user, token, req) => {
    let transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset_password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    return transporter.sendMail(mailOptions);
  };
}
