import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: 'Zynema - Watch Movies Online',
  description: 'Watch movies and TV shows online for free',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <Header />
  {children}</>;
  <Footer />
}
