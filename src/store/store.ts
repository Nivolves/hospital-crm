import { observable } from 'mobx';

import { IAnalize, IImage, IPatient } from '../Types/Common';

export const createStore = () => {
  const store = {
    analizes: observable.box<IAnalize[]>([]),
    images: observable.box<IImage[]>([]),
    patients: observable.box<IPatient[]>([]),

    setAnalizes(analizes: IAnalize[]): void {
      this.analizes.set(analizes);
    },

    setPatients(patients: IPatient[]): void {
      this.patients.set(patients);
    },

    setImages(images: IImage[]): void {
      this.images.set(images);
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
