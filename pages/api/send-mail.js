import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Email to the company
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.COMPANY_EMAIL, // Use from .env
      subject: "📝 New Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    // Email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "✅ We've received your message!",
      text: `Hi ${name},\n\nThanks for reaching out to us. Here's a copy of your message:\n\n"${message}"\n\nWe'll get back to you shortly.\n\n– Team`,
    });

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
