'use client';
import { useState } from 'react';
import { Overlay } from './components/Overlay';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const style = {
  container: 'bg-gray-900 h-screen overflow-hidden relative',
  mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4',
  main: 'h-screen overflow-auto  px-[30px] lg-py-0 pb-[15px] pt-[5px]',
};

function LayoutAdmin({ children }) {
  const router = useRouter();

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    if (auth?.user?.roleID !== '1') {
      router.replace('/');
      toast.error('You do not have access');
    }
  }, []);

  return (
    <div className={style.container}>
      <div className="flex items-start">
        <Overlay />
        <Sidebar mobileOrientation="end" />
        <div className={`${style.mainContainer} bg-white `}>
          <TopBar />
          <main className={style.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
