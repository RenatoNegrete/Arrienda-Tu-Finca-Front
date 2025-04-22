import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostloginarrendadorComponent } from './postloginarrendador.component';

describe('PostloginarrendadorComponent', () => {
  let component: PostloginarrendadorComponent;
  let fixture: ComponentFixture<PostloginarrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostloginarrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostloginarrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
