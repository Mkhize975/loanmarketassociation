import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col bg-sunstone-50 text-slate-900">
      <Component {...pageProps} />
    </div>
  );
}
