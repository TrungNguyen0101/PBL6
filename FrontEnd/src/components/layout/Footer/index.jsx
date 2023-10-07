import routes from '@/constant/routes';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/logo.png';
import {
  BsFacebook,
  BsYoutube,
  BsTwitter,
  BsInstagram,
  BsPinterest,
  BsFillTelephoneFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="py-5 mt-10 bg-white">
      <div className="flex items-center gap-x-10 wrapper-content">
        <div className="w-[30%] border-r border-r-gray-500">
          <div className="w-[150px] h-[150px] ml-16">
            <Link href={routes.HOME}>
              <Image src={logo} alt="" className="object-cover w-full h-full" />
            </Link>
          </div>
          <p className="pr-2 mb-3 text-sm font-medium">
            NTHĐV bán sách và giao hàng tận nơi. Không hỗ trợ đặt mua và nhận
            hàng trực tiếp tại văn phòng cũng như tất cả hệ thống NTHĐV trên
            toàn quốc.
          </p>
          <div className="ml-16">
            <h3 className="pl-5 mb-3 text-xl font-semibold">Mạng xã hội</h3>
            <div className="flex gap-x-3">
              <Link href={routes.HOME}>
                <BsFacebook size="25px" color="#1773ea" />
              </Link>
              <Link href={routes.HOME}>
                <BsInstagram size="25px" color="#f76520" />
              </Link>
              <Link href={routes.HOME}>
                <BsYoutube size="25px" color="#f70101" />
              </Link>
              <Link href={routes.HOME}>
                <BsTwitter size="25px" color="#26a5db" />
              </Link>
              <Link href={routes.HOME}>
                <BsPinterest size="25px" color="#b7081b" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[70%] flex">
          <div className="flex flex-col gap-y-2 w-[33.33%]">
            <h3 className="text-xl font-semibold">Tìm hiểu thêm</h3>
            <Link
              href={routes.INTRODUCE}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              Giới thiệu NTHĐV
            </Link>
            <Link
              href={routes.PRIVACY}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              Chính sách bảo mật thông tin cá nhân
            </Link>
          </div>
          <div className="flex flex-col gap-y-2 w-[33.33%] cursor-pointer">
            <h3 className="text-xl font-semibold">Liên hệ</h3>
            <span className="text-sm hover:text-[#6d4eec] transition-all w-max flex items-center gap-x-2">
              <BsFillTelephoneFill size="15px" />
              123-456-7890
            </span>
            <span className="text-sm hover:text-[#6d4eec] transition-all w-max flex items-center gap-x-2">
              <MdEmail size="15px" />
              nguyentuhuydatvy@gmail.com
            </span>
          </div>
          <div className="flex flex-col gap-y-2 w-[33.33%]">
            <h3 className="text-xl font-semibold">Tài khoản của tôi</h3>
            <Link
              href={routes.LOGIN}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              Đăng nhập
            </Link>
            <Link
              href={routes.REGISTER}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              Tạo tài khoản mới
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
