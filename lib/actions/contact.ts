"use server";

import { createClient } from "../supabase/sever";
import { validateContactForm } from "../validations/contact";
import {
  sendEmail,
  generateContactNotificationEmail,
  generateContactConfirmationEmail,
  generateReplyEmail,
} from "../email/resend";
import type { ActionResponse, Contact } from "../types/contact";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "aega2399@gmail.com";

export async function submitContact(
  formData: FormData,
): Promise<ActionResponse> {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: (formData.get("company") as string) || undefined,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const validation = validateContactForm(data);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    const supabase = await createClient();

    const { error: dbError } = await supabase.from("contacts").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      subject: data.subject,
      message: data.message,
      status: "new",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return {
        success: false,
        error: "Error al guaradr el mensaje. Intenta de nuevo.",
      };
    }

    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Nuevo contacto: ${data.subject}`,
      html: generateContactNotificationEmail(data),
      replyTo: data.email,
    });

    await sendEmail({
      to: data.email,
      subject: "Hemos recibido tu mensaje",
      html: generateContactConfirmationEmail(data.email, data.message),
    });

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Ocurrio un error inesperado. Intenta de nuevo",
    };
  }
}

export async function getContacts(): Promise<ActionResponse<Contact[]>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: "Error al obtener contactos" };
    }

    return { success: true, data: data as Contact[] };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error inesperado" };
  }
}

export async function updateContactStatus(
  contactId: string,
  status: Contact["status"],
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = { status };
    if (status === "replied") {
      updateData.responded_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("contacts")
      .update(updateData)
      .eq("id", contactId);

    if (error) {
      return { success: false, error: "Error al actualizar el estado." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error inesperado." };
  }
}

export async function deleteContact(
  contactId: string,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", contactId);

    if (error) {
      return { success: false, error: "Error al eliminar el contacto." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error inesperado." };
  }
}

export async function sendReplyToContact(
  contactId: string,
  replyMessage: string,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { data: contact, error: fetchError } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (fetchError || !contact) {
      return { success: false, error: "Contacto no encontrado" };
    }

    const emailResult = await sendEmail({
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      html: generateReplyEmail(contact.email, replyMessage),
    });

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || "Error al enviar email",
      };
    }

    const { error: updateError } = await supabase
      .from("contacts")
      .update({
        status: "replied",
        responded_at: new Date().toISOString(),
      })
      .eq("id", contactId);

    if (updateError) {
      return {
        success: false,
        error: "Email enviado pero error al actualizar estado.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error inesperado" };
  }
}
