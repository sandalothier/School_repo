import { IPays } from 'app/shared/model/pays.model';

export interface IRegroupementRegional {
  id?: number;
  sigle?: string;
  nomRegroupement?: string;
  pays?: IPays[];
  pays?: IPays;
}

export class RegroupementRegional implements IRegroupementRegional {
  constructor(public id?: number, public sigle?: string, public nomRegroupement?: string, public pays?: IPays[], public pays?: IPays) {}
}
