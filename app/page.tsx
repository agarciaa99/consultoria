import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Team } from "@/components/landing/team";
import { Testimonials } from "@/components/landing/testimonials";
import { Projects } from "@/components/landing/project";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Team />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
