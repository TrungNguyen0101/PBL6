import Link from 'next/link';
import '../../../../../../styles/CategoryItem.scss';

const CategoryItem = ({ category, imageFolder }) => {
  const images = Array.from(
    { length: 17 },
    (_, index) => `${imageFolder}image${index + 1}.jpg`
  );
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <>
      <div className="rounded-lg category-item">
        <Link
          href={`/book-by-category?value=${category?.label}`}
          className="h-[140px] block"
        >
          <img
            src={randomImage}
            alt=""
            className="object-cover w-full h-full rounded-lg opacity-80"
          />
        </Link>
        <span className="absolute z-4 text-red-950 bottom-5 left-5 font-bold">
          {category?.label}
        </span>
      </div>
    </>
  );
};

export default CategoryItem;
