import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'continent',
        loadChildren: () => import('./continent/continent.module').then(m => m.SchoolContinentModule),
      },
      {
        path: 'pays',
        loadChildren: () => import('./pays/pays.module').then(m => m.SchoolPaysModule),
      },
      {
        path: 'regroupement-regional',
        loadChildren: () => import('./regroupement-regional/regroupement-regional.module').then(m => m.SchoolRegroupementRegionalModule),
      },
      {
        path: 'regions',
        loadChildren: () => import('./regions/regions.module').then(m => m.SchoolRegionsModule),
      },
      {
        path: 'monnaie',
        loadChildren: () => import('./monnaie/monnaie.module').then(m => m.SchoolMonnaieModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SchoolEntityModule {}
