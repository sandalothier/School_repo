import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolTestModule } from '../../../test.module';
import { RegionsComponent } from 'app/entities/regions/regions.component';
import { RegionsService } from 'app/entities/regions/regions.service';
import { Regions } from 'app/shared/model/regions.model';

describe('Component Tests', () => {
  describe('Regions Management Component', () => {
    let comp: RegionsComponent;
    let fixture: ComponentFixture<RegionsComponent>;
    let service: RegionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [RegionsComponent],
      })
        .overrideTemplate(RegionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Regions(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.regions && comp.regions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
