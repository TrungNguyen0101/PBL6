import React, { useEffect, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import axios from 'axios';

import './styled.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveDescImage,
  saveErrorDescImage,
} from '@/redux/reducers/formAddReducer';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImageDesc = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const datadescImage = useSelector((state) => state.form.descImage);

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
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(saveDescImage(fileList));
    if (fileList.length < 4) {
      dispatch(
        saveErrorDescImage('*Please upload at least 4 description photos')
      );
    }
    if (fileList.length === 4) {
      dispatch(saveErrorDescImage(''));
    }
  }, [fileList]);
  useEffect(() => {
    if (datadescImage?.length > 0) {
      setFileList(datadescImage);
    }
  }, [datadescImage]);
  const beforeUpload = async (file, list) => {
    const prevList = fileList.length;
    const maxCount = list.length;

    if (prevList + maxCount > 6) {
      dispatch(saveErrorDescImage('*Upload max 6 description images'));
      return false;
    }
    return true;
  };
  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        maxCount={6}
        multiple
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onRemove={(e) => handleRemove(e)}
        customRequest={(e) => upLoadImage(e)}
      >
        {fileList.length > 5 ? null : (
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

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={handleCancel}
        className="max-w-[700px] max-h-[450px] top-[20px]"
      >
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
export default UploadImageDesc;
