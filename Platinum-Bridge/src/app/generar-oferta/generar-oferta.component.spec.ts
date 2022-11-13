import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOfertaComponent } from './generar-oferta.component';

describe('GenerarOfertaComponent', () => {
  let component: GenerarOfertaComponent;
  let fixture: ComponentFixture<GenerarOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarOfertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
