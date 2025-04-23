import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostloginadminComponent } from './postloginadmin.component';

describe('PostloginadminComponent', () => {
  let component: PostloginadminComponent;
  let fixture: ComponentFixture<PostloginadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostloginadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostloginadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
