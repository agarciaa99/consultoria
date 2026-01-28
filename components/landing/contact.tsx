"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { submitContact } from "@/lib/actions/contact";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || "Ocurrio un error. Intenta de nuevo.");
    }
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Hablemos de tu <span className="text-primary">proyecto</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para convertir tus ideas en realidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-semibold mb-4">
                Información de contacto
              </h3>
              <p className="text-muted-foreground">
                Llena el formulario o contactanos directamente.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">contacto@nexus-consulting.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="font-medium">123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-medium">Teoloyucan, Estado de México</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6">
              {isSucces ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    Mensaje enviado
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                  <Button
                    variant={"outline"}
                    className="mt-6 bg-transparent"
                    onClick={() => setIsSuccess(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa (opcional)</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Nombre de la empresa"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Asunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="¿Cómo podemos ayudarte?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuentanos más sobre tu proyecto..."
                      rows={4}
                      required
                    />
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
