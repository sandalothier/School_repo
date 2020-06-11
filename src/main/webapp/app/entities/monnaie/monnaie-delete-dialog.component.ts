import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMonnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';

@Component({
  templateUrl: './monnaie-delete-dialog.component.html',
})
export class MonnaieDeleteDialogComponent {
  monnaie?: IMonnaie;

  constructor(protected monnaieService: MonnaieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.monnaieService.delete(id).subscribe(() => {
      this.eventManager.broadcast('monnaieListModification');
      this.activeModal.close();
    });
  }
}
