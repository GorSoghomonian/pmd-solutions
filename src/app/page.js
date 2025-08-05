import Link from 'next/link';
import { Pacifico } from "next/font/google";
import FeatureCardsSection from "../components/ui/FeatureCardsSection";

const featureItems = [
  {
    icon: "⚙️",
    title: "Custom Setup",
    description: "Tailored configuration for your unique business needs",
  },
  {
    icon: "👥",
    title: "Team Training",
    description: "Training to maximize your team’s productivity",
  },
  {
    icon: "📈",
    title: "Performance Optimization",
    description: "Ongoing support to ensure peak performance",
  },
  {
    icon: "💾",
    title: "Data Migration",
    description: "Seamless data transfer and processes",
  },
];

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 mt-18">
          Welcome to <span className="text-blue-600">PMD Solutions</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 ">
          Leading consulting firm providing comprehensive business solutions,<br className="hidden md:inline" /> 
          automation services, and strategic guidance to help your business thrive.
        </p>
          <FeatureCardsSection items={featureItems} />
          <FeatureCardsSection items={featureItems} />
          <FeatureCardsSection items={featureItems} />
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Link
            href="/services"
            className="px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
          >
            Explore Our Services →
          </Link>

          <Link
            href="/about"
            className="px-8 py-4 border-2 border-[#2A73DD] text-[#2A73DD] rounded-full font-semibold text-lg hover:bg-[#2A73DD] hover:text-white transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
          >
            Learn About Us
          </Link>
        </div>
      </section>
    </main>
  );
}
