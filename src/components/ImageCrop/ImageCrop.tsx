import React, { useCallback, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import AnalizeForm from '../AnalizeForm/AnalizeForm';
import SaveModal from '../SaveModal/SaveModal';

import { Button, Icon, message, Upload } from 'antd';

import { IImageCropProps } from './Types';
import { UploadFile } from 'antd/lib/upload/interface';

import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop: React.FC<IImageCropProps> = ({ id, setSrc, src }): JSX.Element => {
  const [crop, setCrop] = useState<Crop>({ aspect: 16 / 9 });
  const [croppedImage, setCropedImage] = useState<unknown>(undefined);
  const [image, setImage] = useState<any>(null);
  const [isModalOpen, openModal] = useState<boolean>(false);
  const [isCropModalOpen, openCropModal] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getCroppedImg = (image, crop) => {
    if (!image) {
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
    }

    return new Promise(resolve => {
      const url = canvas.toDataURL('image/jpeg', 1.0);
      resolve(url);
    });
  };

  const handleComplete = useCallback(async () => {
    const img = new Image();

    img.setAttribute('crossorigin', 'anonymous');
    img.src = src as string;
    // console.log(img);
    setCropedImage(await getCroppedImg(img, crop));
  }, [crop, src]);

  const handleChange = useCallback(info => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList([info.fileList[info.fileList.length - 1]]);
    openModal(true);
  }, []);

  const handleUpload = useCallback(
    file => {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      }
      return false;
    },
    [setSrc],
  );

  const handleCancel = useCallback(() => {
    openModal(false);
    setSrc(null);
    setFileList([]);
  }, [openModal, setFileList, setSrc]);

  return (
    <>
      <SaveModal
        id={id}
        link={src as string}
        title="Збереження"
        onCancel={handleCancel}
        openModal={openModal}
        visible={isModalOpen}
      />
      <Upload
        fileList={fileList}
        multiple={false}
        onChange={handleChange}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        headers={{
          authorization: 'authorization-text',
        }}
        beforeUpload={handleUpload}
        name="file"
      >
        <Button>
          <Icon type="upload" />
          Завантажити
        </Button>
      </Upload>
      {src && (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <ReactCrop
              style={{ display: 'block' }}
              onImageLoaded={image => setImage(image)}
              src={src as string}
              crop={crop}
              onComplete={handleComplete}
              onChange={newCrop => setCrop(newCrop)}
            />
            <AnalizeForm />
          </div>
          <div style={{ width: '50%' }}>
            {croppedImage && (
              <div style={{ marginLeft: 50 }}>
                <img style={{ display: 'block' }} src={croppedImage as string} alt="crop" />
                <Button style={{ marginTop: 30 }} onClick={() => openCropModal(true)}>
                  Обрізати
                </Button>
                <SaveModal
                  id={id}
                  link={croppedImage as string}
                  title="Збереження"
                  onCancel={() => openCropModal(false)}
                  openModal={openCropModal}
                  visible={isCropModalOpen}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCrop;
