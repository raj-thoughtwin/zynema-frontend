import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zynema - Admin',
  description: 'Admin dashboard for Zynema',
};

import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
