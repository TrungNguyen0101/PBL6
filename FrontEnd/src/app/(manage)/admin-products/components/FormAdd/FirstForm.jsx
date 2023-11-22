'use client';

import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextErea from '@/components/TextErea';
import SelectInput from '@/components/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextForm,
  offCheckAdd,
  saveErrorMainImage,
  saveFirstForm,
  saveMainImage,
} from '@/redux/reducers/formAddReducer';
import DatePickerInput from '@/components/DatePickerInput';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import UploadImage from '@/components/UploadImage';
import './styled.scss';
import { format } from 'date-fns';

const schema = yup
  .object({
    booktitle: yup.string().required('Please enter the book title'),
    price: yup.string().required('Please enter price'),
    quantity: yup.string().required('Please enter quantity'),
    desc: yup.string().required('Please enter description'),
    author: yup.string().required("Please enter the author's name"),
    datePicker: yup
      .date()
      .required()
      .test('is-less-than-current', 'Invalid date', function (value) {
        const currentDate = new Date();
        return value < currentDate;
      })
      .typeError('Please enter the correct format'),
  })
  .required();

export default function FirstForm() {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const dataFirstForm = useSelector((state) => state.form.firstForm);
  const dataMainImage = useSelector((state) => state.form.mainImage);
  const dataErrorMainImage = useSelector((state) => state.form.errorMainImage);

  const hanlderFirstForm = (values) => {
    if (dataMainImage?.length > 0) {
      const newValues = { ...values };

      const stringFromDate = (date) => format(date, 'yyyy-MM-dd');
      const dateToSerialize = stringFromDate(new Date(newValues.datePicker));
      const price = getValues('price');
      newValues.datePicker = dateToSerialize;
      newValues.mainImage = dataMainImage;
      newValues.price = price;
      if (newValues.category.value) {
        newValues.category = newValues.category.value;
      }

      dispatch(saveFirstForm(newValues));
      dispatch(nextForm());

      message.config({
        duration: 2, // Độ dài mili giây của mỗi message (2 giây)
        maxCount: 1, // Số lượng message tối đa hiển thị cùng một lúc
      });
      message.success("The first form's data has been saved!");
    }
  };

  const hanleCancel = () => {
    dispatch(saveFirstForm({}));
    dispatch(saveMainImage([]));
    dispatch(offCheckAdd());
    message.error('Canceled add book!');
  };

  function isObjectEmpty(obj) {
    obj = obj ?? {};
    return Object.getOwnPropertyNames(obj).length === 0;
  }
  /* set value */
  useEffect(() => {
    if (!isObjectEmpty(dataFirstForm)) {
      const originalDate = new Date(dataFirstForm.datePicker);
      const formattedDate = originalDate.toISOString().split('T')[0];
      setValue('datePicker', formattedDate);

      setValue('author', dataFirstForm.author);
      setValue('booktitle', dataFirstForm.booktitle);
      setValue('desc', dataFirstForm.desc);
      setValue('quantity', dataFirstForm.quantity);
      setValue('price', dataFirstForm.price);
      if (dataFirstForm.category.value) {
        setValue('category', dataFirstForm.category.value);
      } else {
        setValue('category', dataFirstForm.category);
      }
    }
  }, []);

  useEffect(() => {
    if (dataMainImage?.length === 0) {
      dispatch(saveErrorMainImage('*Please upload a main photo'));
    }
  }, []);

  return (
    <div className="pt-[5px]">
      {/* {loading && isEdit ? (
        <div>loading</div>
      ) : ( */}
      <form className="px-[20px]" onSubmit={handleSubmit(hanlderFirstForm)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[20px]">
          {/* title */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="booktitle">Book Title</Label>
            </div>
            <Input
              type="text"
              name="booktitle"
              control={control}
              id="booktitle"
              placeholder="Please enter the book title"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.booktitle && errors.booktitle.message}
            </p>
          </Field>

          {/* author */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="author">Author</Label>
            </div>
            <Input
              type="text"
              name="author"
              control={control}
              id="author"
              placeholder="Please enter the author's name"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.author && errors.author.message}
            </p>
          </Field>
        </div>
        <div className="grid grid-cols-1 mb:grid-cols-2 md:grid-cols-4 gap-x-[20px]">
          {/* price */}
          <div className="flex flex-col items-start w-full">
            <div className="mb-2">
              <Label htmlFor="price">Price</Label>
            </div>
            <Input
              type="number"
              name="price"
              control={control}
              id="price"
              placeholder="Enter price"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.price && errors.price.message}
            </p>
          </div>
          {/* quatify */}
          <div className="flex flex-col items-start w-full">
            <div className="mb-2">
              <Label htmlFor="quantity">Quantity</Label>
            </div>
            <Input
              type="number"
              name="quantity"
              control={control}
              id="quantity"
              placeholder="Enter quantity"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.quantity && errors.quantity.message}
            </p>
          </div>
          {/* select */}
          <div className="w-full">
            <Field>
              <div className="mb-2">
                <Label htmlFor="category">Category</Label>
              </div>
              <SelectInput
                control={control}
                name="category"
                id="category"
              ></SelectInput>
            </Field>
          </div>
          {/* date * */}
          <div className="w-full">
            <Field>
              <div className="mb-2">
                <Label htmlFor="datePicker">Release date</Label>
              </div>
              <DatePickerInput
                control={control}
                name="datePicker"
                id="datePicker"
              ></DatePickerInput>
              <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
                {errors.datePicker && errors.datePicker.message}
              </p>
            </Field>
          </div>
        </div>

        <div className="flex flex-col justify-between md:flex-row ">
          {/* textarea */}
          <div className="md:w-[70%] w-full flex items-start flex-col">
            <div className="mb-2">
              <Label htmlFor="desc">Description</Label>
            </div>
            <TextErea
              name="desc"
              control={control}
              id="desc"
              placeholder="Please enter description"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.desc && errors.desc.message}
            </p>
          </div>
          {/* image */}
          <div className="md:w-[25%] flex items-start flex-col mb-[10px] md:mb-0">
            <div className="mb-2">
              <Label htmlFor="mainImage">Main Image</Label>
            </div>
            <UploadImage id="mainImage" />
            <p className="font-semibold text-xs text-red-500 h-[20px] py-1">
              {dataErrorMainImage !== '' && dataErrorMainImage}
            </p>
          </div>
        </div>

        <div className="text-start pb-[5px] flex items-center gap-x-[10px]">
          <button
            className="btn-70  hover:text-[#90e0ef] duration-300"
            onClick={hanleCancel}
          >
            Cancel
          </button>
          <button className="btn-70  hover:text-[#90e0ef] duration-300">
            Next
          </button>
        </div>
      </form>
      {/* )} */}
    </div>
  );
}
