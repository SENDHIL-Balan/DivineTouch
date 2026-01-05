import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  service: string;
  date: string;
  month: string;
  year: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, clientPhone, clientEmail, service, date, month, year }: BookingRequest = await req.json();

    console.log("Received booking request:", { clientName, clientPhone, service, date, month, year });

    // Send notification to Divine Touch
    const notificationEmail = await resend.emails.send({
      from: "Divine Touch Bookings <onboarding@resend.dev>",
      to: ["makeover.divinetouch@gmail.com"],
      subject: `New Booking Request: ${service} - ${clientName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Georgia', serif; background-color: #FAF8F5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(139, 115, 85, 0.1); }
            .header { background: linear-gradient(135deg, #C9A962 0%, #8B7355 100%); padding: 30px; text-align: center; }
            .header h1 { color: #1A1A1A; margin: 0; font-size: 24px; font-weight: normal; }
            .content { padding: 30px; }
            .detail-row { display: flex; border-bottom: 1px solid #E8E4DC; padding: 15px 0; }
            .detail-label { color: #8B7355; font-weight: 600; width: 140px; }
            .detail-value { color: #1A1A1A; flex: 1; }
            .footer { background: #1A1A1A; padding: 20px; text-align: center; color: #C9A962; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ New Booking Request</h1>
            </div>
            <div class="content">
              <div class="detail-row">
                <span class="detail-label">Client Name:</span>
                <span class="detail-value">${clientName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone Number:</span>
                <span class="detail-value">${clientPhone}</span>
              </div>
              ${clientEmail ? `
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${clientEmail}</span>
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${service}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Appointment Date:</span>
                <span class="detail-value">${date} ${month}, ${year}</span>
              </div>
            </div>
            <div class="footer">
              Divine Touch – Bridal Makeover
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation to client if email provided
    if (clientEmail) {
      const confirmationEmail = await resend.emails.send({
        from: "Divine Touch <onboarding@resend.dev>",
        to: [clientEmail],
        subject: "Your Booking Request - Divine Touch Bridal Makeover",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Georgia', serif; background-color: #FAF8F5; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(139, 115, 85, 0.1); }
              .header { background: linear-gradient(135deg, #C9A962 0%, #8B7355 100%); padding: 40px; text-align: center; }
              .header h1 { color: #1A1A1A; margin: 0; font-size: 28px; font-weight: normal; }
              .header p { color: #1A1A1A; margin: 10px 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; }
              .content { padding: 40px 30px; }
              .greeting { font-size: 18px; color: #1A1A1A; margin-bottom: 20px; }
              .message { color: #5C5C5C; line-height: 1.8; margin-bottom: 30px; }
              .booking-details { background: #FAF8F5; padding: 25px; border-radius: 4px; margin-bottom: 30px; }
              .booking-details h3 { color: #8B7355; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
              .detail-row { display: flex; padding: 8px 0; }
              .detail-label { color: #8B7355; width: 120px; }
              .detail-value { color: #1A1A1A; flex: 1; }
              .contact-info { text-align: center; padding: 20px; background: #1A1A1A; color: #C9A962; }
              .contact-info a { color: #C9A962; text-decoration: none; }
              .footer { padding: 20px; text-align: center; color: #8B7355; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Divine Touch</h1>
                <p>Bridal Makeover</p>
              </div>
              <div class="content">
                <p class="greeting">Dear ${clientName},</p>
                <p class="message">
                  Thank you for choosing Divine Touch for your special day! We have received your booking request and our team will contact you shortly to confirm your appointment.
                </p>
                <div class="booking-details">
                  <h3>Booking Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">Service:</span>
                    <span class="detail-value">${service}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Preferred Date:</span>
                    <span class="detail-value">${date} ${month}, ${year}</span>
                  </div>
                </div>
                <p class="message">
                  We look forward to making you look stunning on your special day!
                </p>
              </div>
              <div class="contact-info">
                <p>Questions? Contact us at</p>
                <p><a href="tel:+918015295196">+91 80152 95196</a> | <a href="https://wa.me/918015295196">WhatsApp</a></p>
              </div>
              <div class="footer">
                © Divine Touch – Bridal Makeover. All rights reserved.
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log("Confirmation email sent to client:", confirmationEmail);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);