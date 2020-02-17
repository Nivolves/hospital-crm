import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AnalizeChart from '../components/AnalizeChart/AnalizeChart';
import ImageCrop from '../components/ImageCrop/ImageCrop';
import ImageSelect from '../components/ImageSelect/ImageSelect';
import PatientForm from '../components/PatientForm/PatientForm';

import { url } from './Types';

const Patient: React.FC<RouteComponentProps<url>> = ({
  match: {
    params: { path },
  },
}): JSX.Element => {
  const [src, setSrc] = useState<string | ArrayBuffer | null>('');

  return (
    <>
      <PatientForm id={+path} />
      <ImageCrop id={+path} setSrc={setSrc} src={src} />
      <ImageSelect id={+path} setSrc={setSrc} />
      <AnalizeChart />
    </>
  );
};

export default Patient;
