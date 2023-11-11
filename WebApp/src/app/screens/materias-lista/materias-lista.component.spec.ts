import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasListaComponent } from './materias-lista.component';

describe('MateriasListaComponent', () => {
  let component: MateriasListaComponent;
  let fixture: ComponentFixture<MateriasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriasListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
