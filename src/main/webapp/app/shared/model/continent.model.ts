import { IPays } from 'app/shared/model/pays.model';

export interface IContinent {
  id?: number;
  nomContinent?: string;
  superficie?: number;
  pays?: IPays[];
}

export class Continent implements IContinent {
  constructor(public id?: number, public nomContinent?: string, public superficie?: number, public pays?: IPays[]) {}
}
