import instance from '../utils/axiosCustomize';

// const getAllBook = () => {
//   return instance.get('book');
// };
const getAllBook = () => {
  return instance.get('book?limit=1000');
};
const getBookById = (id) => {
  return instance.get(`book/${id}`);
};
const postBook = (data) => {
  return instance.post(`book/insert`, data);
};
const putBook = (data) => {
  return instance.put('book', data);
};
const deleteBook = (id) => {
  return instance.delete(`book/${id}`);
};
export { getAllBook, getBookById, postBook, putBook, deleteBook };
