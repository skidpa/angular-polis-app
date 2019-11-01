import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafMapComponent } from './leaf-map.component';

describe('LeafMapComponent', () => {
  let component: LeafMapComponent;
  let fixture: ComponentFixture<LeafMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
