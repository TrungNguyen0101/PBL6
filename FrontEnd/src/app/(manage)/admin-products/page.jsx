'use client';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styled.scss';
import ChartPie from '../components/chart/ChartPie';
import FormAdd from './components/FormAdd/FirstForm';
import TableData from './components/TableData';
import StepForm from './components/StepForm';
import { useDispatch, useSelector } from 'react-redux';
import { onCheckAdd } from '@/redux/reducers/formAddReducer';
import LoadingAnt from '@/components/Loading';

export default function ProductPage() {
  const checkAdd = useSelector((state) => state.form.checkAdd);
  const dispatch = useDispatch();

  const handlerCheckAdd = () => {
    dispatch(onCheckAdd());
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
              onClick={handlerCheckAdd}
            >
              Add Product
            </button>
          </div>
          <TableData></TableData>
        </div>
      ) : (
        <StepForm></StepForm>
      )}
    </>
  );
}
