import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegroupementRegional } from 'app/shared/model/regroupement-regional.model';
import { RegroupementRegionalService } from './regroupement-regional.service';
import { RegroupementRegionalDeleteDialogComponent } from './regroupement-regional-delete-dialog.component';

@Component({
  selector: 'jhi-regroupement-regional',
  templateUrl: './regroupement-regional.component.html',
})
export class RegroupementRegionalComponent implements OnInit, OnDestroy {
  regroupementRegionals?: IRegroupementRegional[];
  eventSubscriber?: Subscription;

  constructor(
    protected regroupementRegionalService: RegroupementRegionalService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.regroupementRegionalService
      .query()
      .subscribe((res: HttpResponse<IRegroupementRegional[]>) => (this.regroupementRegionals = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRegroupementRegionals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegroupementRegional): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegroupementRegionals(): void {
    this.eventSubscriber = this.eventManager.subscribe('regroupementRegionalListModification', () => this.loadAll());
  }

  delete(regroupementRegional: IRegroupementRegional): void {
    const modalRef = this.modalService.open(RegroupementRegionalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.regroupementRegional = regroupementRegional;
  }
}
