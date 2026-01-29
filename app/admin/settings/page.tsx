"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Mail, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">
          Configuracion
        </h1>
        <p className="text-muted-foreground mt-1">
          Administra las preferencias del sistema
        </p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle className="font-[family-name:var(--font-display)]">
                General
              </CardTitle>
            </div>
            <CardDescription>Configuracion general del sitio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nombre del sitio</Label>
                <Input id="siteName" defaultValue="Nexus Consulting" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">URL del sitio</Label>
                <Input
                  id="siteUrl"
                  defaultValue="https://nexus-consulting.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle className="font-[family-name:var(--font-display)]">
                Correo electronico
              </CardTitle>
            </div>
            <CardDescription>
              Configuracion de notificaciones por email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notificationEmail">Email de notificaciones</Label>
              <Input
                id="notificationEmail"
                type="email"
                defaultValue="contacto@nexus-consulting.com"
              />
              <p className="text-xs text-muted-foreground">
                Los nuevos contactos se enviaran a esta direccion
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="font-[family-name:var(--font-display)]">
                Notificaciones
              </CardTitle>
            </div>
            <CardDescription>Preferencias de notificaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Las notificaciones por email estan habilitadas. Recibiras un
              correo cada vez que alguien complete el formulario de contacto.
            </p>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="font-[family-name:var(--font-display)]">
                Seguridad
              </CardTitle>
            </div>
            <CardDescription>
              Configuracion de seguridad de la cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tu cuenta esta protegida con autenticacion de Supabase.
            </p>
            <Button variant="outline">Cambiar contrasena</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
