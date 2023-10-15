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
import { offCheckAdd, prevForm } from '@/redux/reducers/formAddReducer';
import './styled.scss';
import { message } from 'antd';
const schema = yup
  .object({
    test1: yup.string().required('Please enter the book title'),
    test2: yup.string().required('Please enter price'),
    test3: yup.string().required('Please enter description'),
  })
  .required();

export default function SecondForm({ offAdd }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const dataFirstForm = useSelector((state) => state.form.firstForm);
  const dispatch = useDispatch();

  const hanlderSecondForm = (values) => {
    const newValues = { ...dataFirstForm, ...values };
    console.log(
      'file: SecondForm.jsx:39 ~ hanlderSecondForm ~ newValues:',
      newValues
    );
    message.success('Processing complete!');
    dispatch(offCheckAdd());
  };
  const prev = () => {
    dispatch(prevForm());
    message.error('Second form data is not saved !!!');
  };
  return (
    <div className="pt-[10px]">
      <form className="px-[20px]" onSubmit={handleSubmit(hanlderSecondForm)}>
        <div className="grid grid-cols-2 gap-x-[20px]">
          {/* title */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="test1">Book Title</Label>
            </div>
            <Input
              type="text"
              name="test1"
              control={control}
              id="test1"
              placeholder="Please enter the book title"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.test1 && errors.test1.message}
            </p>
          </Field>

          {/* title */}
          <Field>
            <div className="mb-2">
              <Label htmlFor="test2">Book Title</Label>
            </div>
            <Input
              type="text"
              name="test2"
              control={control}
              id="test2"
              placeholder="Please enter the book title"
              className="border"
            />
            <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
              {errors.test2 && errors.test2.message}
            </p>
          </Field>
        </div>

        {/* textarea */}
        <Field>
          <div className="mb-2">
            <Label htmlFor="test3">Description</Label>
          </div>
          <TextErea
            name="test3"
            control={control}
            id="test3"
            placeholder="Please enter description"
            className="border"
          />
          <p className="font-semibold text-xs text-red-700 h-[20px] py-1">
            {errors.test3 && errors.test3.message}
          </p>
        </Field>
        <div className="text-start pb-[10px] flex items-center gap-x-[10px]">
          <button
            className="btn-70  hover:text-[#90e0ef] duration-300"
            onClick={() => prev()}
          >
            Previous
          </button>
          <button className="btn-70  hover:text-[#90e0ef] duration-300">
            Done
          </button>
        </div>
      </form>
    </div>
  );
}
