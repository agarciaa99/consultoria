import { createClient } from "@/lib/supabase/sever";
import { ContactsTable } from "@/components/admin/contacts-table";

export default async function ContactsPage() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">
          Contactos
        </h1>
        <p className="text-muted-foreground mt-1">
          Gestiona todas las solicitudes de contacto recibidas
        </p>
      </div>

      <ContactsTable contacts={contacts || []} />
    </div>
  );
}
