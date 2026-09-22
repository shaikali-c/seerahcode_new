import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { AboutCourse } from "../components/AboutCourse";
import { Outcomes } from "../components/Outcomes";
import { Catalog } from "../components/Catalog";
import { Mentors } from "../components/Mentors";
import { Testimonials } from "../components/Testimonials";
import { Enroll } from "../components/Enroll";
import { Faq } from "../components/Faq";
import { AboutUs } from "../components/AboutUs";
import { Footer } from "../components/Footer";
import { FAQS } from "../data/faq";

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
      <FaqJsonLd />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustBar />
        <AboutCourse />
        <Outcomes />
        <Catalog limit={6} showViewAll />
        <Mentors />
        <Testimonials />
        <Enroll />
        <Faq />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
