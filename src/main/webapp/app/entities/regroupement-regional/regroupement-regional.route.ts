import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegroupementRegional, RegroupementRegional } from 'app/shared/model/regroupement-regional.model';
import { RegroupementRegionalService } from './regroupement-regional.service';
import { RegroupementRegionalComponent } from './regroupement-regional.component';
import { RegroupementRegionalDetailComponent } from './regroupement-regional-detail.component';
import { RegroupementRegionalUpdateComponent } from './regroupement-regional-update.component';

@Injectable({ providedIn: 'root' })
export class RegroupementRegionalResolve implements Resolve<IRegroupementRegional> {
  constructor(private service: RegroupementRegionalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegroupementRegional> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((regroupementRegional: HttpResponse<RegroupementRegional>) => {
          if (regroupementRegional.body) {
            return of(regroupementRegional.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegroupementRegional());
  }
}

export const regroupementRegionalRoute: Routes = [
  {
    path: '',
    component: RegroupementRegionalComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.regroupementRegional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegroupementRegionalDetailComponent,
    resolve: {
      regroupementRegional: RegroupementRegionalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.regroupementRegional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegroupementRegionalUpdateComponent,
    resolve: {
      regroupementRegional: RegroupementRegionalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.regroupementRegional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegroupementRegionalUpdateComponent,
    resolve: {
      regroupementRegional: RegroupementRegionalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.regroupementRegional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
