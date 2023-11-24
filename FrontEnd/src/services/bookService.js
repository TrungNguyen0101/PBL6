import instance from '../utils/axiosCustomize';

// const getAllBook = () => {
//   return instance.get('book');
// };
const getAllBook = () => {
  return instance.get('book?limit=1000');
};

const getAllBookWithPagination = (page, limit) => {
  return instance.get(`book?page=${page}&limit=${limit}`);
};

const getBookByCategory = (value) => {
  return instance.get(`book/book-by-category?value=${value}`);
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
export { getAllBook, getBookById, postBook, putBook, deleteBook, getBookByCategory, getAllBookWithPagination };

