'use client';

import React, { useEffect, useState } from 'react';
import routes from '@/constant/routes';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Field from '@/components/Field';
import Button from '@/components/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateReducer } from '@/redux/reducers/updateInforReducer';
import { updateInforUser } from '@/services/authService';
import { toast } from 'react-toastify';
import { FaCheck, FaImage } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation('info');
  const [auth, setAuth] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
  });
  const handleChangeInfor = async (values) => {
    const inputPhoneNumber = document.querySelector('.input-phoneNumber');
    if (inputPhoneNumber.value.charAt(0) !== '0') {
      toast.error('Số điện thọai không hợp lệ');
      return;
    } else if (typeof Number(inputPhoneNumber.value) !== 'number') {
      toast('Số điện thọai không hợp lệ');
      return;
    } else if (
      inputPhoneNumber.value.length > 10 ||
      inputPhoneNumber.value.length < 10
    ) {
      toast.error('Số điện thoại phải là số có 10 chữ số');
      return;
    }
    const res = await updateInforUser(
      values.username,
      values.phoneNumber,
      avatar
    );
    console.log(res);
    if (res.status === 200) {
      toast.success(res.message);
      sessionStorage.setItem('auth', JSON.stringify(res));
      dispatch(updateReducer());
    }
  };
  const uploadProfileImg = async (formData) => {
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dsrvia1wu/image/upload',
        formData
      );
      const { url, asset_id, etag } = res.data;
      return { url, asset_id, etag };
    } catch (err) {
      console.log(err);
    }
  };
  const upLoadImage = async (e) => {
    try {
      const fileInput = e.target.files[0];
      if (fileInput) {
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(fileInput);

        const formData = new FormData();
        formData.append('file', fileInput);
        formData.append('upload_preset', 'StoreApp_TN');

        const image = await uploadProfileImg(formData);
        if (image?.url) {
          setLoadingImage(false);
        }
        setAvatar(image?.url);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  useEffect(() => {
    reset({
      email: auth?.user?.email,
      username: auth?.user?.username,
      phoneNumber: auth?.user?.phoneNumber,
    });
    setPreviewAvatar(auth?.user?.avatar);
    setAvatar(auth?.user?.avatar);
  }, [auth]);
  // useEffect(() => {

  // }, []);
  return (
    <div>
      <form
        className="w-[800px] bg-[#f2f3f4] shadow-xl mx-auto rounded-md p-8"
        onSubmit={handleSubmit(handleChangeInfor)}
      >
        <h1 className="mb-5 text-2xl font-semibold text-center">
          {t('Userinfo')}
        </h1>
        <div className="w-[500px] bg-white mx-auto p-4 rounded-md mb-2">
          <h2 className="text-2xl font-semibold text-center">{t('Verify')}</h2>
          <h3 className="flex items-center justify-center mb-2 text-sm font-semibold gap-x-1">
            {auth?.isVerified ? t('suceessVerify') : t('failVerify')}
            {auth?.user?.isVerified && <FaCheck color="green" size="15px" />}
          </h3>
          {auth?.user?.isVerified === false && (
            <div className="mx-auto w-max">
              <Button type="button" kind="primary" to={routes.VERIFYCODE}>
                {t('Verifynow')}
              </Button>
            </div>
          )}
        </div>
        <div className="relative mx-auto my-2 w-max">
          {previewAvatar ? (
            <label
              htmlFor="avatar"
              className="w-[120px] h-[120px] bg-white cursor-pointer rounded-full flex items-center justify-center relative"
            >
              <img
                src={previewAvatar}
                alt=""
                className="object-cover w-full h-full border-0 rounded-full"
              />
            </label>
          ) : (
            <label
              htmlFor="avatar"
              className="w-[120px] h-[120px] mx-auto bg-white cursor-pointer rounded-full flex items-center justify-center"
            >
              {!loading ? (
                <FaImage />
              ) : (
                <img
                  src={selectedImage}
                  alt=""
                  className={`object-cover w-full h-full border-0 rounded-full ${
                    loadingImage ? 'opacity-50' : 'opacity-100'
                  }`}
                />
              )}
            </label>
          )}
          <input
            type="file"
            id="avatar"
            hidden
            onChange={(e) => upLoadImage(e)}
          />
        </div>
        <div className="mb-3">
          <Field>
            <div className="mb-2">
              <Label htmlFor="email">{t('Emailaddress')}</Label>
            </div>
            <Input
              type="email"
              name="email"
              control={control}
              id="email"
              readOnly={true}
              placeholder="Enter your email address"
            />
          </Field>
        </div>
        <div className="mb-3">
          <Field>
            <div className="mb-2">
              <Label htmlFor="username">{t('Username')}</Label>
            </div>
            <Input
              type="text"
              name="username"
              control={control}
              id="username"
              placeholder="Enter your username"
            />
          </Field>
        </div>
        <div className="mb-5">
          <Field>
            <div className="mb-2">
              <Label htmlFor="phoneNumber">{t('PhoneNumber')}</Label>
            </div>
            <Input
              type="text"
              name="phoneNumber"
              control={control}
              id="phoneNumber"
              placeholder={t('EYNB')}
              className="input-phoneNumber"
            />
          </Field>
        </div>
        <div className="mx-auto w-max">
          <Button kind="primary">{t('Saveinformation')}</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
