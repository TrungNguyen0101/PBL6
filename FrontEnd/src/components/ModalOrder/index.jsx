import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { getDeleteDetailOrder } from '@/services/paymentService';
const ModalOrder = ({ isModalOpen, setIsModalOpen = () => {}, idOrder }) => {
  const [dataOrder, setDataOrder] = useState(null);
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
        width={650}
      >
        <div className="mt-5">
          {dataOrder?.cart?.length > 0 &&
            dataOrder?.cart?.map((item) => (
              <div key={item._id} className="flex gap-x-4 mb-5">
                {item?.mainImage.length > 0 &&
                  item?.mainImage.map((image, index) => (
                    <div
                      key={index}
                      className="w-[100px] h-[120px] flex-shrink-0"
                    >
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
                  <p>Quantity: {item.Count}</p>
                  <p className="text-[#bc1313dd] font-semibold text-lg">
                    {(
                      (item.Count * ((100 - item.discount) * item.price)) /
                      100
                    ).toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </>
  );
};
export default ModalOrder;
