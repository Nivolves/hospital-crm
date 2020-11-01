import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Table } from 'antd';

import { useRootData } from '../../hooks/useRootData';

import { IPatient } from '../../Types/Common';

import { BASE_URL, PATIENT } from '../../constants/API';

const { Column } = Table;

const PatientsTable: React.FC = (): JSX.Element => {
  const { patients, setPatients } = useRootData(({ patients, setPatients }) => ({
    patients: patients.get(),
    setPatients
  }));

  const history = useHistory();

  const handleDeletePatient = useCallback(
    (id) => {
      fetch(`${BASE_URL}${PATIENT}/delete/${id}`)
        .then(() => setPatients(patients.filter(({PatientID}) => PatientID !== id)))
        .catch(err => console.error(err));
    },
    [patients, setPatients],
  );

  return (
    <Table
      rowKey="PatientID"
      dataSource={patients}
    >
      <Column onCellClick={(row: IPatient) => history.push(`/doctor/patient/${row.PatientID}`)} title="Ім'я" dataIndex="FirstName" key="FirstName" />
      <Column onCellClick={(row: IPatient) => history.push(`/doctor/patient/${row.PatientID}`)} title="Прізвище" dataIndex="LastName" key="LastName" />
      <Column
        onCellClick={(values: IPatient) => handleDeletePatient(values.PatientID)}
        title="Action"
        key="action"
        render={() => {
          return <a>Delete</a>;
        }}
    />
    </Table>
  );
};

export default PatientsTable;
