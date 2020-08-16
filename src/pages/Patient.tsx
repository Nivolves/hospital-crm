import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AnalizeChart from '../components/AnalizeChart/AnalizeChart';
import Analizes from '../components/Analizes/Analizes';
import ImageCrop from '../components/ImageCrop/ImageCrop';
import ImageSelect from '../components/ImageSelect/ImageSelect';
import PatientForm from '../components/PatientForm/PatientForm';
import TransformImages from '../components/TransformImages/TransformImages';

import { IAnalizeChartData } from '../Types/Common';

import { url } from './Types';

const Patient: React.FC<RouteComponentProps<url>> = ({
  match: {
    params: { path },
  },
}): JSX.Element => {
  const [data, setData] = useState<IAnalizeChartData[]>();
  const [link, setLink] = useState<string>('');
  const [src, setSrc] = useState<string | ArrayBuffer | null>('');
  const [type, setType] = useState<string>('');
  const [typeResult, setTypeResult] = useState<{ [key: string]: string }>();

  return (
    <>
      <PatientForm id={+path} />
      <Analizes id={+path} />
      <ImageCrop
        data={data}
        id={+path}
        link={link}
        setData={setData}
        setLink={setLink}
        setSrc={setSrc}
        setType={setType}
        setTypeResult={setTypeResult}
        src={src}
        type={type}
      />
      {data && !!data.length && typeResult && !!Object.values(typeResult).length && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <AnalizeChart data={data} typeResult={typeResult} />
          <TransformImages link={src as string} />
        </div>
      )}
      <ImageSelect id={+path} setData={setData} setLink={setLink} setSrc={setSrc} setType={setType} />
    </>
  );
};

export default Patient;
