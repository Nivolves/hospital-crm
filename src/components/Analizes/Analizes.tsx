import React, { useEffect, useState } from 'react';

import AddAnalize from './AddAnalize';

import { Button } from 'antd';

import { useRootData } from '../../hooks/useRootData';

import { IAnalizesProps } from './Types';

import { ANALIZES, BASE_URL } from '../../constants/API';

const Analizes: React.FC<IAnalizesProps> = ({ id }): JSX.Element => {
  const [isModalOpen, setModal] = useState<boolean>(false);
  const { analizes, setAnalizes } = useRootData(({ analizes, setAnalizes }) => ({
    analizes: analizes.get(),
    setAnalizes,
  }));

  useEffect(() => {
    fetch(`${BASE_URL}${ANALIZES}`)
      .then(res => res.json())
      .then(result => {
        const patientAnalizes = result?.length ? result.filter(({ PatientID }) => PatientID === id).reverse() : [];
        setAnalizes(patientAnalizes);
      })
      .catch(err => console.error(err));
  }, [id, setAnalizes]);

  return (
    <div>
      <Button onClick={() => setModal(true)} style={{ marginBottom: 20 }}>
        Додати аналіз
      </Button>
      <AddAnalize id={id} isModalOpen={isModalOpen} setModal={setModal} />
      <>
        {analizes &&
          analizes.map(({ Date: date, Name, Value }) => (
            <p key={date}>
              {new Date(date).toLocaleDateString()} &nbsp;{Name} &nbsp;{Value}
            </p>
          ))}
      </>
    </div>
  );
};

export default Analizes;
