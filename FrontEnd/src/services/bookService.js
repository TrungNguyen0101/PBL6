import instance from '../utils/axiosCustomize';

const getAllBook = () => {
  return instance.get('book');
};
const getBookById = (id) => {
  return instance.get(`book/${id}`);
};
const postBook = (data) => {
  return instance.post(`book/insert`, data);
};
const putBook = (data) => {
  return instance.put(`api/book`, data);
};
export { getAllBook, getBookById, postBook, putBook };
