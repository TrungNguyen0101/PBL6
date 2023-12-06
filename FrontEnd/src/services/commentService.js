import instance from '../utils/axiosCustomize';

const getAllCommentByBook = (idBook) => {
  return instance.get(`book/${idBook}/comments`);
};

const postComment = (idBook, comment) => {
  return instance.post(`book/${idBook}/comments/create`, {
    comment,
  });
};

export { getAllCommentByBook, postComment };
