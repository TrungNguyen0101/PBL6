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
const schema = yup
  .object({
    publisher: yup.string().required('Please enter ublisher'),
    infomation: yup.string().required('Please enter information about book'),
    language: yup.array().min(1, 'Please select language'),
  })
  .required();

export default function SecondForm() {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const dataFirstForm = useSelector((state) => state.form.firstForm);
  const dataDescImage = useSelector((state) => state.form.descImage);
  const dataErrorDescImage = useSelector((state) => state.form.errorDescImage);

  const hanlderSecondForm = async (values) => {
    try {
      if (dataDescImage.length > 3) {
        const newValues = { ...dataFirstForm, ...values };
        newValues.descImage = dataDescImage;

        const result = await axios.post(
          'http://localhost:3030/api/book/insert',
          newValues
        );
        if (result.data.data.errCode === 0) {
          message.success(result.data.data.errMessage);
          dispatch(saveDescImage([]));
          dispatch(saveFirstForm({}));
          dispatch(saveMainImage([]));
          dispatch(prevForm());
          dispatch(offCheckAdd());
        } else {
          message.success(result.data.data.errMessage);
        }
      }
    } catch (error) {}
  };
  const prev = () => {
    dispatch(saveDescImage([]));
    dispatch(prevForm());
    message.error('Second form data is not saved !!!');
  };

  useEffect(() => {
    if (dataDescImage.length < 4) {
      dispatch(
        saveErrorDescImage('*Please upload at least 4 description photos')
      );
    }
  }, []);
  return (
    <div className="pt-[5px]">
      <form className="px-[20px]" onSubmit={handleSubmit(hanlderSecondForm)}>
        <div className="grid grid-cols-2 gap-x-[20px]">
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

          {/* title */}
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

        <div className="grid grid-cols-2 gap-x-[10px]">
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
