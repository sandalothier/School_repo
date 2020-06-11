import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMonnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';
import { MonnaieDeleteDialogComponent } from './monnaie-delete-dialog.component';

@Component({
  selector: 'jhi-monnaie',
  templateUrl: './monnaie.component.html',
})
export class MonnaieComponent implements OnInit, OnDestroy {
  monnaies?: IMonnaie[];
  eventSubscriber?: Subscription;

  constructor(protected monnaieService: MonnaieService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.monnaieService.query().subscribe((res: HttpResponse<IMonnaie[]>) => (this.monnaies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMonnaies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMonnaie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMonnaies(): void {
    this.eventSubscriber = this.eventManager.subscribe('monnaieListModification', () => this.loadAll());
  }

  delete(monnaie: IMonnaie): void {
    const modalRef = this.modalService.open(MonnaieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.monnaie = monnaie;
  }
}
