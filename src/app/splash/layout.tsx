import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zynema - Splash',
  description: 'Welcome to Zynema! Watch movies and TV shows online.',
};

export default function SplashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No header/footer for splash
  return <>{children}</>;
}
