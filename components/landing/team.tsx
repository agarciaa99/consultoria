"use client";

import { Card, CardContent } from "../ui/card";
import { Linkedin, Instagram, Mail } from "lucide-react";

const team = [
  {
    name: "Arturo García",
    role: "Frontend Developer & Co-fundador",
    bio: "Biografía",
    image: "/team/arturo.jpg",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "arturo@nexus.com",
    },
  },
  {
    name: "Fernando Rivas",
    role: "Backend Developer & Co-fundador",
    bio: "Biografía",
    image: "/team/fernando.jpg",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "fernando@nexus.com",
    },
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Nuestro <span className="text-primary">Equipo</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Dos mentes creativas unidas por la pasion de transformar negocios a
            traves de la tecnologia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member) => (
            <Card
              key={member.name}
              className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="aspect-4/3 bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                    <span className="font-display text-6xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6 -mt-20 relative z-20">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={member.social.linkedin}
                      className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.instagram}
                      className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Instagram de ${member.name}`}
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.email}
                      className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Email de ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
