import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfincasadminComponent } from './showfincasadmin.component';

describe('ShowfincasadminComponent', () => {
  let component: ShowfincasadminComponent;
  let fixture: ComponentFixture<ShowfincasadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowfincasadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowfincasadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
