import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import FirstForm from '../FormAdd/FirstForm';
import { useDispatch, useSelector } from 'react-redux';
import { nextForm, prevForm } from '@/redux/reducers/formAddReducer';
import SecondForm from '../FormAdd/SecondForm';
import FirstFormEdit from '../FormAdd/FirstFormEdit';
import SecondFormEdit from '../FormAdd/SecondFormEdit';
const StepFormEdit = ({
  idBook,
  isEdit,
  book,
  handleOffEdit,
  hanldeGetAllBooks,
}) => {
  const steps = [
    {
      title: 'First',
      content: (
        <FirstFormEdit
          isEdit={isEdit}
          book={book}
          handleOffEdit={handleOffEdit}
        />
      ),
    },
    {
      title: 'Second',
      content: (
        <SecondFormEdit
          idBook={idBook}
          isEdit={isEdit}
          book={book}
          handleOffEdit={handleOffEdit}
          hanldeGetAllBooks={hanldeGetAllBooks}
        />
      ),
    },
  ];
  const { token } = theme.useToken();
  const current = useSelector((state) => state.form.current);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div className="leading-none" style={contentStyle}>
        {steps[current]?.content}
      </div>
    </>
  );
};
export default StepFormEdit;
