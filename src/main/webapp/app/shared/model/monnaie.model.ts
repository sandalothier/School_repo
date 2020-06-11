import { IPays } from 'app/shared/model/pays.model';

export interface IMonnaie {
  id?: number;
  monnaie?: string;
  sigle?: string;
  pays?: IPays;
}

export class Monnaie implements IMonnaie {
  constructor(public id?: number, public monnaie?: string, public sigle?: string, public pays?: IPays) {}
}
