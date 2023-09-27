import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoKeyboardComponent } from './ahorcado-keyboard.component';

describe('AhorcadoKeyboardComponent', () => {
  let component: AhorcadoKeyboardComponent;
  let fixture: ComponentFixture<AhorcadoKeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorcadoKeyboardComponent]
    });
    fixture = TestBed.createComponent(AhorcadoKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
