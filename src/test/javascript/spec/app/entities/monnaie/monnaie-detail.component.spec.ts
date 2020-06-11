import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolTestModule } from '../../../test.module';
import { MonnaieDetailComponent } from 'app/entities/monnaie/monnaie-detail.component';
import { Monnaie } from 'app/shared/model/monnaie.model';

describe('Component Tests', () => {
  describe('Monnaie Management Detail Component', () => {
    let comp: MonnaieDetailComponent;
    let fixture: ComponentFixture<MonnaieDetailComponent>;
    const route = ({ data: of({ monnaie: new Monnaie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [MonnaieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MonnaieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MonnaieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load monnaie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.monnaie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
