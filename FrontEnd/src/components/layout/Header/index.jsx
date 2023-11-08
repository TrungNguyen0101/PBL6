'use client';

import Link from 'next/link';
import routes from '@/constant/routes';
import Button from '@/components/Button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [auth, setAuth] = useState(null);
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('auth');
    setAuth(null);
    toast.success('Đăng xuất thành công');
    router.push(routes.LOGIN);
  };
  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  return (
    <header className="flex items-center gap-x-3 px-[100px] bg-white">
      <div className="w-[80px] h-[80px]">
        <Link href={routes.HOME}>
          <img
            srcSet="https://dynamic.brandcrowd.com/asset/logo/0a1d6b8f-c09d-4235-ba9d-07b22bd2a0b3/logo-search-grid-1x?logoTemplateVersion=1&v=637883078727300000&text=N+T+H+%c4%90+V 2x"
            alt=""
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Link
          href={routes.HOME}
          className={
            pathname === routes.HOME
              ? 'text-[#b08fff] font-semibold text-sm'
              : 'text-sm font-semibold'
          }
        >
          Home
        </Link>
        <Link
          href={routes.HOME}
          className={
            pathname === routes.HOME
              ? 'text-[#b08fff] font-semibold text-sm'
              : 'text-sm font-semibold'
          }
        >
          Books
        </Link>
        <Link
          href={routes.HOME}
          className={
            pathname === routes.HOME
              ? 'text-[#b08fff] font-semibold text-sm'
              : 'text-sm font-semibold'
          }
        >
          Home
        </Link>
      </div>
      <div className="flex ml-auto gap-x-3">
        {auth ? (
          <>
            <Link
              href={routes.PROFILE}
              className="border border-[#b08fff] w-max p-2 flex items-center justify-center rounded-md font-semibold text-sm"
            >
              Hello, welcome back {auth?.username}
            </Link>
            <Button kind="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button kind="primary" to={routes.LOGIN}>
              Login
            </Button>
            <Button kind="secondary" to={routes.REGISTER} isBorder={true}>
              Regisiter
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
