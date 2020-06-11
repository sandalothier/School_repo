import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContinent, Continent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';

@Component({
  selector: 'jhi-continent-update',
  templateUrl: './continent-update.component.html',
})
export class ContinentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomContinent: [],
    superficie: [],
  });

  constructor(protected continentService: ContinentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ continent }) => {
      this.updateForm(continent);
    });
  }

  updateForm(continent: IContinent): void {
    this.editForm.patchValue({
      id: continent.id,
      nomContinent: continent.nomContinent,
      superficie: continent.superficie,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const continent = this.createFromForm();
    if (continent.id !== undefined) {
      this.subscribeToSaveResponse(this.continentService.update(continent));
    } else {
      this.subscribeToSaveResponse(this.continentService.create(continent));
    }
  }

  private createFromForm(): IContinent {
    return {
      ...new Continent(),
      id: this.editForm.get(['id'])!.value,
      nomContinent: this.editForm.get(['nomContinent'])!.value,
      superficie: this.editForm.get(['superficie'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContinent>>): void {
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
