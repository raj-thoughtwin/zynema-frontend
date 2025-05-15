import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zynema - Authentication',
  description: 'Login or register to watch movies online',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
