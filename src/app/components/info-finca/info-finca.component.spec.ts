import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFincaComponent } from './info-finca.component';

describe('InfoFincaComponent', () => {
  let component: InfoFincaComponent;
  let fixture: ComponentFixture<InfoFincaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFincaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
