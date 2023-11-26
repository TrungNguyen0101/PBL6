'use client';

import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import ButtonForm from '@/components/ButtonForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextErea from '@/components/TextErea';
import SelectInput from '@/components/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  offCheckAdd,
  prevForm,
  saveDescImage,
  saveErrorDescImage,
  saveFirstForm,
  saveMainImage,
} from '@/redux/reducers/formAddReducer';
import './styled.scss';
import { message } from 'antd';
import UploadImage from '@/components/UploadImage';
import UploadImageDesc from '@/components/UploadImage/UploadImageDesc';
import SelectInputLanguage from '@/components/SelectInputLanguage';
import { useEffect } from 'react';
import axios from 'axios';
import { postBook } from '@/services/bookService';
const schema = yup
  .object({
    publisher: yup.string().required('Please enter ublisher'),
    infomation: yup.string().required('Please enter information about book'),
    language: yup.array().min(1, 'Please select language'),
  })
  .required();

export default function SecondForm({ isEdit, book }) {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const dataFirstForm = useSelector((state) => state.form.firstForm);
  const dataFirstFormEdit = useSelector((state) => state.form.firstFormEdit);
  const dataDescImage = useSelector((state) => state.form.descImage);
  const dataErrorDescImage = useSelector((state) => state.form.errorDescImage);

  const hanlderSecondForm = async (values) => {
    try {
      if (!!!isEdit) {
        if (dataDescImage.length > 3) {
          const newValues = { ...dataFirstForm, ...values };
          newValues.descImage = dataDescImage;

          const result = await postBook(newValues);
          if (result.data.errCode === 0) {
            message.success(result.data.errMessage);
            dispatch(saveDescImage([]));
            dispatch(saveFirstForm({}));
            dispatch(saveMainImage([]));
            dispatch(prevForm());
            dispatch(offCheckAdd());
          } else {
            message.success(result.data.errMessage);
          }
        }
      } else {
        const newValues = { ...dataFirstFormEdit, ...values };
        newValues.descImage = dataDescImage;
      }
    } catch (error) {}
  };
  const prev = () => {
    if (!!!isEdit) {
      dispatch(saveDescImage([]));
      dispatch(prevForm());
      message.error('Second form data is not saved !!!');
    } else {
      dispatch(prevForm());
      message.error('The second form update data is not saved !!!');
    }
  };

  useEffect(() => {
    if (dataDescImage?.length < 4) {
      dispatch(
        saveErrorDescImage('*Please upload at least 4 description photos')
      );
    } else {
      dispatch(saveErrorDescImage(''));
    }
  }, [dataDescImage]);

  function isObjectEmpty(obj) {
    obj = obj ?? {};

    return Object.getOwnPropertyNames(obj).length === 0;
  }

  /* set value edit */
  useEffect(() => {
    if (!isObjectEmpty(book)) {
      setValue('publisher', book.publisher);
      setValue('infomation', book.infomation);
      setValue('language', book.language);
      dispatch(saveDescImage(book.descImage));
    }
  }, [book]);
  return (
    <div className="pt-[5px]">
      <form className="px-[20px]" onSubmit={handleSubmit(hanlderSecondForm)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px]">
          {/* title */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="publisher">Publisher</Label>
            </div>
            <Input
              type="text"
              name="publisher"
              control={control}
              id="publisher"
              placeholder="Please enter Publisher"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.publisher && errors.publisher.message}
            </p>
          </Field>

          {/* language */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="language">Language</Label>
            </div>
            <SelectInputLanguage
              control={control}
              name="language"
              id="language"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.language && errors.language.message}
            </p>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[10px]">
          {/* textarea */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="infomation">Information about book</Label>
            </div>
            <TextErea
              name="infomation"
              control={control}
              id="infomation"
              placeholder="Please enter Information about book"
              className="border h-[150px]"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.infomation && errors.infomation.message}
            </p>
          </Field>
          {/* image */}
          <div className="flex flex-col flex-wrap items-start w-full">
            <div className="mb-2">
              <Label htmlFor="imageDesc">Description Image</Label>
            </div>
            <div className="w-full text-start">
              <UploadImageDesc id="imageDesc" />
            </div>
            <p className="font-semibold text-xs text-red-500 h-[20px] py-1">
              {dataErrorDescImage !== '' && dataErrorDescImage}
            </p>
          </div>
        </div>
        <div className="text-start pb-[5px] flex items-center gap-x-[10px]">
          <button
            className="btn-70  hover:text-[#90e0ef] duration-300"
            onClick={() => prev()}
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn-70  hover:text-[#90e0ef] duration-300"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
}
