import instance from '../utils/axiosCustomize';

const getAllCategory = () => {
  return instance.get('/category');
};

export { getAllCategory };
