import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolTestModule } from '../../../test.module';
import { ContinentComponent } from 'app/entities/continent/continent.component';
import { ContinentService } from 'app/entities/continent/continent.service';
import { Continent } from 'app/shared/model/continent.model';

describe('Component Tests', () => {
  describe('Continent Management Component', () => {
    let comp: ContinentComponent;
    let fixture: ComponentFixture<ContinentComponent>;
    let service: ContinentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [ContinentComponent],
      })
        .overrideTemplate(ContinentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContinentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Continent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.continents && comp.continents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
