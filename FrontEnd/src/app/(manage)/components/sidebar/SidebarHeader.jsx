/* Logo */
'use client';
import Link from 'next/link';

export function SidebarHeader() {
  return (
    <Link
      href="/"
      className="sticky top-0 z-10 flex items-center justify-center pt-3 pb-6 mb-6 bg-[#023e8a]"
    >
      <img src="/images/jsx.png" width={50} height={60} alt="Enoch Ndika" />
    </Link>
  );
}
