import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolSharedModule } from 'app/shared/shared.module';
import { ContinentComponent } from './continent.component';
import { ContinentDetailComponent } from './continent-detail.component';
import { ContinentUpdateComponent } from './continent-update.component';
import { ContinentDeleteDialogComponent } from './continent-delete-dialog.component';
import { continentRoute } from './continent.route';

@NgModule({
  imports: [SchoolSharedModule, RouterModule.forChild(continentRoute)],
  declarations: [ContinentComponent, ContinentDetailComponent, ContinentUpdateComponent, ContinentDeleteDialogComponent],
  entryComponents: [ContinentDeleteDialogComponent],
})
export class SchoolContinentModule {}
