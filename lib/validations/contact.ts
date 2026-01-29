import type { ContactFormData } from "../types/contact";

export function validateContactForm(data: ContactFormData): {
  valid: boolean;
  error?: string;
} {
  if (!data.name || data.name.trim().length < 2) {
    return {
      valid: false,
      error: "El nombre debe tener al menos 2 caracteres",
    };
  }

  if (!data.email) {
    return { valid: false, error: "El email es obligatorio" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: "Por favor, ingresa un email válido" };
  }

  if (!data.subject || data.subject.trim().length < 3) {
    return {
      valid: false,
      error: "El asunto debe tener al menos 3 caracteres",
    };
  }

  if (!data.message || data.message.trim().length < 10) {
    return {
      valid: false,
      error: "El mensaje debe tener al menos 10 caracteres",
    };
  }

  return { valid: true };
}
