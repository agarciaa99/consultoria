import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Team } from "@/components/landing/team";
import { Testimonials } from "@/components/landing/testimonials";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
