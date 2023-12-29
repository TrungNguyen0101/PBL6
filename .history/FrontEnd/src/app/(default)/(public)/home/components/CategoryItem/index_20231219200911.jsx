import Link from 'next/link';
import '../../../../../../styles/CategoryItem.scss';

const CategoryItem = ({ category, imageFolder }) => {
  const images = Array.from(
    { length: 17 },
    (_, index) => `${imageFolder}image${index + 1}.jpg`
  );

  // Khởi tạo một biến để theo dõi chỉ số hình ảnh
  let imageIndex = 0;

  // Định nghĩa hàm để lấy hình ảnh tiếp theo
  function getNextImage() {
    // Lấy hình ảnh hiện tại dựa trên bộ đếm
    const currentImage = images[imageIndex];

    // Tăng bộ đếm cho hình ảnh tiếp theo
    imageIndex++;

    // Xử lý khi đạt đến cuối chuỗi hình ảnh
    if (imageIndex === images.length) {
      // Đặt lại bộ đếm để lặp lại trở lại hình ảnh đầu tiên
      imageIndex = 0;
    }

    return currentImage;
  }

  // Sử dụng hàm getNextImage để truy cập hình ảnh theo thứ tự
  const nextImage = getNextImage();
  return (
    <>
      <div className="rounded-lg category-item">
        <Link
          href={`/book-by-category?value=${category?.label}`}
          className="h-[140px] block"
        >
          <img
            src={nextImage}
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
