import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogOutButtonComponent } from './log-out-button.component';

describe('LogOutButtonComponent', () => {
  let component: LogOutButtonComponent;
  let fixture: ComponentFixture<LogOutButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOutButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
