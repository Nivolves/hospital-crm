import { IAnalizeChartData } from '../../Types/Common';

export interface IImageCropProps {
  data: IAnalizeChartData[] | undefined;
  id: number;
  link: string;
  setData: React.Dispatch<React.SetStateAction<IAnalizeChartData[] | undefined>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setSrc: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setTypeResult: React.Dispatch<React.SetStateAction<string | undefined>>;
  src: string | ArrayBuffer | null;
  type: string;
}
