import Navbar from '@/components/layout/Navbar';
import StakingInterface from '@/components/staking/StakingInterface';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <StakingInterface />
      <Footer />
    </main>
  );
}