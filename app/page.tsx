import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { AboutCourse } from "../components/AboutCourse";
import { AboutUs } from "../components/AboutUs";
import { Outcomes } from "../components/Outcomes";
import { Catalog } from "../components/Catalog";
import { Testimonials } from "../components/Testimonials";
import { Mentors } from "../components/Mentors";
import { Enroll } from "../components/Enroll";
import { Faq } from "../components/Faq";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <AboutCourse />
        <AboutUs />
        <Outcomes />
        <Catalog />
        <Testimonials />
        <Mentors />
        <Enroll />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
