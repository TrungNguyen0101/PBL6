import Link from 'next/link';
import routes from '@/constant/routes';

export default function Header() {
  return (
    <header>
      <div className="w-[100px] h-[100px]">
        <Link href={routes.HOME}>
          <img
            srcSet="https://dynamic.brandcrowd.com/asset/logo/0a1d6b8f-c09d-4235-ba9d-07b22bd2a0b3/logo-search-grid-1x?logoTemplateVersion=1&v=637883078727300000&text=N+T+H+%c4%90+V 2x"
            alt=""
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
    </header>
  );
}
