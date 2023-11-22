import instance from '../utils/axiosCustomize';

const getAllBook = () => {
  return instance.get('book');
};
export { getAllBook };
