import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegroupementRegional } from 'app/shared/model/regroupement-regional.model';
import { RegroupementRegionalService } from './regroupement-regional.service';

@Component({
  templateUrl: './regroupement-regional-delete-dialog.component.html',
})
export class RegroupementRegionalDeleteDialogComponent {
  regroupementRegional?: IRegroupementRegional;

  constructor(
    protected regroupementRegionalService: RegroupementRegionalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regroupementRegionalService.delete(id).subscribe(() => {
      this.eventManager.broadcast('regroupementRegionalListModification');
      this.activeModal.close();
    });
  }
}
