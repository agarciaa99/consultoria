"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Building2, ShoppingCart, BarChart3, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Sistema ERP Logístico",
    client: "Transportes del Norte",
    description: "Plataforma integral para la gestión de flotas, inventarios y facturación automatizada. Reducción del 30% en tiempos operativos.",
    tags: ["SaaS", "Cloud Architecture", "React"],
    icon: <Building2 className="h-8 w-8 mb-2 text-primary" />,
  },
  {
    title: "E-commerce B2B",
    client: "Distribuidora Central",
    description: "Tienda en línea mayorista con integración de pasarelas de pago personalizadas y sincronización en tiempo real con SAP.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    icon: <ShoppingCart className="h-8 w-8 mb-2 text-primary" />,
  },
  {
    title: "Dashboard de Business Intelligence",
    client: "Grupo Financiero",
    description: "Panel de visualización de datos para la toma de decisiones gerenciales, procesando millones de transacciones diarias.",
    tags: ["Big Data", "Python", "Analytics"],
    icon: <BarChart3 className="h-8 w-8 mb-2 text-primary" />,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Casos de Éxito
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hemos ayudado a empresas a transformar sus procesos mediante software a la medida de alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <Card key={index} className="flex flex-col hover:shadow-lg transition-all duration-300 border-muted-foreground/20 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {project.icon}
                  </div>
                  {}
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {project.client}
                  </span>
                </div>
                <CardTitle className="mt-4 text-xl">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 mt-2">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 group-hover:text-primary">
                  Ver caso de estudio
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}