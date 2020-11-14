import { IAnalizeChartData } from '../../Types/Common';

export interface IImageSelectProps {
  id: string;
  setData: React.Dispatch<React.SetStateAction<IAnalizeChartData[] | undefined>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setSrc: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
}
