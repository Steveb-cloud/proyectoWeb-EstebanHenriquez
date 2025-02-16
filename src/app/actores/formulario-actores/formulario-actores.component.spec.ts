import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActoresComponent } from './formulario-actores.component';

describe('FormularioActoresComponent', () => {
  let component: FormularioActoresComponent;
  let fixture: ComponentFixture<FormularioActoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioActoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
