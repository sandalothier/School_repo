import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMonnaie, Monnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';
import { MonnaieComponent } from './monnaie.component';
import { MonnaieDetailComponent } from './monnaie-detail.component';
import { MonnaieUpdateComponent } from './monnaie-update.component';

@Injectable({ providedIn: 'root' })
export class MonnaieResolve implements Resolve<IMonnaie> {
  constructor(private service: MonnaieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMonnaie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((monnaie: HttpResponse<Monnaie>) => {
          if (monnaie.body) {
            return of(monnaie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Monnaie());
  }
}

export const monnaieRoute: Routes = [
  {
    path: '',
    component: MonnaieComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.monnaie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MonnaieDetailComponent,
    resolve: {
      monnaie: MonnaieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.monnaie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MonnaieUpdateComponent,
    resolve: {
      monnaie: MonnaieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.monnaie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MonnaieUpdateComponent,
    resolve: {
      monnaie: MonnaieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.monnaie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
