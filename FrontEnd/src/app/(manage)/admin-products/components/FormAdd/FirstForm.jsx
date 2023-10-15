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
  saveFirstForm,
} from '@/redux/reducers/formAddReducer';
import DatePickerInput from '@/components/DatePickerInput';
import { useEffect } from 'react';
import { message } from 'antd';

const schema = yup
  .object({
    booktitle: yup.string().required('Please enter the book title'),
    price: yup.string().required('Please enter price'),
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

export default function FirstForm({ offAdd }) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const dataFirstForm = useSelector((state) => state.form.firstForm);

  const hanlderFirstForm = (values) => {
    dispatch(nextForm());
    dispatch(saveFirstForm(values));
    message.config({
      duration: 1, // Độ dài mili giây của mỗi message (2 giây)
      maxCount: 1, // Số lượng message tối đa hiển thị cùng một lúc
    });
    message.success("The first form's data has been saved!");
  };

  function isObjectEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
  useEffect(() => {
    if (!isObjectEmpty(dataFirstForm)) {
      setValue('author', dataFirstForm.author);
      setValue('booktitle', dataFirstForm.booktitle);
      setValue('datePicker', dataFirstForm.datePicker);
      setValue('desc', dataFirstForm.desc);
      setValue('price', dataFirstForm.price);
      if (dataFirstForm.category.value) {
        setValue('category', dataFirstForm.category.value);
      } else {
        setValue('category', dataFirstForm.category);
      }
    }
  }, []);
  return (
    <div className="pt-[5px]">
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
        <div className="grid grid-cols-1 mb:grid-cols-2 md:grid-cols-3 gap-x-[20px]">
          {/* price */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="price">Price</Label>
            </div>
            <Input
              type="text"
              name="price"
              control={control}
              id="price"
              placeholder="Please enter book price"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.price && errors.price.message}
            </p>
          </Field>

          {/* select */}
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

          {/* date * */}
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
        {/* textarea */}
        <Field>
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
        </Field>

        <div className="text-start pb-[5px] flex items-center gap-x-[10px]">
          <button
            className="btn-70  hover:text-[#90e0ef] duration-300"
            onClick={() => dispatch(offCheckAdd())}
          >
            Cancel
          </button>
          <button className="btn-70  hover:text-[#90e0ef] duration-300">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
