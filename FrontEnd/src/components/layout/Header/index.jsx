'use client';

import Link from 'next/link';
import routes from '@/constant/routes';
import Button from '@/components/Button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logo from '../../../assets/logo.png';

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
          <Image src={logo} alt="" className="object-cover w-full h-full" />
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
          href={routes.ALLBOOK}
          className={
            pathname === routes.ALLBOOK
              ? 'text-[#b08fff] font-semibold text-sm'
              : 'text-sm font-semibold'
          }
        >
          Books
        </Link>
      </div>
      <div className="flex ml-auto gap-x-3">
        {auth ? (
          <>
            <Link
              href={routes.PROFILE}
              className="border border-[#b08fff] w-max p-2 flex items-center justify-center rounded-md font-semibold text-sm"
            >
              Hello, welcome back {auth?.user?.username}
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
