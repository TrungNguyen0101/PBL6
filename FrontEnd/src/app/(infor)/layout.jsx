import Header from '@/components/layout/Header';
import Sidebar from './components/sidebar';

export default function AuthLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex items-start justify-center gap-x-5 mt-5">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
