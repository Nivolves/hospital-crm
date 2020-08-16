import { IAnalizeChartData } from '../../Types/Common';

export interface IAnalizeFormProps {
  data: IAnalizeChartData[] | undefined;
  link: string;
  setData: React.Dispatch<React.SetStateAction<IAnalizeChartData[] | undefined>>;
  setTypeResult: React.Dispatch<React.SetStateAction<{ [key: string]: string } | undefined>>;
  type: string;
}
