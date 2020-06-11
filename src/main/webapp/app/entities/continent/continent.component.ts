import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContinent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';
import { ContinentDeleteDialogComponent } from './continent-delete-dialog.component';

@Component({
  selector: 'jhi-continent',
  templateUrl: './continent.component.html',
})
export class ContinentComponent implements OnInit, OnDestroy {
  continents?: IContinent[];
  eventSubscriber?: Subscription;

  constructor(protected continentService: ContinentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.continentService.query().subscribe((res: HttpResponse<IContinent[]>) => (this.continents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContinents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContinent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContinents(): void {
    this.eventSubscriber = this.eventManager.subscribe('continentListModification', () => this.loadAll());
  }

  delete(continent: IContinent): void {
    const modalRef = this.modalService.open(ContinentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.continent = continent;
  }
}
