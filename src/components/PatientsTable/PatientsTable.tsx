import React from 'react';
import { useHistory } from 'react-router-dom';

import { Table } from 'antd';

import { useRootData } from '../../hooks/useRootData';

import { TABLE_COLUMNS } from '../../constants/TableColumns';

const PatientsTable: React.FC = (): JSX.Element => {
  const { patients } = useRootData(({ patients }) => ({
    patients: patients.get(),
  }));

  const history = useHistory();

  return (
    <Table
      onRow={row => ({
        onClick: () => history.push(`/doctor/patient/${row.PatientID}`),
      })}
      rowKey="PatientID"
      dataSource={patients}
      columns={TABLE_COLUMNS}
    />
  );
};

export default PatientsTable;
