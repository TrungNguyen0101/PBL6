'use client';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styled.scss';
import ChartPie from '../components/chart/ChartPie';
import TableAccount from './components/TableAccount';

export default function AccountPage() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 30, sortable: false },
    {
      field: 'fullname',
      headerName: 'Full name',
      width: 130,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'phonenumber',
      headerName: 'Phone number',
      width: 130,
      sortable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',

      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.id)}>Delete</button>
      ),
    },
  ];

  const initialRows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      phonenumber: '0385566909',
      email: 'nguyen@gmail.com',
      role: 'admin',
    },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: 'Cersei',
      phonenumber: '0746295726',
      email: 'nguyen010102@gmail.com',
      role: 'admin',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: 'Jaime',
      phonenumber: '0182957263',
      email: 'nguyen@gmail.com',
      role: 'user',
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: 'Arya',
      phonenumber: '0193857192',
      email: 'nguyen@gmail.com',
      role: 'user',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: 'Daenerys',
      phonenumber: 'null',
      email: 'nguyen@gmail.com',
      role: 'manager',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: 'null',
      phonenumber: '0195726581',
      email: 'nguyen@gmail.com',
      role: 'manager',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: 'Ferrara',
      phonenumber: '0189371295',
      email: 'nguyen@gmail.com',
      role: 'user',
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: 'Rossini',
      phonenumber: '0282768374',
      email: 'nguyen@gmail.com',
      role: 'manager',
    },
  ];
  const [rows, setRows] = React.useState(initialRows);

  function handleDelete(id) {
    // Tìm hàng có id tương ứng và xóa nó khỏi mảng rows
    const updatedRows = rows.filter((row) => row.id !== id);

    // Cập nhật mảng rows với các hàng đã được xóa
    setRows(updatedRows);
  }
  return (
    <>
      <h2 className="font-semibold text-[28px] mb-[10px]">
        Accounts Management
      </h2>
      <div className="mb-[10px]">
        <button className="btn-70  hover:text-[#90e0ef] duration-300 ">
          Add Account
        </button>
      </div>
      <div className="flex flex-col-reverse items-center justify-between xl:flex-row gap-y-[10px]">
        {/* <div className="max-h-[300px] md:max-w-[710px]  w-full">
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            className="w-full overflow-x-auto overflow-y-hidden"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 4 },
              },
            }}
            pageSizeOptions={[4, 8]}
            autoHeight
            disableSelectionOnClick={true} // Tắt chọn khi nhấp vào

            // checkboxSelection
          ></DataGrid>
        </div> */}
        <div className="max-h-[300px] md:max-w-[710px]  w-full">
          <TableAccount></TableAccount>
        </div>
        <ChartPie></ChartPie>
      </div>
    </>
  );
}
