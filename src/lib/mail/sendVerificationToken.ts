import nodemailer from "nodemailer";
import { env } from "@/lib//env";
import { render } from "@react-email/render";
import VerificationEmail from "./VerificationEmailTemplate";

export interface VerificationParameters {
  id: string;
  email: string;
  db_purpose: string;
  purpose: string;
  url: string;
}
export async function SendVerificationCode({
  email,
  purpose,
  url,
}: VerificationParameters) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });
  const emailHtml = await render(VerificationEmail({ purpose, url }));
  const info = await transporter.sendMail({
    from: env.EMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: "Verification Code", // Subject line
    html: emailHtml,
  });
  console.log(info);
}
