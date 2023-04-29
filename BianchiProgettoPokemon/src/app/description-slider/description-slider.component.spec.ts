import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSliderComponent } from './description-slider.component';

describe('DescriptionSliderComponent', () => {
  let component: DescriptionSliderComponent;
  let fixture: ComponentFixture<DescriptionSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
