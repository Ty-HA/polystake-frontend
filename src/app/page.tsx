import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StakingInterface from '@/components/staking/StakingInterface';

export default function Home() {
  return (
    <>
      <Navbar />
      <StakingInterface />
      <Footer />
    </>
  );
}