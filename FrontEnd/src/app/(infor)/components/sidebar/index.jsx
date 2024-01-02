'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import routes from '@/constant/routes';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaUser, FaKey, FaShoppingCart } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import imageUser from '../../../../assets/logo-user.png';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation('info');
  const router = useRouter();
  const [auth, setAuth] = useState(null);
  const updateInfor = useSelector((state) => state.updateInfor.isUpdate);
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
  }, [updateInfor]);
  return (
    <div className="w-[220px] py-4 px-3 bg-white rounded-md shadow-md">
      <div className="mx-auto w-max">
        <div className="w-[80px] h-[80px]">
          {auth?.user?.avatar ? (
            <img
              src={auth?.user?.avatar}
              alt=""
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <Image
              src={imageUser}
              className="object-cover w-full h-full rounded-full"
              alt=""
            />
          )}
        </div>
        <span className="block mt-1 font-semibold text-center">
          {auth?.user?.username}
        </span>
      </div>
      <div className="flex flex-col gap-y-[2px] font-semibold mt-2">
        <Link
          href={routes.PROFILE}
          className="hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
        >
          <FaUser />
          {t('Profiles')}
        </Link>
        <Link
          href={routes.CHANGEPASSWORD}
          className="hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
        >
          <FaKey />
          {t('ChangePassword')}
        </Link>
        <Link
          href={routes.CUSTOMERHISTORY}
          className="hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
        >
          <FaShoppingCart />
          {t('PurchaseHistory')}
        </Link>
        <span
          onClick={handleLogout}
          className="cursor-pointer hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
        >
          <IoLogOut />
          {t('Logout')}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
