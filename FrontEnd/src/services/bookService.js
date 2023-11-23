import instance from '../utils/axiosCustomize';

const getAllBook = () => {
  return instance.get('book');
};

const getAllBookWithPagination = (page, limit) => {
  return instance.get(`book?page=${page}&limit=${limit}`);
};

const getBookByCategory = (value) => {
  return instance.get(`book/book-by-category?value=${value}`);
};

export { getAllBook, getBookByCategory, getAllBookWithPagination };
