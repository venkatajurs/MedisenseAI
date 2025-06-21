// pages/index.tsx
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Prevent SSR for the App component
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HealthInsight AI</title>
        <meta name="description" content="AI-powered health dashboard" />
      </Head>
      <App />
    </>
  );
}
