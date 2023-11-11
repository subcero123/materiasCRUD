import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMateriasComponent } from './registrar-materias.component';

describe('RegistrarMateriasComponent', () => {
  let component: RegistrarMateriasComponent;
  let fixture: ComponentFixture<RegistrarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
