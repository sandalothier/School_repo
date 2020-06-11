import { IMonnaie } from 'app/shared/model/monnaie.model';
import { IRegions } from 'app/shared/model/regions.model';
import { IRegroupementRegional } from 'app/shared/model/regroupement-regional.model';
import { IContinent } from 'app/shared/model/continent.model';

export interface IPays {
  id?: number;
  nomPays?: string;
  superficie?: number;
  sigleAuto?: string;
  capitale?: string;
  monnaie?: IMonnaie;
  regions?: IRegions[];
  regroupementRegionals?: IRegroupementRegional[];
  continent?: IContinent;
  regroupementRegional?: IRegroupementRegional;
}

export class Pays implements IPays {
  constructor(
    public id?: number,
    public nomPays?: string,
    public superficie?: number,
    public sigleAuto?: string,
    public capitale?: string,
    public monnaie?: IMonnaie,
    public regions?: IRegions[],
    public regroupementRegionals?: IRegroupementRegional[],
    public continent?: IContinent,
    public regroupementRegional?: IRegroupementRegional
  ) {}
}
