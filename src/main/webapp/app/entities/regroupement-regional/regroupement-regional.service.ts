import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRegroupementRegional } from 'app/shared/model/regroupement-regional.model';

type EntityResponseType = HttpResponse<IRegroupementRegional>;
type EntityArrayResponseType = HttpResponse<IRegroupementRegional[]>;

@Injectable({ providedIn: 'root' })
export class RegroupementRegionalService {
  public resourceUrl = SERVER_API_URL + 'api/regroupement-regionals';

  constructor(protected http: HttpClient) {}

  create(regroupementRegional: IRegroupementRegional): Observable<EntityResponseType> {
    return this.http.post<IRegroupementRegional>(this.resourceUrl, regroupementRegional, { observe: 'response' });
  }

  update(regroupementRegional: IRegroupementRegional): Observable<EntityResponseType> {
    return this.http.put<IRegroupementRegional>(this.resourceUrl, regroupementRegional, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegroupementRegional>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegroupementRegional[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
