import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoPreguntaComponent } from './ahorcado-pregunta.component';

describe('AhorcadoPreguntaComponent', () => {
  let component: AhorcadoPreguntaComponent;
  let fixture: ComponentFixture<AhorcadoPreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorcadoPreguntaComponent]
    });
    fixture = TestBed.createComponent(AhorcadoPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
