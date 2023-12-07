'use client';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styled.scss';
import ChartPie from '../components/chart/ChartPie';
import TableAccount from './components/TableAccount';
import { getAllAccount } from '@/services/authService';
import { useEffect } from 'react';
import { useState } from 'react';
import ModelAccount from '@/components/ModelAccount';
import LoadingPage from '@/components/LoadingPage';

export default function AccountPage() {
  const [active, setActive] = useState(false);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState({
    role1: 0,
    role3: 0,
  });
  const handleGetAllAccount = async () => {
    setIsLoading(true);
    const result = await getAllAccount();
    if (result?.account?.length > 0) {
      setData(result.account);
      let roleCounts = {
        role1: 0,
        role3: 0,
      };
      result.account.forEach((item) => {
        if (item.roleID === '1') {
          roleCounts.role1++;
        } else if (item.roleID === '3') {
          roleCounts.role3++;
        }
      });
      setRole(roleCounts);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    handleGetAllAccount();
  }, []);

  const handleOffActive = () => {
    setActive(false);
  };

  const handleOnActive = () => {
    setActive(true);
  };

  return (
    <>
      <h2 className="font-semibold text-[28px] mb-[10px]">
        Accounts Management
      </h2>
      <div className="mb-[10px]">
        <button
          className="btn-70  hover:text-[#90e0ef] duration-300"
          onClick={handleOnActive}
        >
          Add Account
        </button>
      </div>
      {isLoading ? (
        <div className="mx-auto mt-10 w-max">
          <LoadingPage></LoadingPage>
        </div>
      ) : (
        <div className="flex flex-col-reverse items-center justify-between xl:flex-row gap-y-[10px]">
          <div className="max-h-[300px] md:max-w-[710px]  w-full">
            <TableAccount dataAccount={data}></TableAccount>
          </div>
          <ChartPie role={role}></ChartPie>
          <ModelAccount
            active={active}
            handleOffActive={handleOffActive}
            handleGetAllAccount={handleGetAllAccount}
          ></ModelAccount>
        </div>
      )}
    </>
  );
}
