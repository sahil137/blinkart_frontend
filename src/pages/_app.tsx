import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const Noop: React.FC = ({ children }: any) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
