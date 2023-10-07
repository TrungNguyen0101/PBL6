'use client';

import Link from 'next/link';
import routes from '@/constant/routes';
import Button from '@/components/Button';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
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
        <Button kind="primary" to={routes.LOGIN}>
          Login
        </Button>
        <Button kind="secondary" to={routes.REGISTER} isBorder={true}>
          Regisiter
        </Button>
      </div>
    </header>
  );
}
