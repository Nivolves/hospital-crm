export interface IAnalizeChartData {
  name: string;
  Норма: number;
  Патологія: number;
}

export interface IImage {
  Date: string;
  ImageID: number;
  Link: string;
  Name: string;
  PatientID: number;
  Type: string;
}

export interface IPatient {
  Age: number;
  Diagnosis: string;
  DoctorID: number;
  FathersName: string;
  FirstName: string;
  Height: number;
  LastName: string;
  PatientID: number;
  Weight: number;
}

export type IAppProps = {
  children?: React.ReactNode;
};
