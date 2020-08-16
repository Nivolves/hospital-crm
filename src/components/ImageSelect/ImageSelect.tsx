import React, { useCallback } from 'react';

import { useRootData } from '../../hooks/useRootData';

import { IImageSelectProps } from './Types';

import { BASE_URL, STATIC } from '../../constants/API';

import './ImageSelect.scss';

const ImageSelect: React.FC<IImageSelectProps> = ({ id, setData, setLink, setSrc, setType }): JSX.Element => {
  const { images } = useRootData(({ images }) => ({
    images: images.get(),
  }));

  const patientImages = images?.length ? images.filter(({ PatientID }) => PatientID === id).reverse() : [];

  const handleImageSelect = useCallback(
    (Link, Name, Type) => {
      console.log(Link);
      setData([]);
      setLink(Link);
      setSrc(`${BASE_URL}${STATIC}${Name}`);
      setType(Type);
    },
    [setData, setLink, setSrc, setType],
  );

  return (
    <div className="images-container">
      {!!patientImages.length &&
        patientImages.map(({ ImageID, Name }, index) => {
          return (
            <div key={ImageID} className="image">
              <img
                onClick={() => handleImageSelect(patientImages[index - 1].Link, Name, patientImages[index - 1].Type)}
                src={`${BASE_URL}${STATIC}${Name}`}
                alt="crop"
              />
              <br />
              {Name}
            </div>
          );
        })}
    </div>
  );
};

export default ImageSelect;
