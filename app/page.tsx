import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Team } from "@/components/landing/team";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Team />
    </main>
  );
}
