import nodemailer from "nodemailer";


export async function sendEmail(email: string, url: string) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Ginger Foo 👻" <ginger@example.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<a href="${url}">Confirm your account</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
