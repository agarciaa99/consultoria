import { createClient } from "@/lib/supabase/sever";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen } from "lucide-react";

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  const unreadMessages = contacts?.filter((c) => c.status === "new") || [];
  const readMessages = contacts?.filter((c) => c.status !== "new") || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">
          Mensajes
        </h1>
        <p className="text-muted-foreground mt-1">
          Vista rapida de todos los mensajes recibidos
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Unread Messages */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle className="font-[family-name:var(--font-display)]">
                Sin leer
              </CardTitle>
              <Badge>{unreadMessages.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {unreadMessages.length > 0 ? (
              <div className="space-y-3">
                {unreadMessages.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 rounded-lg bg-primary/5 border border-primary/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.email}
                        </p>
                        <p className="text-sm font-medium mt-2">
                          {contact.subject}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {contact.message}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString(
                          "es-ES",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay mensajes sin leer
              </p>
            )}
          </CardContent>
        </Card>

        {/* Read Messages */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MailOpen className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="font-[family-name:var(--font-display)]">
                Leidos
              </CardTitle>
              <Badge variant="secondary">{readMessages.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {readMessages.length > 0 ? (
              <div className="space-y-3">
                {readMessages.slice(0, 10).map((contact) => (
                  <div key={contact.id} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.email}
                        </p>
                        <p className="text-sm font-medium mt-2">
                          {contact.subject}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            contact.status === "replied"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            contact.status === "replied"
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }
                        >
                          {contact.status === "replied"
                            ? "Respondido"
                            : "Leido"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(contact.created_at).toLocaleDateString(
                            "es-ES",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay mensajes leidos
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
