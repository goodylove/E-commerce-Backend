import { Resend } from "resend";
import { EmailServicesTypes } from "../../interface/auth";
import { BadRequestError } from "../errors/customerErrors";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleEmailService({
  to,
  subject,
  message,
}: EmailServicesTypes) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html: message,
  });

  if (error) {
    throw new BadRequestError("Failed to send email");
  }
  return data
}


