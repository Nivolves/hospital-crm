export interface IImage {
  Date: string;
  ImageID: number;
  Link: string;
  Name: string;
  PatientID: number;
  Type: string;
}

export interface IPatient {
  Diagnosis: string;
  DoctorID: number;
  FathersName: string;
  FirstName: string;
  Height: number;
  LastName: string;
  PatientID: number;
  Phone: string;
  Weight: number;
}

export type IAppProps = {
  children?: React.ReactNode;
};
