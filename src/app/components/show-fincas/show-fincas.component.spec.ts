import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFincasComponent } from './show-fincas.component';

describe('ShowFincasComponent', () => {
  let component: ShowFincasComponent;
  let fixture: ComponentFixture<ShowFincasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFincasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFincasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
