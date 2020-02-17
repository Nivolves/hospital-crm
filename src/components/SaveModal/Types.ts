export interface ISaveModalProps {
  id: number;
  link: string;
  title: string;
  visible: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}
