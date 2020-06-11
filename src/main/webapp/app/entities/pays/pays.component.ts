import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPays } from 'app/shared/model/pays.model';
import { PaysService } from './pays.service';
import { PaysDeleteDialogComponent } from './pays-delete-dialog.component';

@Component({
  selector: 'jhi-pays',
  templateUrl: './pays.component.html',
})
export class PaysComponent implements OnInit, OnDestroy {
  pays?: IPays[];
  eventSubscriber?: Subscription;

  constructor(protected paysService: PaysService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.paysService.query().subscribe((res: HttpResponse<IPays[]>) => (this.pays = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPays();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPays): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPays(): void {
    this.eventSubscriber = this.eventManager.subscribe('paysListModification', () => this.loadAll());
  }

  delete(pays: IPays): void {
    const modalRef = this.modalService.open(PaysDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pays = pays;
  }
}
