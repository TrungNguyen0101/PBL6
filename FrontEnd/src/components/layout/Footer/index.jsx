'use client';
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
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-5 mt-10 bg-white">
      <div className="flex items-center gap-x-10 wrapper-content">
        <div className="w-[30%] border-r border-r-gray-500">
          <div className="w-[150px] h-[150px] ml-16">
            <Link href={routes.HOME}>
              <Image src={logo} alt="" className="object-cover w-full h-full" />
            </Link>
          </div>
          <p className="pr-2 mb-3 text-sm font-medium">{t('introduce')}</p>
          <div className="ml-16">
            <h3 className="pl-5 mb-3 text-xl font-semibold">{t('Social')}</h3>
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
            <h3 className="text-xl font-semibold">{t('LearnMore')}</h3>
            <Link
              href={routes.INTRODUCE}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              {t('introudceUS')}
            </Link>
            <Link
              href={routes.PRIVACY}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              {t('privacyPolicy')}
            </Link>
          </div>
          <div className="flex flex-col gap-y-2 w-[33.33%] cursor-pointer">
            <h3 className="text-xl font-semibold">{t('Contact')}</h3>
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
            <h3 className="text-xl font-semibold">{t('MyAccount')}</h3>
            <Link
              href={routes.LOGIN}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              {t('login')}
            </Link>
            <Link
              href={routes.REGISTER}
              className="text-sm hover:text-[#6d4eec] transition-all w-max"
            >
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
