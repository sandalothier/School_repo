import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolTestModule } from '../../../test.module';
import { RegroupementRegionalDetailComponent } from 'app/entities/regroupement-regional/regroupement-regional-detail.component';
import { RegroupementRegional } from 'app/shared/model/regroupement-regional.model';

describe('Component Tests', () => {
  describe('RegroupementRegional Management Detail Component', () => {
    let comp: RegroupementRegionalDetailComponent;
    let fixture: ComponentFixture<RegroupementRegionalDetailComponent>;
    const route = ({ data: of({ regroupementRegional: new RegroupementRegional(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [RegroupementRegionalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RegroupementRegionalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegroupementRegionalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load regroupementRegional on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.regroupementRegional).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
