import React, { useCallback, useEffect } from 'react';

import { useRootData } from '../../hooks/useRootData';

import { IImageSelectProps } from './Types';

import { BASE_URL, STATIC, IMAGES } from '../../constants/API';

import './ImageSelect.scss';

const ImageSelect: React.FC<IImageSelectProps> = ({ id, setData, setLink, setSrc, setType }): JSX.Element => {
  const { images, setImages } = useRootData(({ images, setImages }) => ({
    images: images.get(),
    setImages
  }));

  useEffect(() => {
    fetch(`${BASE_URL}${IMAGES}`, {
      headers: {
        patientId: id
      }
    })
    .then(res => res.json())
    .then(result => setImages(result))
    .catch(err => console.error(err));
  }, [id, setImages]);

  const handleImageSelect = useCallback(
    (link, name, type) => {
      setData([]);
      setLink(link);
      setSrc(`${BASE_URL}${STATIC}${name}`);
      setType(type);
    },
    [setData, setLink, setSrc, setType],
  );

  return (
    <div className="images-container">
      {images && !!images.length &&
        images.map(({ imageId, name }, index) => {
          return (
            <div key={imageId} className="image">
              <img
                onClick={() => handleImageSelect(images[index].link, name, images[index].type)}
                src={`${BASE_URL}${STATIC}${name}`}
                alt="crop"
              />
              <br />
              {name}
            </div>
          );
        })}
    </div>
  );
};

export default ImageSelect;
