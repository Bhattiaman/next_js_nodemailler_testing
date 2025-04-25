import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // Explicitly set the host
    port: 587,               // Use TLS port
    secure: false,           // Set to false for TLS
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,            // Enable logging
    debug: true,             // Enable debug to log SMTP transactions
  });

  try {
    // Email to the company
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.COMPANY_EMAIL,
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

    return new Response(
      JSON.stringify({ message: "Emails sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: `Failed to send email: ${error.message}` }),
      { status: 500 }
    );
  }
}
