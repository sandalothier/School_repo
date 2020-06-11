import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolTestModule } from '../../../test.module';
import { RegroupementRegionalComponent } from 'app/entities/regroupement-regional/regroupement-regional.component';
import { RegroupementRegionalService } from 'app/entities/regroupement-regional/regroupement-regional.service';
import { RegroupementRegional } from 'app/shared/model/regroupement-regional.model';

describe('Component Tests', () => {
  describe('RegroupementRegional Management Component', () => {
    let comp: RegroupementRegionalComponent;
    let fixture: ComponentFixture<RegroupementRegionalComponent>;
    let service: RegroupementRegionalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [RegroupementRegionalComponent],
      })
        .overrideTemplate(RegroupementRegionalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegroupementRegionalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegroupementRegionalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegroupementRegional(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.regroupementRegionals && comp.regroupementRegionals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
