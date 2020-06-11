import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContinent, Continent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';
import { ContinentComponent } from './continent.component';
import { ContinentDetailComponent } from './continent-detail.component';
import { ContinentUpdateComponent } from './continent-update.component';

@Injectable({ providedIn: 'root' })
export class ContinentResolve implements Resolve<IContinent> {
  constructor(private service: ContinentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContinent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((continent: HttpResponse<Continent>) => {
          if (continent.body) {
            return of(continent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Continent());
  }
}

export const continentRoute: Routes = [
  {
    path: '',
    component: ContinentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.continent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContinentDetailComponent,
    resolve: {
      continent: ContinentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.continent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContinentUpdateComponent,
    resolve: {
      continent: ContinentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.continent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContinentUpdateComponent,
    resolve: {
      continent: ContinentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'schoolApp.continent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
