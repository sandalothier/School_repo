import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRegroupementRegional, RegroupementRegional } from 'app/shared/model/regroupement-regional.model';
import { RegroupementRegionalService } from './regroupement-regional.service';
import { IPays } from 'app/shared/model/pays.model';
import { PaysService } from 'app/entities/pays/pays.service';

@Component({
  selector: 'jhi-regroupement-regional-update',
  templateUrl: './regroupement-regional-update.component.html',
})
export class RegroupementRegionalUpdateComponent implements OnInit {
  isSaving = false;
  pays: IPays[] = [];

  editForm = this.fb.group({
    id: [],
    sigle: [],
    nomRegroupement: [],
    pays: [],
  });

  constructor(
    protected regroupementRegionalService: RegroupementRegionalService,
    protected paysService: PaysService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regroupementRegional }) => {
      this.updateForm(regroupementRegional);

      this.paysService.query().subscribe((res: HttpResponse<IPays[]>) => (this.pays = res.body || []));
    });
  }

  updateForm(regroupementRegional: IRegroupementRegional): void {
    this.editForm.patchValue({
      id: regroupementRegional.id,
      sigle: regroupementRegional.sigle,
      nomRegroupement: regroupementRegional.nomRegroupement,
      pays: regroupementRegional.pays,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const regroupementRegional = this.createFromForm();
    if (regroupementRegional.id !== undefined) {
      this.subscribeToSaveResponse(this.regroupementRegionalService.update(regroupementRegional));
    } else {
      this.subscribeToSaveResponse(this.regroupementRegionalService.create(regroupementRegional));
    }
  }

  private createFromForm(): IRegroupementRegional {
    return {
      ...new RegroupementRegional(),
      id: this.editForm.get(['id'])!.value,
      sigle: this.editForm.get(['sigle'])!.value,
      nomRegroupement: this.editForm.get(['nomRegroupement'])!.value,
      pays: this.editForm.get(['pays'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegroupementRegional>>): void {
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
