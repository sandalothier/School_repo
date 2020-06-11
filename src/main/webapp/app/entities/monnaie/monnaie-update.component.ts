import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMonnaie, Monnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from './monnaie.service';

@Component({
  selector: 'jhi-monnaie-update',
  templateUrl: './monnaie-update.component.html',
})
export class MonnaieUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    monnaie: [],
    sigle: [],
  });

  constructor(protected monnaieService: MonnaieService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monnaie }) => {
      this.updateForm(monnaie);
    });
  }

  updateForm(monnaie: IMonnaie): void {
    this.editForm.patchValue({
      id: monnaie.id,
      monnaie: monnaie.monnaie,
      sigle: monnaie.sigle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const monnaie = this.createFromForm();
    if (monnaie.id !== undefined) {
      this.subscribeToSaveResponse(this.monnaieService.update(monnaie));
    } else {
      this.subscribeToSaveResponse(this.monnaieService.create(monnaie));
    }
  }

  private createFromForm(): IMonnaie {
    return {
      ...new Monnaie(),
      id: this.editForm.get(['id'])!.value,
      monnaie: this.editForm.get(['monnaie'])!.value,
      sigle: this.editForm.get(['sigle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonnaie>>): void {
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
}
