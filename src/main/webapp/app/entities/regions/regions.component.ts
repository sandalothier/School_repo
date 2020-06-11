import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegions } from 'app/shared/model/regions.model';
import { RegionsService } from './regions.service';
import { RegionsDeleteDialogComponent } from './regions-delete-dialog.component';

@Component({
  selector: 'jhi-regions',
  templateUrl: './regions.component.html',
})
export class RegionsComponent implements OnInit, OnDestroy {
  regions?: IRegions[];
  eventSubscriber?: Subscription;

  constructor(protected regionsService: RegionsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.regionsService.query().subscribe((res: HttpResponse<IRegions[]>) => (this.regions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRegions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegions): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegions(): void {
    this.eventSubscriber = this.eventManager.subscribe('regionsListModification', () => this.loadAll());
  }

  delete(regions: IRegions): void {
    const modalRef = this.modalService.open(RegionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.regions = regions;
  }
}
