import { Metadata } from 'next';
import '@/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapClient from '@/components/BootstrapClient';
export const metadata: Metadata = {
  title: 'Zynema - Admin',
  description: 'Admin dashboard for Zynema',
};

import AdminHeader from '@/components/AdminHeader';
import GlobalLoader from '@/components/GlobalLoader';
import { LoaderProvider } from '@/utils/LoaderContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BootstrapClient />
      <LoaderProvider>
        <GlobalLoader />
        <AdminHeader />
        {children}
      </LoaderProvider>
    </>
  );
}
