import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SchoolTestModule } from '../../../test.module';
import { RegroupementRegionalUpdateComponent } from 'app/entities/regroupement-regional/regroupement-regional-update.component';
import { RegroupementRegionalService } from 'app/entities/regroupement-regional/regroupement-regional.service';
import { RegroupementRegional } from 'app/shared/model/regroupement-regional.model';

describe('Component Tests', () => {
  describe('RegroupementRegional Management Update Component', () => {
    let comp: RegroupementRegionalUpdateComponent;
    let fixture: ComponentFixture<RegroupementRegionalUpdateComponent>;
    let service: RegroupementRegionalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [RegroupementRegionalUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RegroupementRegionalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegroupementRegionalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegroupementRegionalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegroupementRegional(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegroupementRegional();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
