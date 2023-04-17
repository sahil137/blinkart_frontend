import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// import { Roboto } from '@next/font/google';

const Noop: React.FC = ({ children }: any) => <>{children}</>;

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
