import { IPays } from 'app/shared/model/pays.model';

export interface IRegions {
  id?: number;
  nomRegion?: string;
  chefLieu?: string;
  pays?: IPays;
}

export class Regions implements IRegions {
  constructor(public id?: number, public nomRegion?: string, public chefLieu?: string, public pays?: IPays) {}
}
