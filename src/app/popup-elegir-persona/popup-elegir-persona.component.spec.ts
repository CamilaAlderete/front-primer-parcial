import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupElegirPersonaComponent } from './popup-elegir-persona.component';

describe('PopupElegirPersonaComponent', () => {
  let component: PopupElegirPersonaComponent;
  let fixture: ComponentFixture<PopupElegirPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupElegirPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupElegirPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
