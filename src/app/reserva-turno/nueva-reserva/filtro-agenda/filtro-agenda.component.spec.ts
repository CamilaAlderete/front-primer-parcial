import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAgendaComponent } from './filtro-agenda.component';

describe('FiltroAgendaComponent', () => {
  let component: FiltroAgendaComponent;
  let fixture: ComponentFixture<FiltroAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
