import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolTestModule } from '../../../test.module';
import { MonnaieComponent } from 'app/entities/monnaie/monnaie.component';
import { MonnaieService } from 'app/entities/monnaie/monnaie.service';
import { Monnaie } from 'app/shared/model/monnaie.model';

describe('Component Tests', () => {
  describe('Monnaie Management Component', () => {
    let comp: MonnaieComponent;
    let fixture: ComponentFixture<MonnaieComponent>;
    let service: MonnaieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [MonnaieComponent],
      })
        .overrideTemplate(MonnaieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MonnaieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MonnaieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Monnaie(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.monnaies && comp.monnaies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
