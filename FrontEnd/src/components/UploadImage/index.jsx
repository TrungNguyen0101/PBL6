import React, { useEffect, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import axios from 'axios';

import './styled.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveErrorMainImage,
  saveMainImage,
} from '@/redux/reducers/formAddReducer';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const dataMainImage = useSelector((state) => state.form.mainImage);

  /* cancel preview */
  const handleCancel = () => setPreviewOpen(false);

  /* preview */
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  /* remove */
  const handleRemove = (e) => {
    const index = fileList?.findIndex((f) => f?.uid === e?.uid);
    const copyList = fileList.slice();
    copyList.splice(index, 1);
    setFileList([...copyList]);
    if (copyList.length === 0) {
      dispatch(saveErrorMainImage('*Please upload a main photo'));
    }
  };

  /* upload image with cloudinary */
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
  /* Upload image with local */
  const upLoadImage = async (e) => {
    try {
      if (e.file) {
        setLoading(true);

        const formData = new FormData();
        formData.append('file', e.file);
        formData.append('upload_preset', 'nguyenGMO');
        const image = await uploadProfileImg(formData);

        /* etag : check image upload trùng nếu cần */
        setFileList((prevImagePaths) => [
          ...prevImagePaths,
          {
            url: image?.url,
          },
        ]);
        setLoading(false); // Tải lên hoàn thành
        dispatch(saveErrorMainImage(''));
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(saveMainImage(fileList));
  }, [fileList]);
  useEffect(() => {
    if (dataMainImage.length > 0) {
      setFileList(dataMainImage);
    }
  }, []);

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        maxCount={5}
        multiple
        onPreview={handlePreview}
        // beforeUpload={beforeUpload}
        onRemove={(e) => handleRemove(e)}
        customRequest={(e) => upLoadImage(e)}
      >
        {fileList.length >= 1 ? null : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        )}
      </Upload>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadImage;
