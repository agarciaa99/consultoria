import { createClient } from "@/lib/supabase/sever";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, TrendingUp, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get contacts count
  const { count: totalContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  // Get new contacts (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { count: newContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .gte("created_at", weekAgo.toISOString());

  // Get unread contacts
  const { count: unreadContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  // Get recent contacts
  const { data: recentContacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    {
      title: "Total de contactos",
      value: totalContacts || 0,
      icon: Users,
      description: "Personas interesadas",
    },
    {
      title: "Nuevos esta semana",
      value: newContacts || 0,
      icon: TrendingUp,
      description: "Ultimos 7 dias",
    },
    {
      title: "Sin leer",
      value: unreadContacts || 0,
      icon: Mail,
      description: "Pendientes de revision",
    },
    {
      title: "Ultima actividad",
      value: recentContacts?.[0]
        ? new Date(recentContacts[0].created_at).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
          })
        : "N/A",
      icon: Clock,
      description: "Ultimo contacto",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido al panel de administracion de Nexus Consulting
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Contacts */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-display)]">
            Contactos recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentContacts && recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{contact.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(contact.created_at).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No hay contactos recientes
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
