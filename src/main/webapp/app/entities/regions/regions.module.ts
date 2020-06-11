import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolSharedModule } from 'app/shared/shared.module';
import { RegionsComponent } from './regions.component';
import { RegionsDetailComponent } from './regions-detail.component';
import { RegionsUpdateComponent } from './regions-update.component';
import { RegionsDeleteDialogComponent } from './regions-delete-dialog.component';
import { regionsRoute } from './regions.route';

@NgModule({
  imports: [SchoolSharedModule, RouterModule.forChild(regionsRoute)],
  declarations: [RegionsComponent, RegionsDetailComponent, RegionsUpdateComponent, RegionsDeleteDialogComponent],
  entryComponents: [RegionsDeleteDialogComponent],
})
export class SchoolRegionsModule {}
