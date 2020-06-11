import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContinent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';

@Component({
  templateUrl: './continent-delete-dialog.component.html',
})
export class ContinentDeleteDialogComponent {
  continent?: IContinent;

  constructor(protected continentService: ContinentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.continentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('continentListModification');
      this.activeModal.close();
    });
  }
}
