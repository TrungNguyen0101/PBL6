import routes from '@/constant/routes';
import Link from 'next/link';
import '../../../../../../styles/CategoryItem.scss';

const CategoryItem = () => {
  return (
    <div className="relative h-full">
      <div className="rounded-lg category-item">
        <Link
          href={routes.HOME}
          className="relative z-10 inline-block w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1695195533003-7cb87ceec442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
          <span className="absolute z-10 text-white bottom-5 left-5">
            Tình Yêu
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
