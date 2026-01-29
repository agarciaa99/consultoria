export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  status: "pending" | "contacted" | "resolved";
  created_at: string;
  responded_at: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ActionResponse<T = undefined> {
  success: boolean;
  error?: string;
  data?: T;
}
