const RESEND_API_URL = "https://api.resend.com/emails";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

interface ResendResponse {
  id?: string;
  error?: {
    message: string;
    name: string;
  };
}

export async function sendEmail(
  options: SendEmailOptions,
): Promise<{ success: boolean; error?: string; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured - email not sent");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: options.from || "Nexus Consulting <onboarding@resend.dev>",
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    const data: ResendResponse = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data.error);
      return {
        success: false,
        error: data.error?.message || "Failed to send email",
      };
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export function generateContactNotificationEmail(contact: {
  name: string;
  email: string;
  company?: string | null;
  subject: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo contacto</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a2e; margin-bottom: 24px; font-size: 24px;">Nuevo mensaje de contacto</h1>
          
          <div style="margin-bottom: 16px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Nombre</p>
            <p style="color: #111827; font-size: 16px; margin: 4px 0 0 0; font-weight: 500;">${contact.name}</p>
          </div>
          
          <div style="margin-bottom: 16px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Email</p>
            <p style="color: #111827; font-size: 16px; margin: 4px 0 0 0; font-weight: 500;">${contact.email}</p>
          </div>
          
          ${
            contact.company
              ? `
          <div style="margin-bottom: 16px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Empresa</p>
            <p style="color: #111827; font-size: 16px; margin: 4px 0 0 0; font-weight: 500;">${contact.company}</p>
          </div>
          `
              : ""
          }
          
          <div style="margin-bottom: 16px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Asunto</p>
            <p style="color: #111827; font-size: 16px; margin: 4px 0 0 0; font-weight: 500;">${contact.subject}</p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Mensaje</p>
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin-top: 8px;">
              <p style="color: #111827; font-size: 16px; margin: 0; white-space: pre-wrap;">${contact.message}</p>
            </div>
          </div>
          
          <a href="mailto:${contact.email}?subject=Re: ${contact.subject}" 
             style="display: inline-block; background-color: #1a1a2e; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">
            Responder
          </a>
        </div>
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
          Este email fue enviado automaticamente desde el formulario de contacto de Nexus Consulting.
        </p>
      </body>
    </html>`;
}

export function generateContactConfirmationEmail(
  name: string,
  message: string,
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gracias por contactarnos</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a2e; margin-bottom: 16px; font-size: 24px;">Gracias por contactarnos, ${name}!</h1>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Hemos recibido tu mensaje y te responderemos lo antes posible. 
            Normalmente respondemos en un plazo de 24-48 horas habiles.
          </p>
          
          <div style="margin-bottom: 24px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Tu mensaje:</p>
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px;">
              <p style="color: #111827; font-size: 14px; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          
          <p style="color: #4b5563; font-size: 14px; margin: 0;">
            Saludos cordiales,<br>
            <strong>El equipo de Nexus Consulting</strong>
          </p>
        </div>
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
          Nexus Consulting - Transformando ideas en experiencias digitales
        </p>
      </body>
    </html>
  `;
}

export function generateReplyEmail(toName: string, replyMessage: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Respuesta de Nexus Consulting</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a2e; margin-bottom: 16px; font-size: 24px;">Hola ${toName},</h1>
          
          <div style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px; white-space: pre-wrap;">
            ${replyMessage}
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          
          <p style="color: #4b5563; font-size: 14px; margin: 0;">
            Saludos cordiales,<br>
            <strong>El equipo de Nexus Consulting</strong>
          </p>
        </div>
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
          Nexus Consulting - Transformando ideas en experiencias digitales
        </p>
      </body>
    </html>
  `;
}
