import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
