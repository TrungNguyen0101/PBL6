import Link from 'next/link';
import '../../../../../../styles/CategoryItem.scss';

const CategoryItem = ({ category }) => {
  console.log('categoryItem', category);
  return (
    <>
      <div className="rounded-lg category-item">
        <Link
          href={`/book-by-category?value=${category?.label}`}
          className="h-[140px] block"
        >
          <img
            src="http://res.cloudinary.com/dsrvia1wu/image/upload/v1700582011/GMO/xp9mifmbxk9xkppepxef.png"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </Link>
        <span className="absolute z-10 text-white bottom-5 left-5">
          {category?.label}
        </span>
      </div>
    </>
  );
};

export default CategoryItem;
