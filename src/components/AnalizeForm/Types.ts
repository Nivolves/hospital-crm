import { IAnalizeChartData, IImage } from '../../Types/Common';

export interface IAnalizeFormProps {
  data: IAnalizeChartData[] | undefined;
  image: IImage;
  setData: React.Dispatch<React.SetStateAction<IAnalizeChartData[] | undefined>>;
  setTypeResult: React.Dispatch<React.SetStateAction<{ [key: string]: string } | undefined>>;
  type: string;
}
