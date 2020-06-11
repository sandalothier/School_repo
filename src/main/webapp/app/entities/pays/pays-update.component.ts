import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPays, Pays } from 'app/shared/model/pays.model';
import { PaysService } from './pays.service';
import { IMonnaie } from 'app/shared/model/monnaie.model';
import { MonnaieService } from 'app/entities/monnaie/monnaie.service';
import { IRegroupementRegional } from 'app/shared/model/regroupement-regional.model';
import { RegroupementRegionalService } from 'app/entities/regroupement-regional/regroupement-regional.service';
import { IContinent } from 'app/shared/model/continent.model';
import { ContinentService } from 'app/entities/continent/continent.service';

type SelectableEntity = IMonnaie | IContinent | IRegroupementRegional;

@Component({
  selector: 'jhi-pays-update',
  templateUrl: './pays-update.component.html',
})
export class PaysUpdateComponent implements OnInit {
  isSaving = false;
  monnaies: IMonnaie[] = [];
  continents: IContinent[] = [];
  regroupementregionals: IRegroupementRegional[] = [];

  editForm = this.fb.group({
    id: [],
    nomPays: [],
    superficie: [],
    sigleAuto: [],
    capitale: [],
    monnaie: [],
    continent: [],
    regroupementRegional: [],
  });

  constructor(
    protected paysService: PaysService,
    protected monnaieService: MonnaieService,
    protected regroupementRegionalService: RegroupementRegionalService,
    protected continentService: ContinentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pays }) => {
      this.updateForm(pays);

      this.monnaieService
        .query({ filter: 'pays-is-null' })
        .pipe(
          map((res: HttpResponse<IMonnaie[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMonnaie[]) => {
          if (!pays.monnaie || !pays.monnaie.id) {
            this.monnaies = resBody;
          } else {
            this.monnaieService
              .find(pays.monnaie.id)
              .pipe(
                map((subRes: HttpResponse<IMonnaie>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMonnaie[]) => (this.monnaies = concatRes));
          }
        });

      this.continentService.query().subscribe((res: HttpResponse<IContinent[]>) => (this.continents = res.body || []));

      this.regroupementRegionalService
        .query()
        .subscribe((res: HttpResponse<IRegroupementRegional[]>) => (this.regroupementregionals = res.body || []));
    });
  }

  updateForm(pays: IPays): void {
    this.editForm.patchValue({
      id: pays.id,
      nomPays: pays.nomPays,
      superficie: pays.superficie,
      sigleAuto: pays.sigleAuto,
      capitale: pays.capitale,
      monnaie: pays.monnaie,
      continent: pays.continent,
      regroupementRegional: pays.regroupementRegional,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pays = this.createFromForm();
    if (pays.id !== undefined) {
      this.subscribeToSaveResponse(this.paysService.update(pays));
    } else {
      this.subscribeToSaveResponse(this.paysService.create(pays));
    }
  }

  private createFromForm(): IPays {
    return {
      ...new Pays(),
      id: this.editForm.get(['id'])!.value,
      nomPays: this.editForm.get(['nomPays'])!.value,
      superficie: this.editForm.get(['superficie'])!.value,
      sigleAuto: this.editForm.get(['sigleAuto'])!.value,
      capitale: this.editForm.get(['capitale'])!.value,
      monnaie: this.editForm.get(['monnaie'])!.value,
      continent: this.editForm.get(['continent'])!.value,
      regroupementRegional: this.editForm.get(['regroupementRegional'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPays>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
