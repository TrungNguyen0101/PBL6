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
import { getAllBook, getBookById, searchBook } from '@/services/bookService';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

export default function ProductPage() {
  const checkAdd = useSelector((state) => state.form.checkAdd);
  const current = useSelector((state) => state.form.current);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idBook, setIdBook] = useState('');
  const [book, setBook] = useState({});
  const [listBook, setListBook] = useState([]);
  const { t } = useTranslation('books');

  const hanleGetBookById = async (idBook) => {
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

  const handleSearch = debounce(async (term) => {
    if (term) {
      setIsLoading(true);
      const { data } = await searchBook({ title: term });
      setListBook(data);
    } else {
      setIsLoading(true);
      const { data } = await getAllBook();
      setListBook(data.books);
    }
    setIsLoading(false);
  }, 1000);
  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);
  };

  return (
    <>
      {!checkAdd ? (
        <div className={`relative ${isLoading ? 'cursor-wait' : ''}`}>
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
            <input
              type="text"
              placeholder="Search book..."
              className={`mt-[10px] w-[40%] p-3 text-sm font-semibold border rounded-md outline-none ${
                isLoading ? 'cursor-wait' : ''
              }`}
              value={searchTerm}
              onChange={handleChange}
            />
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
