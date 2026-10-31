import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { UniverseCards } from "@/components/home/UniverseCards";
import { PopularServices } from "@/components/home/PopularServices";
import { OpportunitiesSection } from "@/components/home/OpportunitiesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <UniverseCards />
        <PopularServices />
        <OpportunitiesSection />
      </main>
      <Footer />
    </>
  );
}
