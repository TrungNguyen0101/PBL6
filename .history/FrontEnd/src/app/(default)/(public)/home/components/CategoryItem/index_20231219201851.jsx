import Link from 'next/link';
import '../../../../../../styles/CategoryItem.scss';

const CategoryItem = ({ category, imageFolder }) => {
  const images = Array.from(
    { length: 17 },
    (_, index) => `${imageFolder}image${index + 1}.jpg`
  );

  const chosenImages = [];

  // Xáo trộn mảng images
  images.sort(() => Math.random() - 0.5);

  // Lấy từng phần tử của mảng theo thứ tự mới
  for (let i = 0; i < 5; i++) {
    chosenImages.push(images.shift());
  }
  return (
    <>
      <div className="rounded-lg category-item">
        <Link
          href={`/book-by-category?value=${category?.label}`}
          className="h-[140px] block"
        >
          <img
            src={chosenImages}
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
