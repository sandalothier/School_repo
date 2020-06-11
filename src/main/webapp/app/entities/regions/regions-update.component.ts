import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRegions, Regions } from 'app/shared/model/regions.model';
import { RegionsService } from './regions.service';
import { IPays } from 'app/shared/model/pays.model';
import { PaysService } from 'app/entities/pays/pays.service';

@Component({
  selector: 'jhi-regions-update',
  templateUrl: './regions-update.component.html',
})
export class RegionsUpdateComponent implements OnInit {
  isSaving = false;
  pays: IPays[] = [];

  editForm = this.fb.group({
    id: [],
    nomRegion: [],
    chefLieu: [],
    pays: [],
  });

  constructor(
    protected regionsService: RegionsService,
    protected paysService: PaysService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regions }) => {
      this.updateForm(regions);

      this.paysService.query().subscribe((res: HttpResponse<IPays[]>) => (this.pays = res.body || []));
    });
  }

  updateForm(regions: IRegions): void {
    this.editForm.patchValue({
      id: regions.id,
      nomRegion: regions.nomRegion,
      chefLieu: regions.chefLieu,
      pays: regions.pays,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const regions = this.createFromForm();
    if (regions.id !== undefined) {
      this.subscribeToSaveResponse(this.regionsService.update(regions));
    } else {
      this.subscribeToSaveResponse(this.regionsService.create(regions));
    }
  }

  private createFromForm(): IRegions {
    return {
      ...new Regions(),
      id: this.editForm.get(['id'])!.value,
      nomRegion: this.editForm.get(['nomRegion'])!.value,
      chefLieu: this.editForm.get(['chefLieu'])!.value,
      pays: this.editForm.get(['pays'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegions>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPays): any {
    return item.id;
  }
}
