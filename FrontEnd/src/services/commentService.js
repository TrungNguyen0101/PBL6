import instance from '../utils/axiosCustomize';

const getAllCommentByBook = (idBook) => {
  return instance.get(`book/${idBook}/comments`);
};

const postComment = (idBook, comment) => {
  return instance.post(`book/${idBook}/comments/create`, {
    comment,
  });
};

const deleteCommnet = (idComment) => {
  return instance.delete(`book/comments/${idComment}/delete`);
};

export { getAllCommentByBook, postComment, deleteCommnet };
