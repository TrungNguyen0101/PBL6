import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

const ButtonSlide = () => {
  return (
    <div className="flex justify-end gap-x-2">
      <div className="button-prev-slide w-7 h-7 bg-[#6d4eec] flex items-center justify-center rounded-full hover:bg-opacity-50 transition-all button-prev">
        <MdOutlineKeyboardArrowLeft size="20px" color="white" />
      </div>
      <div className="button-next-slide w-7 h-7 bg-[#6d4eec] flex items-center justify-center rounded-full hover:bg-opacity-50 transition-all button-next">
        <MdKeyboardArrowRight size="20px" color="white" />
      </div>
    </div>
  );
};

export default ButtonSlide;
