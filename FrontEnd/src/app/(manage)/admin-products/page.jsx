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

export default function ProductPage() {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      width: 130,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'author',
      headerName: 'Author',
      sortable: false,
      width: 150,
    },
    {
      field: 'publisher',
      headerName: 'Pulisher',
      width: 130,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 80,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.id)}>Delete</button>
      ),
    },
  ];

  const initialRows = [
    {
      id: 1,
      name: 'Doremon',
      price: '20.000',
      author: ' Fujiko F. Fujio',
      publisher: 'Nhật Bản',
      category: 'Cartoon',
      quantity: '5',
      action: 'delete',
    },
    {
      id: 2,
      name: 'Doremon',
      price: '20.000',
      author: ' Fujiko F. Fujio',
      publisher: 'Nhật Bản',
      category: 'Cartoon',
      quantity: '5',
      action: 'delete',
    },
    {
      id: 3,
      name: 'Doremon',
      price: '20.000',
      author: ' Fujiko F. Fujio',
      publisher: 'Nhật Bản',
      category: 'Cartoon',
      quantity: '5',
      action: 'delete',
    },
    {
      id: 4,
      name: 'Doremon',
      price: '20.000',
      author: ' Fujiko F. Fujio',
      publisher: 'Nhật Bản',
      category: 'Cartoon',
      quantity: '5',
      action: 'delete',
    },
  ];
  // const [checkAdd, setCheckAdd] = React.useState(true);

  function handleDelete(id) {
    // Tìm hàng có id tương ứng và xóa nó khỏi mảng rows
    const updatedRows = rows.filter((row) => row.id !== id);

    // Cập nhật mảng rows với các hàng đã được xóa
    setRows(updatedRows);
  }
  const checkAdd = useSelector((state) => state.form.checkAdd);
  const dispatch = useDispatch();

  const handlerCheckAdd = () => {
    dispatch(onCheckAdd());
  };
  return (
    <>
      {!checkAdd ? (
        <>
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
        </>
      ) : (
        <StepForm></StepForm>
      )}
    </>
  );
}
