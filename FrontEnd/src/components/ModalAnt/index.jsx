import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import './styled.scss';
import StepForm from '@/app/(manage)/admin-products/components/StepForm';
import StepFormEdit from '@/app/(manage)/admin-products/components/StepForm/StepFormEdit';
const ModalAnt = ({
  isEdit,
  handleOffEdit,
  idBook,
  book,
  hanldeGetAllBooks,
}) => {
  const [open, setOpen] = useState(false);

  //   const handleOk = () => {
  //     handleOffEdit();
  //   };

  const handleCancel = () => {
    handleOffEdit();
  };

  useEffect(() => {
    setOpen(isEdit);
  }, [isEdit]);
  return (
    <>
      <Modal
        open={open}
        title="Edit Book"
        // onOk={handleOk}
        onCancel={handleCancel}
        width="90%" // Đặt độ rộng là 90%
        footer={null}
      >
        <StepFormEdit
          book={book}
          idBook={idBook}
          isEdit={isEdit}
          handleOffEdit={handleOffEdit}
          hanldeGetAllBooks={hanldeGetAllBooks}
        ></StepFormEdit>
      </Modal>
    </>
  );
};
export default ModalAnt;
