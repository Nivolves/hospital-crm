export interface IImageCropProps {
  id: number;
  setSrc: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  src: string | ArrayBuffer | null;
}
