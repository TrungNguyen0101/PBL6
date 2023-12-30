import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useEffect } from 'react';
import Image from 'next/image';
import './styled.scss';
const ModelOrder = ({ orderItem, active, handleOffActive }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const result = orderItem[0]?.cart;
  const handleOk = () => {
    handleOffActive();
  };
  const handleCancel = () => {
    handleOffActive();
  };
  useEffect(() => {
    setIsModalOpen(active);
  }, [active]);

  return (
    <div className="w-[500px] h-[300px]">
      <Modal
        open={isModalOpen}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        onCancel={handleCancel}
        width={950}
        bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
      >
        <table>
          <thead>
            <tr>
              <th className="p-0">Book</th>
              <th className="pr-0 product-name">Price</th>
              <th className="px-0 product-price">Price Discount</th>
              <th className="pl-[15px]  product-quantity">Quantity</th>
              <th className="pl-[10px] text-left product-subtotal">
                Total money
              </th>
            </tr>
          </thead>
          <tbody>
            {result?.length > 0 &&
              result?.map((item) => (
                <tr className="pb-[10px]">
                  <td className="p-0">
                    <div className="flex flex-row items-center gap-x-[10px]">
                      <div className="relative">
                        <Image
                          src={item?.mainImage[0].url}
                          alt=""
                          width={200}
                          height={200}
                          className="item-img max-w-[80px] object-cover"
                        />
                      </div>
                      <span className="">{item?.booktitle}</span>
                    </div>
                  </td>
                  <td className="p-0 price-amount amount">
                    <div className="flex items-center gap-x-[10px]">
                      <span className="line-through ml-[10px]">
                        {item?.price?.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="p-0 price-amount amount">
                    <span className="text-red-500">
                      {parseFloat(
                        item?.discount !== 0
                          ? parseFloat(
                              (item?.price * (100 - item.discount)) / 100
                            )
                          : item?.price
                      )?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                  <td className="">{item?.Count}</td>
                  <td className="p-[10px] text-left price-amount amount-sub">
                    <span className="">
                      {(
                        parseFloat(
                          item?.discount !== 0
                            ? parseFloat(
                                (item?.price * (100 - item.discount)) / 100
                              )
                            : item?.price
                        ) * item.Count
                      )?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
export default ModelOrder;
