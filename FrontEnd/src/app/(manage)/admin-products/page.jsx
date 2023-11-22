'use client';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styled.scss';
import ChartPie from '../components/chart/ChartPie';
import FormAdd from './components/FormAdd/FirstForm';
import TableData from './components/TableData';
import { message } from 'antd';
import StepForm from './components/StepForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  onCheckAdd,
  prevForm,
  saveDescImage,
  saveFirstFormEdit,
  saveMainImage,
} from '@/redux/reducers/formAddReducer';
import LoadingAnt from '@/components/Loading';
import ModalAnt from '@/components/ModalAnt';
import axios from 'axios';
import { getAllBook, getBookById } from '@/services/bookService';

export default function ProductPage() {
  const checkAdd = useSelector((state) => state.form.checkAdd);
  const current = useSelector((state) => state.form.current);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [idBook, setIdBook] = useState('');
  const [book, setBook] = useState({});
  const [listBook, setListBook] = useState([]);

  const hanleGetBookById = async (idBook) => {
    // const { data } = await axios.get(
    //   `http://localhost:3030/api/book/${idBook}`
    // );
    const { data } = await getBookById(idBook);
    if (data) {
      setBook(data.book);
    }
  };

  const hanldeGetAllBooks = async () => {
    // const { data } = await axios.get('http://host:3030/api/book');
    const { data } = await getAllBook();
    setListBook(data.books);
  };

  const handleCheckAdd = () => {
    dispatch(onCheckAdd());
    message.warning('Data will not be saved when canceling or returning!');
  };
  const handleOnEdit = (id) => {
    setIdBook(id);
    setIsEdit(true);
    if (id) {
      hanleGetBookById(id);
    }
  };
  const handleOffEdit = () => {
    setIsEdit(false);
    setIdBook('');
    setBook({});
    dispatch(saveMainImage([]));
    dispatch(saveDescImage([]));
    dispatch(saveFirstFormEdit({}));
    if (current === 1) {
      dispatch(prevForm());
    }
  };
  return (
    <>
      {!checkAdd ? (
        <div className="relative">
          <h2 className="font-semibold text-[28px] mb-[10px]">
            Products Management
          </h2>
          <div className="mb-[20px]">
            <button
              className="btn-70  hover:text-[#90e0ef] duration-300"
              onClick={handleCheckAdd}
            >
              Add Product
            </button>
          </div>
          <TableData
            handleOnEdit={handleOnEdit}
            listBook={listBook}
            hanldeGetAllBooks={hanldeGetAllBooks}
          ></TableData>
        </div>
      ) : (
        <StepForm></StepForm>
      )}
      <ModalAnt
        book={book}
        idBook={idBook}
        isEdit={isEdit}
        handleOffEdit={handleOffEdit}
        hanldeGetAllBooks={hanldeGetAllBooks}
        // handleCancelIdBook={handleCancelIdBook}
      ></ModalAnt>
    </>
  );
}
