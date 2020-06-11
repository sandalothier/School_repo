import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SchoolTestModule } from '../../../test.module';
import { ContinentUpdateComponent } from 'app/entities/continent/continent-update.component';
import { ContinentService } from 'app/entities/continent/continent.service';
import { Continent } from 'app/shared/model/continent.model';

describe('Component Tests', () => {
  describe('Continent Management Update Component', () => {
    let comp: ContinentUpdateComponent;
    let fixture: ComponentFixture<ContinentUpdateComponent>;
    let service: ContinentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [ContinentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContinentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContinentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Continent(123);
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
        const entity = new Continent();
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
