import React from 'react';

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: '1',
    Норма: 4000,
    Патологія: 2400,
  },
  {
    name: '2',
    Норма: 3000,
    Патологія: 1398,
  },
  {
    name: '3',
    Норма: 2000,
    Патологія: 9800,
  },
];

const AnalizeChart: React.FC = (): JSX.Element => {
  return (
    <BarChart style={{ marginTop: 30 }} width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Норма" fill="#82ca9d" />
      <Bar dataKey="Патологія" fill="#ff0000" />
    </BarChart>
  );
};

export default AnalizeChart;
