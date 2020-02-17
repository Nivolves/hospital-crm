import React from 'react';

import { useRootData } from '../../hooks/useRootData';

import { IImageSelectProps } from './Types';

import { BASE_URL, STATIC } from '../../constants/API';

import './ImageSelect.scss';

const ImageSelect: React.FC<IImageSelectProps> = ({ id, setSrc }): JSX.Element => {
  const { images } = useRootData(({ images }) => ({
    images: images.get(),
  }));

  const patientImages = images.length ? images.filter(({ PatientID }) => PatientID === id) : [];

  console.log(patientImages);

  return (
    <div className="images-container">
      {!!patientImages.length &&
        patientImages.map(({ ImageID, Name }) => (
          <div key={ImageID} className="image">
            <img onClick={() => setSrc(`${BASE_URL}${STATIC}${Name}`)} src={`${BASE_URL}${STATIC}${Name}`} alt="crop" />
            <br />
            {Name}
          </div>
        ))}
    </div>
  );
};

export default ImageSelect;
