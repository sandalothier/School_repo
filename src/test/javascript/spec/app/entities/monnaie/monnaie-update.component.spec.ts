import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SchoolTestModule } from '../../../test.module';
import { MonnaieUpdateComponent } from 'app/entities/monnaie/monnaie-update.component';
import { MonnaieService } from 'app/entities/monnaie/monnaie.service';
import { Monnaie } from 'app/shared/model/monnaie.model';

describe('Component Tests', () => {
  describe('Monnaie Management Update Component', () => {
    let comp: MonnaieUpdateComponent;
    let fixture: ComponentFixture<MonnaieUpdateComponent>;
    let service: MonnaieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolTestModule],
        declarations: [MonnaieUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MonnaieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MonnaieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MonnaieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Monnaie(123);
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
        const entity = new Monnaie();
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
