import { Inter } from 'next/font/google';
import CustomerLayout from '@/components/layout/customer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
Home.Layout = CustomerLayout;
