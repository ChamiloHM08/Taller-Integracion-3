import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizadatosComponent } from './actualizadatos.component';

describe('ActualizadatosComponent', () => {
  let component: ActualizadatosComponent;
  let fixture: ComponentFixture<ActualizadatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizadatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizadatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
