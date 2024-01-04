import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { getDeleteDetailOrder } from '@/services/paymentService';
const ModalOrder = ({ isModalOpen, setIsModalOpen = () => {}, idOrder }) => {
  const [dataOrder, setDataOrder] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getDetailsOrder = async () => {
    const res = await getDeleteDetailOrder(idOrder);
    if (res && res.data) {
      setDataOrder(res.data);
    }
    console.log(res);
  };
  useEffect(() => {
    getDetailsOrder();
  }, [idOrder]);
  return (
    <>
      <Modal
        title="Details Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {dataOrder?.cart?.length > 0 &&
            dataOrder?.cart?.map((item) => (
              <div key={item._id} className="flex gap-x-3">
                {item?.mainImage.length > 0 &&
                  item?.mainImage.map((image, index) => (
                    <div key={index} className="w-[80px] h-[120px]">
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold leading-6">
                    {item.booktitle}
                  </p>
                  <p className="mt-1">Author: {item.author}</p>
                  <p>x {item.Count}</p>
                </div>
              </div>
            ))}
        </div>
        <p className="pl-[90px] -translate-y-[50px] text-[#bc1313dd] text-lg font-semibold">
          {dataOrder?.totalmoney}
        </p>
      </Modal>
    </>
  );
};
export default ModalOrder;
