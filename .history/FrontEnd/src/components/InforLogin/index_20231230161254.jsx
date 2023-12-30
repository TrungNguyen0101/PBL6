import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import routes from '@/constant/routes';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaUser, FaKey, FaShoppingCart } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import imageUser from '../../assets/logo-user.png';
import './styles.scss';

const InforLogin = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(null);
  const updateInfor = useSelector((state) => state.updateInfor.isUpdate);
  const handleLogout = () => {
    sessionStorage.clear();
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
    <div className="relative font-semibold infor">
      <div className="w-[40px] h-[40px] cursor-pointer">
        {auth?.user?.avatar ? (
          <div>
            {' '}
            <img
              src={auth?.user?.avatar}
              alt="Hi"
              className="object-cover w-full h-full rounded-full"
            ></img>
            <span>hi</span>
          </div>
        ) : (
          <Image
            src={imageUser}
            className="object-cover w-full h-full rounded-full"
            alt=""
          />
        )}
      </div>
      <div className="absolute z-10 w-[300px] p-3 -translate-x-[180px] top-[60px] bg-[#eee] shadow-lg rounded-md infor-content">
        <div className="flex items-center justify-center pb-3 border-b-2 gap-x-2 border-b-gray-500">
          <div className="w-[50px] h-[50px] cursor-pointer">
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
          <div className="flex flex-col">
            <span>{auth?.user?.username}</span>
            <span>{auth?.user?.email}</span>
          </div>
        </div>
        <div className="flex flex-col pt-3 pl-5 gap-y-[2px]">
          <Link
            href={routes.PROFILE}
            className="hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
          >
            <FaUser />
            Thông tin cá nhân
          </Link>
          <Link
            href={routes.CHANGEPASSWORD}
            className="hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
          >
            <FaKey />
            Đổi mật khẩu
          </Link>
          <Link
            href={routes.CUSTOMERHISTORY}
            className="hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
          >
            <FaShoppingCart />
            Lịch sử mua hàng
          </Link>
          <span
            onClick={handleLogout}
            className="cursor-pointer hover:text-[#6d4eec] transition-all flex items-center gap-x-2"
          >
            <IoLogOut />
            Đăng xuất
          </span>
        </div>
      </div>
    </div>
  );
};

export default InforLogin;
