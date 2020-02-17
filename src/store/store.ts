import { observable } from 'mobx';

import { IImage, IPatient } from '../Types/Common';

export const createStore = () => {
  const store = {
    images: observable.box<IImage[]>([]),
    patients: observable.box<IPatient[]>([]),

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
