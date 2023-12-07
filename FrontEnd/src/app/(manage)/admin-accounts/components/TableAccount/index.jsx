'use client';
import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import './styled.scss';
import { useEffect } from 'react';
import { getAllAccount } from '@/services/authService';
const TableAccount = ({dataAccount}) => {
  const [data, setData] = React.useState([]);
  useEffect(() =>{
    const handleGetAllAccount = async() =>{
      if(dataAccount.length>0){
        setData(dataAccount)
      }
    }
    handleGetAllAccount()
  },[dataAccount])
  const columns = [
    {
      title: 'Username',
      width: 10,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 18,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 10,
      render: (text, record) => {
        let roleText = '';
        if (record.roleID === '1') {
          roleText = 'Admin';
        } else if (record.roleID === '3') {
          roleText = 'User';
        }
        return <span>{roleText}</span>;
      },
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: 10,
    //   render: (text, record) => (
    //     <div className="flex items-center gap-x-[10px] pl-[-10px] ml-[-10px]">
    //       <Popconfirm
    //         title="Are you sure to delete this record?"
    //         onConfirm={() => handleDelete(record.id)}
    //         onCancel={() => {}}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button type="danger" size="small">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="22"
    //             height="22"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               fill="currentColor"
    //               d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
    //             />
    //           </svg>
    //         </Button>
    //       </Popconfirm>
    //       <button type="button">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="22"
    //           height="22"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             fill="currentColor"
    //             d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125l-2.8 2.8ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21H3ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="max-h-[400px]">
      <Table
        columns={columns}
        dataSource={data}
        className="max-h-[400px]"
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          pageSizeOptions: ['4', '8', '12'], // Các tùy chọn pageSize
          defaultPageSize: 4, // Kích thước mặc định của pageSize
        }}
        scroll={{
          x: 620,
          y: 227,
        }}
      />
    </div>
  );
};
export default TableAccount;
