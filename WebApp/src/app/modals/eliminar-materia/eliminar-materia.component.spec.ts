import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMateriaComponent } from './eliminar-materia.component';

describe('EliminarMateriaComponent', () => {
  let component: EliminarMateriaComponent;
  let fixture: ComponentFixture<EliminarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarMateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
