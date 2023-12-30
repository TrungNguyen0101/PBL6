'use client';

import Link from 'next/link';
import routes from '@/constant/routes';
import Button from '@/components/Button';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../../../assets/logo.png';
import InforLogin from '@/components/InforLogin';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const currentlanguage = locales[i18n.language];
  const pathname = usePathname();
  const [auth, setAuth] = useState(null);
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
            <InforLogin />
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
