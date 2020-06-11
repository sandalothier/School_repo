import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegroupementRegional } from 'app/shared/model/regroupement-regional.model';

@Component({
  selector: 'jhi-regroupement-regional-detail',
  templateUrl: './regroupement-regional-detail.component.html',
})
export class RegroupementRegionalDetailComponent implements OnInit {
  regroupementRegional: IRegroupementRegional | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regroupementRegional }) => (this.regroupementRegional = regroupementRegional));
  }

  previousState(): void {
    window.history.back();
  }
}
