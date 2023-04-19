import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxiContainerComponent } from './maxi-container.component';

describe('MaxiContainerComponent', () => {
  let component: MaxiContainerComponent;
  let fixture: ComponentFixture<MaxiContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxiContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
