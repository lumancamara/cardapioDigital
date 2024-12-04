import Footer from '@/components/footer';
import GlobalLoader from '@/components/global-loader';
import Header from '@/components/header';
import { useLoader } from '@/context/loader';
import HomePage from '@/pages/home';
import NotFound from '@/pages/not-found';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function WrappedApp() {
  const { loading } = useLoader();
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {loading && <GlobalLoader />}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <App />
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default WrappedApp;
