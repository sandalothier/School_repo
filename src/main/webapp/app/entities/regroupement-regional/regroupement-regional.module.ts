import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolSharedModule } from 'app/shared/shared.module';
import { RegroupementRegionalComponent } from './regroupement-regional.component';
import { RegroupementRegionalDetailComponent } from './regroupement-regional-detail.component';
import { RegroupementRegionalUpdateComponent } from './regroupement-regional-update.component';
import { RegroupementRegionalDeleteDialogComponent } from './regroupement-regional-delete-dialog.component';
import { regroupementRegionalRoute } from './regroupement-regional.route';

@NgModule({
  imports: [SchoolSharedModule, RouterModule.forChild(regroupementRegionalRoute)],
  declarations: [
    RegroupementRegionalComponent,
    RegroupementRegionalDetailComponent,
    RegroupementRegionalUpdateComponent,
    RegroupementRegionalDeleteDialogComponent,
  ],
  entryComponents: [RegroupementRegionalDeleteDialogComponent],
})
export class SchoolRegroupementRegionalModule {}
