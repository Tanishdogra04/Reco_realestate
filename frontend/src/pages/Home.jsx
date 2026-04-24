import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LatestInsights from '../components/LatestInsights';
import FeaturedProperties from '../components/FeaturedProperties';
import BespokeServices from '../components/BespokeServices';
import DeveloperPartners from '../components/DeveloperPartners';
import Testimonials from '../components/Testimonials';
import EliteMembership from '../components/EliteMembership';
import BrowseByCategorySection from '../components/BrowseByCategorySection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <LatestInsights />
        <FeaturedProperties />
        <BespokeServices />
        <BrowseByCategorySection />
        <DeveloperPartners />
        <Testimonials />
        <EliteMembership />
      </main>
      
      <Footer />
    </div>
  );
}
